import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
  Text,
  Pressable,
  Image,
} from 'react-native';

import {Button, Popup, FormField} from '../components';
import {
  fetchAllLeagues,
  fetchAllSeasons,
  fetchAllCups,
  fetchAllOraculPlaces,
  fetchAllOraculs,
  createOracul,
} from '../api';
import {strings} from '../locales';

import Colors from '../constants/Colors';
import {fetchFromCache} from '../cache/cache';
import {useAuth} from '../contexts/AuthContext';
import {LeaguesAssets} from '../assets/images';

const MILLISECONDS_IN_DAY = 86400000;

export default function ForecastsMainScreen({navigation}) {
  const {authState, clearAuthState} = useAuth();

  strings.setLanguage(authState.locale);

  const [pageState, setPageState] = useState({
    loading: true,
    oraculPlaces: [],
    oraculs: [],
    modalForOracul: undefined,
    oraculName: '',
    errors: [],
  });

  const fetchPageData = ({cache}) => {
    const fetchLeagues = async useCache =>
      await fetchFromCache(useCache, 'leagues', MILLISECONDS_IN_DAY, () =>
        fetchAllLeagues(authState.accessToken),
      );
    const fetchSeasons = async useCache =>
      await fetchFromCache(useCache, 'seasons', MILLISECONDS_IN_DAY, () =>
        fetchAllSeasons(authState.accessToken),
      );
    const fetchCups = async useCache =>
      await fetchFromCache(useCache, 'cups', MILLISECONDS_IN_DAY, () =>
        fetchAllCups(authState.accessToken),
      );
    const fetchOraculPlaces = async useCache =>
      await fetchFromCache(useCache, 'oraculPlaces', MILLISECONDS_IN_DAY, () =>
        fetchAllOraculPlaces(authState.accessToken),
      );
    const fetchOraculs = async () =>
      await fetchAllOraculs(authState.accessToken);

    Promise.all([
      fetchLeagues(cache),
      fetchSeasons(cache),
      fetchCups(cache),
      fetchOraculPlaces(cache),
      fetchOraculs(),
    ])
      .then(
        ([
          leaguesData,
          seasonsData,
          cupsData,
          oraculPlacesData,
          oraculsData,
        ]) => {
          const oraculPlaces = oraculPlacesData.map(oraculPlaceData => {
            const leagueId =
              oraculPlaceData.placeable_type === 'Season'
                ? seasonsData.find(e => e.id === oraculPlaceData.placeable_id)
                    .league_id
                : cupsData.find(e => e.id === oraculPlaceData.placeable_id)
                    .league_id;
            const league = leaguesData.find(e => e.id === leagueId);

            oraculPlaceData.slug = league?.slug;
            return oraculPlaceData;
          });

          setPageState({
            ...pageState,
            loading: false,
            oraculPlaces: oraculPlaces,
            oraculs: oraculsData,
          });
        },
      )
      .catch(error => {
        if (error.name === 'AuthError') {
          clearAuthState();
        }
      });
  };

  const onRefresh = useCallback(() => {
    setPageState({...pageState, loading: true});
    fetchPageData({cache: false});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchPageData({cache: true});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitOraculForm = async () => {
    const result = await createOracul(
      pageState.modalForOracul,
      {name: pageState.oraculName},
      authState.accessToken,
    );
    if (result.errors) {
      setPageState({...pageState, errors: result.errors});
    } else {
      setPageState({
        ...pageState,
        modalForOracul: undefined,
        oraculName: '',
        errors: [],
        oraculs: pageState.oraculs.concat(result.result.data.attributes),
      });
    }
  };

  const renderErrors = () => {
    if (pageState.errors.length === 0) {
      return <></>;
    }

    return pageState.errors.map((error, index) => (
      <View style={{marginTop: 4}} key={index}>
        <Text style={{color: Colors.red600}}>{error}</Text>
      </View>
    ));
  };

  const renderLoadingScreen = () => (
    <View style={styles.oraculPlaceContainer}>
      <View style={styles.loadingLogo} />
      <View style={styles.loadingNameBox} />
    </View>
  );

  const renderOraculPlaces = () => {
    return pageState.oraculPlaces.map(oraculPlace => {
      const existingOracul = pageState.oraculs.find(
        oracul => oracul.oracul_place_id === oraculPlace.id,
      );

      return existingOracul ? (
        <Pressable
          style={styles.oraculPlaceContainer}
          onPress={() =>
            navigation.navigate('ForecastShow', {oraculId: existingOracul.id})
          }
          key={oraculPlace.id}>
          <View style={styles.oraculPlaceLogoBox}>
            <Image
              style={styles.oraculPlaceLogo}
              source={LeaguesAssets[oraculPlace.slug]}
            />
          </View>
          <View style={styles.oraculNameBox}>
            <Text style={styles.oraculPlaceName}>{existingOracul.name}</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={styles.oraculPlaceContainer}
          onPress={() =>
            setPageState({...pageState, modalForOracul: oraculPlace.id})
          }
          key={oraculPlace.id}>
          <View style={styles.oraculPlaceLogoBox}>
            <Image
              style={styles.oraculPlaceLogo}
              source={LeaguesAssets[oraculPlace.slug]}
            />
          </View>
          <View style={styles.oraculPlaceNameBox}>
            <Text style={styles.oraculPlaceName}>{oraculPlace.name}</Text>
          </View>
        </Pressable>
      );
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.stone100}}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.stone100} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          {pageState.loading ? renderLoadingScreen() : renderOraculPlaces()}
        </View>
        <Popup
          visible={pageState.modalForOracul !== undefined}
          onRequestClose={() =>
            setPageState({
              ...pageState,
              modalForOracul: undefined,
              errors: [],
              oraculName: '',
            })
          }
          title={strings.forecasts.addingOracul}>
          <FormField
            label={strings.forecasts.nameLabel}
            placeholder={strings.forecasts.namePlaceholder}
            keyboardType="default"
            onChangeText={value =>
              setPageState({...pageState, oraculName: value})
            }
          />
          {renderErrors()}
          <Button
            title={strings.forecasts.createOracul}
            size="big"
            buttonBoxStyles={{marginTop: 16}}
            onPress={() => submitOraculForm()}
          />
        </Popup>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  screenContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: 24,
    flexDirection: 'column',
    gap: 12,
  },
  oraculPlaceContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.stone300,
    backgroundColor: Colors.white,
  },
  oraculPlaceLogoBox: {
    paddingVertical: 10,
  },
  oraculPlaceLogo: {
    width: '100%',
    height: 140,
    objectFit: 'contain',
  },
  oraculNameBox: {
    backgroundColor: Colors.goldeenLight,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.stone300,
  },
  oraculPlaceNameBox: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.stone300,
  },
  oraculPlaceName: {
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingLogo: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.white,
  },
  loadingNameBox: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.stone300,
    paddingVertical: 14,
  },
});
