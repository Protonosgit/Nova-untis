import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View,TextInput } from 'react-native';


export default function LoginScreen( {navigation} ) {

  const [usrname, setusrname] = useState('');
  const [usrpass, setusrpass] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'You have been logged in 👋',
    });
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  function userup(text) {
    setusrname(text);
  }
  function passup(text) {
    setusrpass(text);
  }
  function login() {
    if(usrname.length<3) {
      alert('Username too short');
    }
    else if (usrpass<3) {
      alert('Password too short');
    }
    else {
      save('uname',usrname);
      save('user','true');
      showToast();
      navigation.replace('Home');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.titles}>School:</Text>
        <View style={styles.school}><Text style={styles.schooltxt}>Leibniz Gymn. Neustadt</Text></View>
        <Text style={styles.titles}>User:</Text>
        <View style={styles.inputmask}><TextInput style={styles.userinput} placeholder='Username' onChangeText={userup} /></View>
        <Text style={styles.titles}>Password:</Text>
        <View style={styles.inputmask}><TextInput style={styles.userinput} secureTextEntry={true} placeholder='Password' onChangeText={passup} /></View>
        <Button title='Login' onPress={login} />
      </View>
      <StatusBar style="auto" />
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
  panel: {
    padding: 20,
    width: '85%',
  },
  school: {
    backgroundColor: 'lightgrey',
    padding: 8,
    borderRadius: 20,
  },
  schooltxt: {
    textAlign: 'center',
    fontSize: 18,
  },
  titles: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  userinput: {
    fontSize: 18,
  },
  inputmask: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 8,
    marginBottom: 10,
  }
});
