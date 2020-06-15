import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
import styles from './style';

import LeastSquares from '../../math/LeastSquares';

interface DataPoints {
  index: number,
  x: number,
  y: number
}

const Graph = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const pointsData = route.params as DataPoints[];

  const results = LeastSquares.Regression(pointsData);
  
  //const xValues = pointsData.map(point => { return point.x }).sort((a, b) => a - b);
  //const yValues = pointsData.map(point => { return point.y }).sort((a, b) => a - b);

  function handleNavigateToPoints() {
    navigation.goBack();
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/background-2.png')}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View>
        <TouchableOpacity onPress={handleNavigateToPoints}>
            <Icon name='arrow-left' size={28} color='#000000' />
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
            <Text style={styles.subtitle}>a = {results.a}</Text>
            <Text style={styles.subtitle}>b = {results.b}</Text>
          </View>

          <View style={[styles.resultsBox, styles.colorUncertanty]}>
            <Text style={styles.subtitleTitle}>{I18n.t('graph.uncertantyTitle')}</Text>
            <Text style={styles.subtitle}>δa = {results.deltaA}</Text>
            <Text style={styles.subtitle}>δb = {results.deltaB}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Graph;
