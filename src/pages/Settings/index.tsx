import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, ImageBackground, Text, TouchableOpacity, Picker } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
import styles from './style';

const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<number>()

  const navigation = useNavigation();

  function handleNavigateToMenu() {
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
            style={styles.languagePicker}
          >
            <Picker.Item label='English' value='en' />
            <Picker.Item label='Português' value='pt' />
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