import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ImageBackground, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';

import styles from './style';
import lightMode from './styleLight';
import darkMode from './styleDark';

const About = () => {
  const [style, setStyle] = useState<number>(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const theme = (style == 1) ? lightMode : darkMode;
  const background = (style == 1) 
    ? require('../../assets/background-1.png')
    : require('../../assets/background-2.png')
  const returnButton = (style == 1)
    ? <Icon name='arrow-left' size={28} color='#000' />
    : <Icon name='arrow-left' size={28} color='#FFF' />

  //---------------------------------------------------

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
    const memoryStyle = await getData('@style');
    setStyle(Number(memoryStyle));
  }

  //-----------------------------------

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Contato via LeastSquares',
      recipients: ['andrecrepper@gmail.com']
    });
  }

  function handlePlayRedirect() {
    Linking.openURL('https://play.google.com/store/apps/developer?id=Andr%C3%A9+Zanardi+Creppe&hl=pt_BR')
  }

  function handleNavitateToMenu() {
    navigation.goBack();
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={background}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View>
        <TouchableOpacity onPress={handleNavitateToMenu}>
          {returnButton}
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={[styles.box, theme.lightBlue]}>
          <Text style={styles.title}>
            {I18n.t('about.leastSquaresTitle')}
          </Text>
          <Text style={styles.subtitle}>
            {I18n.t('about.leastSquaresInfo')}
          </Text>
        </View>

        <View style={[styles.box, theme.blue]}>
          <Text style={styles.title}>
            {I18n.t('about.contactTitle')}
          </Text>
          <Text style={styles.subtitle}>
            {I18n.t('about.contactInfo')}
          </Text>
          <TouchableOpacity onPress={handleComposeMail}>
            <Text style={[styles.subtitle, theme.contactText]}>
              andrecrepper@gmail.com{"\n"}
              @andrecreppe
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, theme.darkBlue]}>
          <TouchableOpacity onPress={handlePlayRedirect}>
            <Text style={[styles.title]}>
              {I18n.t('about.storeTitle')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.subtitle]}>
            {I18n.t('about.storeInfo')}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.version, theme.version]}>{I18n.t('about.version')}</Text>
      </View>
    </ImageBackground>
  );
};

export default About;
