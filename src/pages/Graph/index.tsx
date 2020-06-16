import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
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

  const pointsData = route.params as DataPoints[];
  const results = LeastSquares.Regression(pointsData);

  const styles = (style == 1) ? lightMode : darkMode;
  const background = (style == 1) 
    ? require('../../assets/background-1.png')
    : require('../../assets/background-2.png')
  const returnButton = (style == 1)
    ? <Icon name='arrow-left' size={28} color='#000' />
    : <Icon name='arrow-left' size={28} color='#FFF' />

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
          <Text style={styles.title}>y = ax + b</Text>
        </View>

        <View style={styles.box}>
          <Text>GRÁFICO AQUI</Text>
        </View>

        <View style={styles.footer}>
          <View style={[styles.resultsBox, styles.colorCoeficient]}>
            <Text style={styles.subtitleTitle}>{I18n.t('graph.coeficientsTitle')}</Text>
            <Text style={styles.subtitle}>a = {results.a.toFixed(precision)}</Text>
            <Text style={styles.subtitle}>b = {results.b.toFixed(precision)}</Text>
          </View>

          <View style={[styles.resultsBox, styles.colorUncertanty]}>
            <Text style={styles.subtitleTitle}>{I18n.t('graph.uncertantyTitle')}</Text>
            <Text style={styles.subtitle}>δa = {results.deltaA.toFixed(precision)}</Text>
            <Text style={styles.subtitle}>δb = {results.deltaB.toFixed(precision)}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Graph;
