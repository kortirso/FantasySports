import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
  Pressable,
  Text
} from 'react-native';

import Colors from '../constants/Colors';
import { fetchOraculsLineup, fetchCupsRound, fetchAllCupsPairs, fetchWeek, fetchAllGames } from '../api';
import { fetchFromCache } from '../cache/cache';
import { useAuth } from '../contexts/AuthContext';
import { convertDate } from '../helpers/time';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Forecastable from './forecasts/Forecastable';

const MILLISECONDS_IN_DAY = 86400000;

export default function ForecastsShowScreen({ navigation, route }) {
  const { oraculId, currentWeekId } = route.params;

  const { authState } = useAuth();

  const [pageState, setPageState] = useState({
    loading: true,
    periodableType: undefined,
    periodable: undefined,
    forecastables: [],
    forecasts: [],
    collapseData: {},
    points: 0,
    lineupsData: {}
  });

  const toggleGameDay = (key) => {
    setPageState({ ...pageState, collapseData: { ...pageState.collapseData, [key]: !pageState.collapseData[key] } });
  };

  const groupGames = (gamesData) => {
    return gamesData.reduce((result, game) => {
      const convertedTime = game.start_at ? convertDate(game.start_at) : "unknown";

      if (result[convertedTime] === undefined) result[convertedTime] = [game];
      else result[convertedTime].push(game);

      return result;
    }, {});
  };

  const generateCollapsedData = (groupedGames) => {
    const collapseData = {}
    let previousKey = null;
    Object.entries(groupedGames).forEach(([key, games], index) => {
      collapseData[key] = false;

      if (index > 0) {
        if (games[0].points.length > 0) {
          collapseData[previousKey] = true;
        }
      }
      previousKey = key;
    });
    return collapseData;
  };

  const fetchPageData = async ({ cache }) => {
    const fetchLineup = async () => await fetchOraculsLineup(oraculId, currentWeekId, authState.accessToken);
    const fetchRound = async (useCache, id) => await fetchFromCache(useCache, `cupsRound-${id}`, MILLISECONDS_IN_DAY, () => fetchCupsRound(id, authState.accessToken));
    const fetchPairs = async (cupsRoundId) => await fetchAllCupsPairs(cupsRoundId, authState.accessToken);
    const fetchSeasonWeek = async (useCache, id) => await fetchFromCache(useCache, `week-${id}`, MILLISECONDS_IN_DAY, () => fetchWeek(id, authState.accessToken));
    const fetchGames = async (weekId) => await fetchAllGames(weekId, authState.accessToken);

    const oraculsLineupData = await fetchLineup();

    if (oraculsLineupData.periodable_type === "Cups::Round") {
      Promise.all(
        [fetchRound(cache, oraculsLineupData.periodable_id), fetchPairs(oraculsLineupData.periodable_id)]
      ).then(([cupsRoundData, cupsPairsData]) => {
        const groupedGames = groupGames(cupsPairsData);
        setPageState({
          ...pageState,
          loading: false,
          periodableType: "Cups::Round",
          periodable: cupsRoundData,
          forecastables: groupedGames,
          forecasts: oraculsLineupData.forecasts.data.map((item) => item.attributes),
          collapseData: generateCollapsedData(groupedGames),
          points: oraculsLineupData.points,
          lineupsData: oraculsLineupData.lineups_data
        });
      });
    } else {
      Promise.all(
        [fetchSeasonWeek(cache, oraculsLineupData.periodable_id), fetchGames(oraculsLineupData.periodable_id)]
      ).then(([weekData, gamesData]) => {
        const groupedGames = groupGames(gamesData);
        setPageState({
          ...pageState,
          loading: false,
          periodableType: "Week",
          periodable: weekData,
          forecastables: groupedGames,
          forecasts: oraculsLineupData.forecasts.data.map((item) => item.attributes),
          collapseData: generateCollapsedData(groupedGames),
          points: oraculsLineupData.points,
          lineupsData: oraculsLineupData.lineups_data
        });
      });
    }
  };

  const onRefresh = useCallback(() => {
    setPageState({ ...pageState, loading: true });
    fetchPageData({ cache: false });
  }, []);

  useEffect(() => {
    fetchPageData({ cache: true });
  }, [currentWeekId, oraculId]);

  const renderLoadingScreen = () => {
    return <View style={styles.contentContainer}></View>;
  };

  const renderForecastables = (forecastables) => (
    forecastables.map((forecastable, index) => (
      <Forecastable
        item={forecastable}
        isForWeek={pageState.periodableType === "Week"}
        forecast={pageState.forecasts.find((element) => element.forecastable_id === forecastable.id)}
        last={index === forecastables.length - 1}
        key={forecastable.id}
      />
    ))
  );

  const renderData = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={{ marginBottom: 12, alignSelf: 'flex-start' }}>
          <Badge value={pageState.periodableType === "Week" ? `Week ${pageState.periodable.position}` : pageState.periodable.name} />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 24 }}>
            {pageState.periodableType === "Week" ? "Week results" : "Round results"}
          </Text>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14 }}>This page contains results of predictions, in addition you can make prediction for future events. Deadline for prediction - 2 hours before event.</Text>
        </View>
        <View style={styles.pointsBox}>
          <View style={[styles.pointBox, { borderRightWidth: 1, borderRightColor: Colors.stone300 }]}>
            <Text style={styles.pointBoxTitle}>Points</Text>
            <Text style={styles.pointBoxValue}>{pageState.points}</Text>
          </View>
          <View style={[styles.pointBox, { borderRightWidth: 1, borderRightColor: Colors.stone300 }]}>
            <Text style={styles.pointBoxTitle}>Avg points</Text>
            <Text style={styles.pointBoxValue}>{pageState.lineupsData.avg}</Text>
          </View>
          <View style={styles.pointBox}>
            <Text style={styles.pointBoxTitle}>Max points</Text>
            <Text style={styles.pointBoxValue}>{pageState.lineupsData.max}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 12, flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            {pageState.periodable.previous_id ? (
              <Button
                title="Previous"
                onPress={() => navigation.navigate("ForecastShow", { oraculId: oraculId, currentWeekId: pageState.periodable.previous_id })}
              />
            ) : null}
          </View>
          <View style={{ flex: 1 }}>
            {pageState.periodable.next_id ? (
              <Button
                title="Next"
                onPress={() => navigation.navigate("ForecastShow", { oraculId: oraculId, currentWeekId: pageState.periodable.next_id })}
              />
            ) : null}
          </View>
        </View>
        {Object.entries(pageState.forecastables).map(([key, forecastables], index) => (
          <View style={[(index === Object.keys(pageState.forecastables).length - 1) ? {} : { marginBottom: 12 }]} key={key}>
            <Pressable style={styles.pressableDay} onPress={() => toggleGameDay(key)}>
              <Text style={styles.pressableDayValue}>{key}</Text>
            </Pressable>
            {pageState.collapseData[key] ? null : renderForecastables(forecastables)}
          </View>
        ))}
      </View>
    )
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.stone100 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.stone100}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          {pageState.loading ? renderLoadingScreen() : renderData()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%'
  },
  screenContainer: {
    flexGrow: 1,
    alignItems: 'center'
  },
  container: {
    width: '100%',
    flexDirection: 'column'
  },
  contentContainer: {
    backgroundColor: Colors.white,
    padding: 16
  },
  dayBox: {
    marginBottom: 12
  },
  pressableDay: {
    backgroundColor: Colors.stone200,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.stone300,
    borderRadius: 2
  },
  pressableDayValue: {
    textAlign: "center"
  },
  pointsBox: {
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: Colors.stone200,
    borderWidth: 1,
    borderColor: Colors.stone300,
    borderRadius: 2
  },
  pointBox: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pointBoxTitle: {
    textTransform: 'uppercase',
    marginBottom: 4
  },
  pointBoxValue: {
    fontSize: 18
  }
});
