import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Feather as Icon, MaterialIcons as IconM } from '@expo/vector-icons';

import styles from './style';

interface DataPoints {
  index: number,
  x: number,
  y: number
}

const Graph = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const pointsData = route.params as DataPoints;

  console.log(pointsData)

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/background-2.png')}
      imageStyle={{ width: 580, height: 880 }}
    >
    </ImageBackground>
  );
}

export default Graph;
