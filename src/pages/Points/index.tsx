import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather as Icon, MaterialIcons as IconM } from '@expo/vector-icons';

import styles from './style';

const Points = () => {
  const navigation = useNavigation();

  function handleNavitateToMenu() {
    navigation.goBack();
  }

  function handleNavigateToGraph() {
    //navigation.navigate('Graph');
  }

  //------------------------------------

  function handleSavePoint() {

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
        <View>
          <Text style={styles.title}>
            Insira um ponto (x,y)
          </Text>

          <View style={styles.box}>
            <View style={styles.dataInputFormat}>
              <Text style={styles.dataInputText}>(</Text>

              <TextInput  
                placeholder="X"  
                underlineColorAndroid='transparent'  
                style={styles.dataInput}  
                keyboardType={'numeric'}
              />

              <Text style={styles.dataInputText}>,</Text>

              <TextInput  
                placeholder="Y"  
                underlineColorAndroid='transparent'  
                style={styles.dataInput}  
                keyboardType={'numeric'}
              />

              <Text style={styles.dataInputText}>)</Text>
            </View>

            <RectButton style={styles.savePoint} onPress={handleSavePoint} >
              <Icon name='save' color="#27ba3d" size={32} />
            </RectButton>
          </View>
        </View>

        <View>
          <Text style={styles.title}>
            Pontos registrados
          </Text>

          <View style={styles.box}>
            <View style={styles.bigBox}>
              <Text>CONTROL HERE</Text>
              <Text>SCROLL AREA HERE</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.box}>
            <Text style={styles.subtitle}>
              *Não se preocupe, se sair da página os dados não serão perdidos!
            </Text>
          </View>

          <RectButton style={styles.buttonCalculate} onPress={handleNavigateToGraph}>
            <View style={styles.buttonIcon}>
              <IconM name='functions' color="#FFF" size={28} />
            </View>
            <Text style={styles.buttonText}>
              Calcular
            </Text>
          </RectButton>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Points;
