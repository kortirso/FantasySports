import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Colors from '../../constants/Colors';
import { convertTime } from '../../helpers/time';
import { updateOraculsForecast } from '../../api';
import { useAuth } from '../../contexts/AuthContext';

export default Forecastable = ({ item, isForWeek, forecast, last }) => {
  const { authState } = useAuth();

  const [homeForecast, setHomeForecast] = useState(
    forecast === undefined || forecast.value.length === 0 ? null : forecast.value[0].toString()
  );
  const [visitorForecast, setVisitorForecast] = useState(
    forecast === undefined || forecast.value.length === 0 ? null : forecast.value[1].toString()
  );

  useEffect(() => {
    if (parseInt(homeForecast) >= 0 && parseInt(visitorForecast) >= 0) {
      updateOraculsForecast(
        forecast.id,
        { value: [parseInt(homeForecast), parseInt(visitorForecast)] },
        authState.accessToken
      );
    };
  }, [homeForecast, visitorForecast, forecast.id]);

  const renderForecastForView = () => (
    <View style={{ paddingHorizontal: 4 }}>
      <Text style={styles.forecastViewTitle}>Forecast</Text>
      <Text style={styles.forecastViewValue}>{homeForecast} - {visitorForecast}</Text>
    </View>
  );

  const renderForecastForEdit = () => (
    <View style={{ paddingHorizontal: 4, flexDirection: 'row', gap: 4 }}>
      <View>
        <Text style={styles.forecastViewTitle}>Home</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TextInput
            style={styles.inputStyle}
            value={homeForecast}
            onChangeText={(value) => setHomeForecast(value)}
            placeholder="2"
            placeholderTextColor={Colors.stone200}
            autoCapitalize="none"
            keyboardType="number-pad"
            returnKeyType="next"
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12 }}><Text>-</Text></View>
      <View>
        <Text style={styles.forecastViewTitle}>Visitor</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TextInput
            style={styles.inputStyle}
            value={visitorForecast}
            onChangeText={(value) => setVisitorForecast(value)}
            placeholder="1"
            placeholderTextColor={Colors.stone200}
            autoCapitalize="none"
            keyboardType="number-pad"
            returnKeyType="next"
          />
        </View>
      </View>
    </View>
  );

  const renderForecast = () => {
    if (!item.predictable && forecast.value.length > 0) return renderForecastForView();
    if (item.predictable && forecast.owner) return renderForecastForEdit();
  };

  return (
    <View style={[styles.forecastableBox, last ? null : styles.forecastableBoxBordered]}>
      <View>
        {item.points.length > 0 ? (
          <Text style={styles.points}>{item.points[0]} - {item.points[1]}</Text>
        ) : (
          <Text style={styles.startAt}>{convertTime(item.start_at)}</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.teamName}>{isForWeek ? item.home_team.name : item.home_name}</Text>
        <Text style={styles.teamName}>{isForWeek ? item.visitor_team.name : item.visitor_name}</Text>
      </View>
      {forecast ? renderForecast() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  forecastableBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingTop: 8
  },
  forecastableBoxBordered: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.stone200,
    paddingVertical: 8
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500'
  },
  points: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.stone700,
    borderWidth: 1,
    borderColor: Colors.stone800,
    borderRadius: 4,
    color: Colors.white,
    fontSize: 18,
    overflow: 'hidden'
  },
  startAt: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.stone200,
    borderRadius: 4
  },
  forecastViewTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 2
  },
  forecastViewValue: {
    textAlign: 'center',
    backgroundColor: Colors.goldeenLight,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.goldeenMiddle,
    borderRadius: 4,
    overflow: 'hidden'
  },
  inputStyle: {
    width: 30,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.stone300,
    borderRadius: 4,
    textAlign: 'center'
  }
});
