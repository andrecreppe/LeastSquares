/*
Adicionar no README
Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon"> www.flaticon.com</a>
*/

/*
https://react-native-community.github.io/async-storage/ - ARMAZENAMENTO
*/

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import I18nDefault from 'i18n-js';

import { View, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Picker } from '@react-native-community/picker';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
import styles from './style';

const Settings = () => {
  const currentLanguage = I18nDefault.currentLocale();
  const currentStyle = 1;

  const navigation = useNavigation();

  function handleNavigateToMenu() {
    navigation.goBack();
  }

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

  function handleUpdateDecimalSettings(roundPlaces: number) {

  }

  function handleChangeStyle(styleNumber: string) {
    
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/background-2.png')}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View>
        <TouchableOpacity onPress={handleNavigateToMenu}>
            <Icon name='arrow-left' size={28} color='#000000' />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style= {[styles.box, styles.languageColor]}>
          <Text style={styles.title}>{I18n.t('settings.languageTitle')}</Text>
          
          <View style={styles.miniBox} >
            <Picker
              selectedValue={currentLanguage}
              style={{ height: 50, width: 200, marginRight: 50, marginTop: 10 }}
              onValueChange={(itemValue) => { handleChangeLanguage(itemValue.toString()) }}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Português" value="pt" />
              <Picker.Item label="Deutsch" value="de" />
            </Picker>

            {getCurrentLanguageFlag()}
          </View>
        </View>

        <View style={[styles.box, styles.precisionColor]}>
          <Text style={styles.title}>{I18n.t('settings.decimalPlaces')}</Text>
          
          <NumericInput 
            initValue={5}
            maxValue={10}
            minValue={0}
            onChange={value => handleUpdateDecimalSettings(value)}

            containerStyle={styles.upDown}
            textColor='#000'
            leftButtonBackgroundColor='#bfbfbf'
            rightButtonBackgroundColor='#a8a8a8' 
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}       
            rounded
          />
        </View>

        <View style={[styles.box, styles.styleColor]}>
          <Text style={styles.title}>{I18n.t('settings.style')}</Text>
          
          <View style={styles.miniBox} >
            <Picker
              selectedValue={currentStyle}
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
