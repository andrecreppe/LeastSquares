import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './pages/Menu';
import About from './pages/About';
import Points from './pages/Points';
import Graph from './pages/Graph';
import Settings from './pages/Settings';

const AppStack = createStackNavigator();

const navigatorOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
}

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        screenOptions={navigatorOptions}
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
