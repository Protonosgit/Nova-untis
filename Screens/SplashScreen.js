import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from 'react';

import * as database from './components/DatabaseHandler';
import { ContextStore } from './components/ContextStore';

export default function SplashScreen({ navigation }) {

  const {ActiveUser,setActiveUser} = useContext(ContextStore);

  //Key value sys
  function getKey(key) {
    return SecureStore.getItemAsync(key)
    .catch((error) => {
        console.error(`Error reading item with key: ${key}`, error);
      });
  }

  //Check if logged in
  function checkusers() {
    database.getUserAccounts().then((count) => {
      if (count.rows._array.length == 0) {
        navigation.replace('Login');
      } else {
        navigation.replace('Home');
      }
    });
  }
  useEffect(() => {
    database.PreRun();
    getKey('ActiveUser').then((value) => {setActiveUser(value)});
    setTimeout(checkusers, 2200);
  }, [])


  

  return (
    <View style={styles.container}>
      <Image style={{width: 200,height:200}} source={require('./assets/untis.png')} />
      <Text style={styles.headding}>Project-Nova-Untis</Text>
      <Text style={{fontSize:20}}>[Active development ALPHA 0.0.1]</Text>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headding: {
    color: 'black',
    fontSize: 40,
  },
});

//Test