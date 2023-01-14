import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from 'react';

import * as database from './components/DatabaseHandler';
import { ContextStore } from './components/ContextStore';

export default function SplashScreen({ navigation }) {

  const {ActiveUser,setActiveUser} = useContext(ContextStore);

  function getKey(key) {
    return SecureStore.getItemAsync(key)
    .catch((error) => {
        console.error(`Error reading item with key: ${key}`, error);
      });
  }

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
    setTimeout(checkusers, 2000);
  }, [])


  

  return (
    <View style={styles.container}>
      <Image source={require('./assets/untis.png')} />
      <Text style={styles.headding}>Nova Untis</Text>
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