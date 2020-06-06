import React from 'react';
import { Text, StatusBar, View } from 'react-native';

import {AppLoading} from 'expo';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto';

//importar a rota 
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_500Medium, 
    Roboto_700Bold
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <> 
      <StatusBar 
        barStyle= "dark-content" 
        backgroundColor="trasparent" 
        translucent
      />
      <Routes/>
    </>    
  );
}

 


