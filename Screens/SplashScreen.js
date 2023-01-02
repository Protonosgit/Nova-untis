import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Image, StyleSheet, Text, View } from 'react-native';


export default function SplashScreen( {navigation} ) {

  async function getKey() {
    let result = await SecureStore.getItemAsync('user');
    if (result) {
      if (result==='true') {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    } else {
      navigation.replace('Login');
    }
    
  }

  setTimeout(getKey,2000);

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


// https://open.spotify.com/playlist/0rwKLZshzJsrFKSGpycScI?si=356a05427192434c   :)