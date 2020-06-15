/*
Adicionar no README
Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon"> www.flaticon.com</a>
*/

/*
https://react-native-community.github.io/async-storage/ - ARMAZENAMENTO
*/

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import I18nDefault from 'i18n-js';

import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
import styles from './style';

const Settings = () => {
  const navigation = useNavigation();

  function handleNavigateToMenu() {
    navigation.goBack();
  }

  function handleChangeLanguage(langCode: string) {
    I18nDefault.locale = langCode;
    navigation.goBack();
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
        <View>
          <Text style={styles.title}>{I18n.t('settings.languageTitle')}</Text>
          <Picker
            selectedValue={I18nDefault.currentLocale()}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue) => { handleChangeLanguage(itemValue.toString()) }}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Português" value="pt" />
          </Picker>
        </View>

        <View>
          <Text style={styles.title}>{I18n.t('settings.decimalPlaces')}</Text>
          <Text>Numeric updown</Text>
        </View>

        <View>
          <Text style={styles.title}>{I18n.t('settings.style')}</Text>
          <Text>Light mode // Dark mode</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Settings;
