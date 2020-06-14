import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './pages/Menu';
import About from './pages/About';
import Points from './pages/Points';
import Graph from './pages/Graph';
import Settings from './pages/Settings';

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
        <AppStack.Screen name="Points" component={Points}/>
        <AppStack.Screen name="Graph" component={Graph}/>
        <AppStack.Screen name="Settings" component={Settings}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
