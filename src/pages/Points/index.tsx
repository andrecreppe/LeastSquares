import React, { useState, createRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Feather as Icon, MaterialIcons as IconM } from '@expo/vector-icons';

import I18n from '../../utils/I18n';
import styles from './style';

interface Point {
  index: number,
  x: number,
  y: number
}

const Points = () => {
  const [typedX, setTypedX] = useState<string>('');
  const [typedY, setTypedY] = useState<string>('');
  const [points, setPoints] = useState<Point[]>([]);

  const navigation = useNavigation();

  const inputXRef = createRef<TextInput>();
  const inputYRef = createRef<TextInput>();

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
      return
    }

    //All the same points
    let count = 1;
    
    for(let i=1; i<points.length; i++) {
      if((points[0].x == points[i].x) && points[0].y == points[i].y) {
        count++;
      }
    }

    if(count === points.length) {
      sendAlert(I18n.t('points.alertEqualPoitns'))
      return
    }

    //Generate the graph
    navigation.navigate('Graph', points);
  }

  //------------------------------------

  function formatInput(coordinate: string) {
    //Removes -
    let cleanCoordinate = coordinate.replace('-', '');
    
    //Remover double point
    while(cleanCoordinate.split('.').length > 2) {
      cleanCoordinate = cleanCoordinate.replace(/.([^.]*)$/, '$1')
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
        point.index--
        return point
      } else if(point.index < position) {
        return point
      }
    });

    setPoints(newPoints);
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
            {I18n.t('points.insertPoint')}
          </Text>

          <View style={styles.box}>
            <View style={styles.dataInputFormat}>
              <Text style={styles.dataInputText}>(</Text>

              <TextInput  
                placeholder="X"
                underlineColorAndroid='transparent'  
                style={styles.dataInput}
                keyboardType={'numeric'}
                onChangeText={text => setTypedX(text)}
                ref={inputXRef}
              />

              <Text style={styles.dataInputText}>,</Text>

              <TextInput  
                placeholder="Y"
                underlineColorAndroid='transparent'  
                style={styles.dataInput}  
                keyboardType={'numeric'}
                onChangeText={text => setTypedY(text)}
                ref={inputYRef}
              />

              <Text style={styles.dataInputText}>)</Text>
            </View>

            <View style={styles.savePoint}>
              <RectButton onPress={handleSavePoint} >
                <Icon name='save' color="#27ba3d" size={32} />
              </RectButton>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.boxClear}>
            <Text style={styles.title}>
              {I18n.t('points.registeredPoints')}
            </Text>

            <RectButton 
              style={styles.reset}
              onPress={handleClearAllPoints}
            >
                <Icon name='trash-2' color="#000" size={28} /> 
            </RectButton>
          </View>

          <View style={styles.box}>
            <View style={styles.bigBox}>
             <ScrollView style={styles.scroll}>
              {(points.length > 0) ? points.map(point => (
                <View style={styles.points}>
                  <Text key={point.index} style={styles.point}>
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
                <Text>{I18n.t('points.cleanRegistered')}</Text>
              )}
             </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.box}>
            <Text style={styles.subtitle}>
              {I18n.t('points.keepCalm')}
            </Text>
          </View>

          <RectButton style={styles.buttonCalculate} onPress={handleNavigateToGraph}>
            <View style={styles.buttonIcon}>
              <IconM name='functions' color="#FFF" size={28} />
            </View>
            <Text style={styles.buttonText}>
              {I18n.t('points.calculateButton')}
            </Text>
          </RectButton>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Points;
