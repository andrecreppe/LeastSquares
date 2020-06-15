import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import { View, ImageBackground, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
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
      <View>
        <TouchableOpacity onPress={handleNavitateToMenu}>
            <Icon name='arrow-left' size={28} color='#000000' />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={[styles.box, styles.lightBlue]}>
          <Text style={styles.title}>
            {I18n.t('about.leastSquaresTitle')}
          </Text>
          <Text style={styles.subtitle}>
            {I18n.t('about.leastSquaresInfo')}
          </Text>
        </View>

        <View style={[styles.box, styles.blue]}>
          <Text style={styles.title}>
            {I18n.t('about.contactTitle')}
          </Text>
          <Text style={styles.subtitle}>
            {I18n.t('about.contactInfo')}
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
              {I18n.t('about.storeTitle')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            {I18n.t('about.storeInfo')}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>{I18n.t('about.version')}</Text>
      </View>
    </ImageBackground>
  );
};

export default About;
