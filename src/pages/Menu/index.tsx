import React, { useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ImageBackground, Image, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
import styles from './style';

const Menu = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
        storeData('@precision', '5');
        storeData('@style', '1');
      }
    } catch(e) {
      TriggerAlert(I18n.t('error.readError') + e)
    }
  }

   //Just to force reload the language
   useEffect(() => {
    getData('@precision');
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
        source={require('../../assets/background-2.png')}
        imageStyle={{ width: 580, height: 880 }}
      >
        <View style={styles.main}>
          <View>
            <Text style={styles.title}>{I18n.t('menu.leastSquares')}</Text>
          </View>

          <View>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
          </View>

          <RectButton style={styles.buttonGo} onPress={handleNavitateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='chevrons-right' color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              {I18n.t('menu.start')}
            </Text>
          </RectButton>
        </View>

        <View style={styles.footer}>
          <RectButton style={[styles.buttonAbout, styles.buttomBottom]} onPress={handleNavitateToAbout}>
            <View style={styles.buttonIcon}>
              <Icon name='info' color="#FFF" size={22} />
            </View>
            <Text style={styles.buttonText}>
              {I18n.t('menu.about')}
            </Text>
          </RectButton>

          <RectButton style={[styles.buttonConfigs, styles.buttomBottom]} onPress={handleNavitateToSettings}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='settings' color="#FFF" size={22} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              {I18n.t('menu.settings')}
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Menu;
