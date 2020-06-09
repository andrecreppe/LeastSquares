import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, ImageBackground, Image, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import styles from './style';

const About = () => {
  const navigation = useNavigation();

  function handleNavitateToMenu() {
    navigation.navigate('Menu');
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/background-2.png')}
      imageStyle={{ width: 600, height: 880 }}
    >
      <View style={styles.main}>
        <View>
          <Text style={styles.title}>Mínimos quadrados</Text>
        </View>

        <Text>
            aaa
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>v1.0 - June/2020</Text>
      </View>
    </ImageBackground>
  );
};

export default About;
