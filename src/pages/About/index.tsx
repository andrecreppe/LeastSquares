import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import { View, ImageBackground, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import styles from './style';

const About = () => {
  const navigation = useNavigation();

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
      source={require('../../assets/background-2.png')}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View style={styles.return}>
        <TouchableOpacity onPress={handleNavitateToMenu}>
            <Icon name='arrow-left' size={25} color='#000000' />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={[styles.box, styles.lightBlue]}>
          <Text style={styles.title}>
            O que é são os Mínimos Quadrados?
          </Text>
          <Text style={styles.subtitle}>
            O Método dos Mínimos Quadrados é uma técnica de otimização matemática que procura encontrar o melhor ajuste para um conjunto de dados tentando minimizar a discrepância entre eles.
          </Text>
        </View>

        <View style={[styles.box, styles.blue]}>
          <Text style={styles.title}>
            Contato
          </Text>
          <Text style={styles.subtitle}>
            Encontrou um bug? Deseja ver uma nova funcionalidade? Fale comigo!
          </Text>
          <TouchableOpacity onPress={handleComposeMail}>
            <Text style={[styles.subtitle, styles.contactText]}>
              andrecrepper@gmail.com{"\n"}
              @andrecreppe
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, styles.darkBlue]}>
          <TouchableOpacity onPress={handlePlayRedirect}>
            <Text style={styles.title}>
              Avalie o app na PlayStore
            </Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            Sua opinião é importante para o aplicativo ser o mais sensacional possível.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>v1.0 - June/2020</Text>
      </View>
    </ImageBackground>
  );
};

export default About;
