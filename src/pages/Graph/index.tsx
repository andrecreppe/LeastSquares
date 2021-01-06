import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ImageBackground, Text, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Svg, { Line, Circle } from 'react-native-svg';
import I18n from '../../utils/I18n';
import { DataPoints } from '../../interfaces/data-points.interface';
import LeastSquares from '../../math/LeastSquares';

import styles from './style';
import lightMode from './styleLight';
import darkMode from './styleDark';

const Graph = () => {
  const [precision, setPrecision] = useState<number>(0);
  const [style, setStyle] = useState<number>(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const graphWidth = Dimensions.get('window').width * 0.78;
  const graphHeight = Dimensions.get('window').height * 0.39;

  //-------------------------------------

  const pointsData = route.params as DataPoints[];
  pointsData.sort((a, b) => a.index - b.index);

  const ascX = pointsData.sort((a, b) => a.x - b.x);
  const maxX = ascX[ascX.length - 1].x;
  const minX = ascX[0].x;

  const ascY = pointsData.sort((a, b) => a.y - b.y);
  const maxY = ascY[ascY.length - 1].y;
  const minY = ascY[0].y;

  const xAxis = ['0', `${100 - xPosition(0)*100}%`, '100%', `${100 - xPosition(0)*100}%`, '3'];
  const yAxis = [`${100 - yPosition(0)*100}%`, '0', `${100 - yPosition(0)*100}%`, '100%', '3'];

  const marginStep = 0.02;

  //-------------------------------------

  const results = LeastSquares.Regression(pointsData);
  // y = ax + b
  const yRegression = (results.a * maxX) + results.b;

  function xPosition(x: number) {
    const calcMax = maxX + Math.abs(minX);
    const calcX = x + Math.abs(minX)
    let newX = (calcX / calcMax);

    if(newX === 0) {
      newX += marginStep;
    } else if(newX === 1) {
      newX -= marginStep;
    }

    return newX;
  }

  function yPosition(y: number) {
    const calcMax = maxY + Math.abs(minY);
    const calcX = y + Math.abs(minY)
    let newY = 1 - (calcX / calcMax);

    if(newY === 0) {
      newY += marginStep;
    } else if(newY === 1) {
      newY -= marginStep;
    }

    return newY;
  }

  //-------------------------------------

  const theme = (style == 1) ? lightMode : darkMode;
  const background = (style == 1) 
    ? require('../../assets/background-1.png')
    : require('../../assets/background-2.png');
  const returnButton = (style == 1)
    ? <Icon name='arrow-left' size={28} color='#000' />
    : <Icon name='arrow-left' size={28} color='#FFF' />
  const stroke = (style == 1)
    ? ['black', 'red', 'blue']
    : ['white', 'red', '#00FFFF'];

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
      const value = await AsyncStorage.getItem(key);

      if(value !== null) {
        return value
      }
    } catch(e) {
      TriggerAlert(I18n.t('error.readError') + e);
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

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.main}>
          <View>
            <Text style={[styles.title, theme.title]}>y = ax + b</Text>
          </View>

          <View style={[styles.box, theme.box, theme.colorGraph]}>
            <Svg height={graphHeight} width={graphWidth}>
              <Line x1={xAxis[0]} y1={xAxis[1]} x2={xAxis[2]} y2={xAxis[3]} stroke={stroke[0]} strokeWidth={xAxis[4]} />
              <Line x1={yAxis[0]} y1={yAxis[1]} x2={yAxis[2]} y2={yAxis[3]} stroke={stroke[0]} strokeWidth={yAxis[4]} />

              {pointsData.map((point) => {
                const x = xPosition(point.x);
                const y = yPosition(point.y);

                return <Circle cx={x*graphWidth} cy={y*graphHeight} r="5" fill={stroke[1]} />
              })}

              <Line 
                stroke={stroke[2]} strokeWidth="3"
                x1="0" y1={(1-results.b/maxY)*graphHeight} //y = b
                x2={graphWidth} y2={(1-yRegression/maxY)*graphHeight} //y = ax(max) + b
              />
            </Svg>
          </View>

          <View style={[styles.resultsBox, theme.colorLineDispersion]}>
            <Text style={[styles.subtitleTitle, theme.subtitleTitle]}>{I18n.t('graph.dispertionTitle')}</Text>
            <Text style={[styles.subtitle, theme.subtitle]}>δy = {results.deltaY.toFixed(precision)}</Text>
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
      </ScrollView>
    </ImageBackground>
  );
}

export default Graph;
