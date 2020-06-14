import React, { useState, createRef, PureComponent } from 'react';
import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, PointPropType } from 'react-native';
import { Feather as Icon, MaterialIcons as IconM } from '@expo/vector-icons';

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

  let editIndex = -1;

  //------------------------------------

  function handleNavitateToMenu() {
    navigation.goBack();
  }

  function handleNavigateToGraph() {
    //navigation.navigate('Graph');

    //mínimo de 3 pontos!
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
            Insira um ponto
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
              Pontos registrados
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
                <Text>Insira pelo menos 3 pontos para começar!</Text>
              )}
             </ScrollView>
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
