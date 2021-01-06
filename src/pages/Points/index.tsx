import React, { useState, createRef, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Feather as Icon, MaterialIcons as IconM } from '@expo/vector-icons';
import I18n from '../../utils/I18n';
import { Point } from '../../interfaces/point.interface';

import styles from './style';
import lightMode from './styleLight';
import darkMode from './styleDark';

const Points = () => {
  const [style, setStyle] = useState<number>(0);
  const [typedX, setTypedX] = useState<string>('');
  const [typedY, setTypedY] = useState<string>('');
  const [points, setPoints] = useState<Point[]>([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const inputXRef = createRef<TextInput>();
  const inputYRef = createRef<TextInput>();

  const theme = (style == 1) ? lightMode : darkMode;
  const background = (style == 1) 
    ? require('../../assets/background-1.png')
    : require('../../assets/background-2.png');
  const returnButton = (style == 1)
    ? <Icon name='arrow-left' size={28} color='#000' />
    : <Icon name='arrow-left' size={28} color='#FFF' />
  const trashButton = (style == 1)
  ? <Icon name='trash-2' color="#000" size={28} />
  : <Icon name='trash-2' color="#FFF" size={28} />

  //---------------------------------------------------

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

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if(value !== null) {
        return value;
      }
    } catch(e) {
      TriggerAlert(I18n.t('error.readError') + e);
    }
  }
  
  async function loadConfiguredData() {
    const memoryStyle = await getData('@style');
    setStyle(Number(memoryStyle));
  }

  //------------------------------------

  function handleNavitateToMenu() {
    navigation.goBack();
  }

  function sendAlert(message: string) {
    Alert.alert(
      I18n.t('points.alertTitle'),
      message,
      [
        { text: I18n.t('points.alertButton') }
      ],
      { cancelable: false }
    );
  }

  function handleNavigateToGraph() {
    if(points.length < 3) {
      sendAlert(I18n.t('points.alertLength'));
      return;
    }

    //All the same points
    let count = 1;
    for(let i=1; i<points.length; i++) {
      if((points[0].x == points[i].x) && (points[0].y == points[i].y)) {
        count++;
      }
    }

    if(count === points.length) {
      sendAlert(I18n.t('points.alertEqualPoitns'))
      return;
    }

    //NaN error - all in X or Y
    let countX = 0;
    let countY = 0;
    for(let i=0; i<points.length; i++) {
      if(points[i].x == 0) {
        countX++;
      }
      if(points[i].y == 0) {
        countY++;
      }
    }

    if(countX == points.length || countY == points.length) {
      TriggerAlert(I18n.t('errors.nanError'));
      return;
    }

    //Generate the graph
    navigation.navigate('Graph', points);
  }

  //------------------------------------

  function formatInput(coordinate: string) {
    let cleanCoordinate = coordinate.replace(',', '.');
    
    //Remover double point
    while(cleanCoordinate.split('.').length > 2) {
      cleanCoordinate = cleanCoordinate.replace(/.([^.]*)$/, '$1');
    }

    return cleanCoordinate;
  }

  function handleSavePoint() {
    const x = Number(formatInput(typedX));
    const y = Number(formatInput(typedY));

    const index = points.length;

    setPoints([...points, {index, x, y}]);

    inputXRef.current?.clear();
    setTypedX('0');
    inputYRef.current?.clear();
    setTypedY('0');
  }

  function handleClearAllPoints() {
    setPoints([]);
  }

  function handleDeletePoint(position: number) {    
    const newPoints = points.filter((point) => {
      if(point.index > position) {
        point.index--;
        return point;
      } else if(point.index < position) {
        return point;
      }
    });

    setPoints(newPoints);
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={background}
      imageStyle={{ width: 580, height: 880 }}
    >
      <View>
        <TouchableOpacity onPress={handleNavitateToMenu}>
          {returnButton}
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View>
          <Text style={[styles.title, theme.title]}>
            {I18n.t('points.insertPoint')}
          </Text>

          <View style={[styles.box, theme.box]}>
            <View style={styles.dataInputFormat}>
              <Text style={[styles.dataInputText, theme.dataInputText]}>(</Text>

              <TextInput  
                placeholder="X"
                underlineColorAndroid='transparent'  
                style={[styles.dataInput, theme.dataInput]}
                keyboardType={'numeric'}
                onChangeText={text => setTypedX(text)}
                ref={inputXRef}
              />

              <Text style={[styles.dataInputText, theme.dataInputText]}>,</Text>

              <TextInput  
                placeholder="Y"
                underlineColorAndroid='transparent'  
                style={[styles.dataInput, theme.dataInput]}  
                keyboardType={'numeric'}
                onChangeText={text => setTypedY(text)}
                ref={inputYRef}
              />

              <Text style={[styles.dataInputText, theme.dataInputText]}>)</Text>
            </View>

            <View style={styles.savePoint}>
              <RectButton onPress={handleSavePoint} >
                <Icon name='save' color="#27ba3d" size={32} />
              </RectButton>
            </View>
          </View>
        </View>

        <View>
          <View style={[styles.boxClear]}>
            <Text style={[styles.title, theme.title]}>
              {I18n.t('points.registeredPoints')}
            </Text>

            <RectButton 
              style={styles.reset}
              onPress={handleClearAllPoints}
            >
              {trashButton}
            </RectButton>
          </View>

          <View style={[styles.box, theme.box]}>
            <View style={styles.bigBox}>
             <ScrollView style={styles.scroll}>
              {(points.length > 0) ? points.map(point => (
                <View style={styles.points}>
                  <Text key={point.index} style={[styles.point, theme.point]}>
                    {point.index+1}. ({point.x}, {point.y})
                  </Text>
                    
                  <RectButton 
                    style={styles.pointOptions}
                    onPress={() => handleDeletePoint(point.index)}
                  >
                    <Icon name='trash' color="#FF0000" size={28} />
                  </RectButton>
                </View>
              )) : (
                <Text style={theme.darkMode}>{I18n.t('points.cleanRegistered')}</Text>
              )}
             </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={[styles.box, theme.box]}>
            <Text style={[styles.subtitle, theme.subtitle]}>
              {I18n.t('points.keepCalm')}
            </Text>
          </View>

          <RectButton style={[styles.buttonCalculate, theme.buttonCalculate]} onPress={handleNavigateToGraph}>
            <View style={styles.buttonIcon}>
              <IconM name='functions' color="#FFF" size={28} />
            </View>
            <Text style={[styles.buttonText, theme.buttonText]}>
              {I18n.t('points.calculateButton')}
            </Text>
          </RectButton>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Points;
