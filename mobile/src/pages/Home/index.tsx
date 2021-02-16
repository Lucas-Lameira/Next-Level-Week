import React, {useState} from 'react';
import {Image, ImageBackground, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RectButton} from 'react-native-gesture-handler';
import {Feather as Icon} from '@expo/vector-icons';

const Home = () => {
  const navigation = useNavigation();

  //        STATE / ESTADO
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  function goToPoint(){
    navigation.navigate('Points', {
      uf,
      city
    })
  }
  
  return (   
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{width: 274, height:368}}
      >

        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')}/>
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
        </View>

        

        <View style={styles.footer}>

        <TextInput 
          style={styles.input} 
          placeholder='UF'  
          value={uf}
          maxLength={2}
          autoCapitalize="characters"
          autoCorrect={false}
          onChangeText={setUf}  
        />
        <TextInput 
          style={styles.input} 
          placeholder="Cidade"
          value={city}
          autoCorrect={false}
          onChangeText={setCity}
        /> 

          <RectButton style={styles.button} onPress={goToPoint}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" size={20} color="#FFF" />
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>  
    </KeyboardAvoidingView>               
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#000000',
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 24,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;