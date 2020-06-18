import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ImageBackground, Image, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';

import styles from './style';
import lightMode from './styleLight';
import darkMode from './styleDark';

const Menu = () => {
  const [style, setStyle] = useState<number>();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const theme = (style == 1) ? lightMode : darkMode;
  const logo = (style == 1) 
    ? <Image style={styles.logo} source={require('../../assets/logo-1.png')} />
    : <Image style={styles.logo} source={require('../../assets/logo-2.png')} />
  const background = (style == 1) 
    ? require('../../assets/background-1.png')
    : require('../../assets/background-2.png')

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

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      TriggerAlert(I18n.t('error.storeError') + e);
    }
  }

  //Default config values here
  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      
      if(value == null) { //Set for the first time - DEFAULT CONFIGS
        storeData('@precision', '6');
        storeData('@style', '1');
      } else {
        return value;
      }
    } catch(e) {
      TriggerAlert(I18n.t('error.readError') + e)
    }
  }

  async function loadConfiguredData() {
    const memoryStyle = await getData('@style');
    setStyle(Number(memoryStyle));
  }

   //Just to force reload the language
   useEffect(() => {
    loadConfiguredData();
   }, [isFocused])

  function handleNavitateToPoints() {
    navigation.navigate('Points');
  }

  function handleNavitateToAbout() {
    navigation.navigate('About');
  }

  function handleNavitateToSettings() {
    navigation.navigate('Settings');
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground 
        style={styles.container}
        source={background}
        imageStyle={{ width: 580, height: 880 }}
      >
        <View style={styles.main}>
          <View>
            <Text style={[styles.title, theme.title]}>{I18n.t('menu.leastSquares')}</Text>
          </View>

          <View style={styles.logo}>
            {logo}
          </View>

          <RectButton style={[styles.buttonGo, theme.buttonGo]} onPress={handleNavitateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='chevrons-right' color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={[styles.buttonText, theme.buttonText]}>
              {I18n.t('menu.start')}
            </Text>
          </RectButton>
        </View>

        <View style={styles.footer}>
          <RectButton style={[theme.buttonAbout, styles.buttomBottom]} onPress={handleNavitateToAbout}>
            <View style={styles.buttonIcon}>
              <Icon name='info' color="#FFF" size={22} />
            </View>
            <Text style={[styles.buttonText, theme.buttonText]}>
              {I18n.t('menu.about')}
            </Text>
          </RectButton>

          <RectButton style={[theme.buttonConfigs, styles.buttomBottom]} onPress={handleNavitateToSettings}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='settings' color="#FFF" size={22} />
              </Text>
            </View>
            <Text style={[styles.buttonText, theme.buttonText]}>
              {I18n.t('menu.settings')}
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Menu;
