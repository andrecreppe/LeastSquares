import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';

import { Ubuntu_400Regular, Ubuntu_500Medium, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/> */}
      <StatusBar hidden />
      <Routes />
    </>
  );
}
