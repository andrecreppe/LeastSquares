import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, ImageBackground, Image, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

import styles from './style';

const Menu = () => {
  const navigation = useNavigation();

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
            <Text style={styles.title}>Mínimos quadrados</Text>
          </View>

          <View>
            <Image style={styles.logo} source={require('../../assets/graphic.png')} />
          </View>

          <RectButton style={styles.buttonGo} onPress={handleNavitateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Começar
            </Text>
          </RectButton>
        </View>

        <View style={styles.footer}>
          <RectButton style={[styles.buttonAbout, styles.buttomBottom]} onPress={handleNavitateToAbout}>
            <View style={styles.buttonIcon}>
              <Icon name='info' color="#FFF" size={22} />
            </View>
            <Text style={styles.buttonText}>
              Sobre
            </Text>
          </RectButton>

          <RectButton style={[styles.buttonConfigs, styles.buttomBottom]} onPress={handleNavitateToSettings}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='settings' color="#FFF" size={22} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Ajustes
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Menu;
