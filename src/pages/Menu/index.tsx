import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, View, ImageBackground, Image, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

const Menu = () => {
  const navigation = useNavigation();

  function handleNavitateToData() {
    navigation.navigate('Data');
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
        imageStyle={{ width: 600, height: 880 }}
      >
        <View style={styles.main}>
          <View>
            <Text style={styles.title}>Mínimos quadrados</Text>
          </View>

          <View>
            <Image style={styles.logo} source={require('../../assets/graphic.png')} />
          </View>

          <RectButton style={styles.buttonCalculate} onPress={handleNavitateToData}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Calcular
            </Text>
          </RectButton>
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.buttonAbout} onPress={handleNavitateToAbout}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='info' color="#FFF" size={22} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Sobre
            </Text>
          </RectButton>

          <RectButton style={styles.buttonConfigs} onPress={handleNavitateToSettings}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    marginTop: 64,
    alignSelf: "center"
  },

  logo: {
    alignSelf: 'center',
    marginTop: 64,
    marginBottom: 128
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Ubuntu_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {
    flexDirection: 'row'
  },

  input: {
    height: 60,
    backgroundColor: '#F0F0F5',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  buttonCalculate: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonAbout: {
    backgroundColor: '#645676',
    height: 60,
    width: 170,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 15
  },

  buttonConfigs: {
    backgroundColor: '#15B6B6',
    height: 60,
    width: 170,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 15
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 16,
  }
});

export default Menu;
