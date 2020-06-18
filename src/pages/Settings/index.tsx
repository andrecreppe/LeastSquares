/*
Adicionar no README
Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon"> www.flaticon.com</a>
*/

import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import I18nDefault from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ImageBackground, Text, TouchableOpacity, Image, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Picker } from '@react-native-community/picker';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';

import styles from './style';
import lightMode from './styleLight';
import darkMode from './styleDark';

const Settings = () => {
  const currentLanguage = I18nDefault.currentLocale();
  const [precision, setPrecision] = useState<number>(0);
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

  function handleNavigateToMenu() {
    navigation.goBack();
  }

  //----------------------------------------------

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

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      TriggerAlert(I18n.t('error.storeError') + e);
    }
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
  
  //-----------------------------------------------

  function handleChangeLanguage(langCode: string) {
    I18nDefault.locale = langCode;
    navigation.goBack();
  }

  function getCurrentLanguageFlag() {
    if(currentLanguage == 'pt') {
      return <Image style={styles.flag} source={require('../../assets/pt.png')} ></Image>
    } else if(currentLanguage == 'en') {
      return <Image style={styles.flag} source={require('../../assets/en.png')} ></Image>
    } else {
      return <Image style={styles.flag} source={require('../../assets/de.png')} ></Image>
    }
  }

  function handleUpdateDecimalSettings(roundPlaces: string) {
    storeData('@precision', roundPlaces)
  }

  function handleChangeStyle(styleNumber: string) {
    storeData('@style', styleNumber)
    navigation.goBack();
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={background}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View>
        <TouchableOpacity onPress={handleNavigateToMenu}>
          {returnButton}
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style= {[styles.box, theme.languageColor]}>
          <Text style={[styles.title, theme.title]}>{I18n.t('settings.languageTitle')}</Text>
          
          <View style={styles.miniBox} >
            <Picker
              selectedValue={currentLanguage}
              style={{ height: 50, width: 200, marginRight: 50, marginTop: 10 }}
              onValueChange={(itemValue) => { handleChangeLanguage(itemValue.toString()) }}>
              <Picker.Item label="Deutsch" value="de" />
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Português" value="pt" />
            </Picker>

            {getCurrentLanguageFlag()}
          </View>
        </View>

        <View style={[styles.box, theme.precisionColor]}>
          <Text style={[styles.title, theme.title]}>{I18n.t('settings.decimalPlaces')}</Text>
          
          <NumericInput
            initValue={precision}
            maxValue={10}
            minValue={0}
            onChange={value => handleUpdateDecimalSettings(value.toString())}

            containerStyle={styles.upDown}
            textColor='#000'
            leftButtonBackgroundColor='#bfbfbf'
            rightButtonBackgroundColor='#a8a8a8' 
            totalWidth={240} 
            totalHeight={50}
            rounded
          />
        </View>

        <View style={[styles.box, theme.styleColor]}>
          <Text style={[styles.title, theme.title]}>{I18n.t('settings.style')}</Text>
          
          <View style={styles.miniBox} >
            <Picker
              selectedValue={style}
              style={{ height: 50, width: 200, marginTop: 10 }}
              onValueChange={(itemValue) => { handleChangeStyle(itemValue.toString()) }}>
              <Picker.Item label={I18n.t('settings.lightMode')} value={1} />
              <Picker.Item label={I18n.t('settings.darkMode')} value={2} />
            </Picker>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Settings;
