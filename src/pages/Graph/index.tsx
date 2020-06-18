import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ImageBackground, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Svg, { Line, Circle } from 'react-native-svg';

import I18n from '../../utils/I18n';

import styles from './style';
import lightMode from './styleLight';
import darkMode from './styleDark';

import LeastSquares from '../../math/LeastSquares';

interface DataPoints {
  index: number,
  x: number,
  y: number
}

const Graph = () => {
  const [precision, setPrecision] = useState<number>(0);
  const [style, setStyle] = useState<number>(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const graphWidth = Dimensions.get('window').width * 0.78
  const graphHeight = Dimensions.get('window').width * 0.78

  //-------------------------------------

  const pointsData = route.params as DataPoints[];
  
  const maxX = pointsData.sort((a, b) => b.x - a.x)[0].x;
  const maxY = pointsData.sort((a, b) => b.y - a.y)[0].y;

  pointsData.sort((a, b) => a.index - b.index);

  //-------------------------------------

  const results = LeastSquares.Regression(pointsData);
  //y = ax + b
  const yRegression = (results.a * maxX) + results.b

  //-------------------------------------

  const theme = (style == 1) ? lightMode : darkMode;
  const background = (style == 1) 
    ? require('../../assets/background-1.png')
    : require('../../assets/background-2.png')
  const returnButton = (style == 1)
    ? <Icon name='arrow-left' size={28} color='#000' />
    : <Icon name='arrow-left' size={28} color='#FFF' />
  const stroke = (style == 1)
    ? ['black', 'red', 'blue']
    : ['white', 'red', '#00FFFF']
  //-------------------------------------

  useEffect(() => {
    loadConfiguredData();
  }, [isFocused]);

  function TriggerAlert(message: string) {
    Alert.alert(
      "Oops!",
      message,
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    );
  }

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)

      if(value !== null) {
        return value
      }
    } catch(e) {
      TriggerAlert(I18n.t('error.readError') + e)
    }
  }

  async function loadConfiguredData() {
    const memoryPrecision = await getData('@precision');
    setPrecision(Number(memoryPrecision));

    const memoryStyle = await getData('@style');
    setStyle(Number(memoryStyle));
  }

  //-----------------------------------

  function handleNavigateToPoints() {
    navigation.goBack();
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={background}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View>
        <TouchableOpacity onPress={handleNavigateToPoints}>
          {returnButton}
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View>
          <Text style={[styles.title, theme.title]}>y = ax + b</Text>
        </View>

        <View style={[styles.box, theme.box, theme.colorGraph]}>
          <Svg height={graphHeight} width={graphWidth}>
            <Line x1="0" y1="100%" x2="100%" y2="100%" stroke={stroke[0]} strokeWidth="5" />
            <Line x1="0" y1="100%" x2="0" y2="0" stroke={stroke[0]} strokeWidth="5" />

            {pointsData.map((point) => {
              const x = (point.x / maxX) - 0.1;
              const y = 1 - (point.y / maxY) + 0.1;

              return <Circle cx={x*graphWidth} cy={y*graphHeight} r="5" fill={stroke[1]} />
            })}

            <Line 
              stroke={stroke[2]} strokeWidth="3"
              x1="0" y1={(1-results.b/maxY)*graphHeight} //y = b
              x2={graphWidth} y2={(1-yRegression/maxY)*graphHeight} //y = ax(max) + b
            />
          </Svg>
        </View>

        <View style={[styles.resultsBox, theme.colorCoeficient]}>
          <Text style={[styles.subtitleTitle, theme.subtitleTitle]}>{I18n.t('graph.coeficientsTitle')}</Text>
          <Text style={[styles.subtitle, theme.subtitle]}>a = {results.a.toFixed(precision)}</Text>
          <Text style={[styles.subtitle, theme.subtitle]}>b = {results.b.toFixed(precision)}</Text>
        </View>

        <View style={[styles.resultsBox, theme.colorUncertanty]}>
          <Text style={[styles.subtitleTitle, theme.subtitleTitle]}>{I18n.t('graph.uncertantyTitle')}</Text>
          <Text style={[styles.subtitle, theme.subtitle]}>δa = {results.deltaA.toFixed(precision)}</Text>
          <Text style={[styles.subtitle, theme.subtitle]}>δb = {results.deltaB.toFixed(precision)}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Graph;
