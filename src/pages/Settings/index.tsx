import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import styles from './style';

const Settings = () => {
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
          <Text style={styles.title}>Idioma</Text>
        </View>

        <View>
          <Text style={styles.title}>Quantidade de casas decimais</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Settings;
