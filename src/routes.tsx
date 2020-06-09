import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './pages/Menu';
import About from './pages/About';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        headerMode="none" 
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}
      >
        <AppStack.Screen name="Home" component={Menu}/>
        <AppStack.Screen name="About" component={About}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
