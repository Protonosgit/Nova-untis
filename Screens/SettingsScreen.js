import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ModalPopup } from './components/dialogs/Modal1';


export default function SettingsScreen( {navigation} ) {

  const [modalVisible,setVisibility] = useState(false);

  async function logout() {
    await SecureStore.setItemAsync('user', 'false');
    navigation.replace('Splash');
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headding}>
        <Image style={styles.smallIcon} source={require('./assets/untis.png')}/>
          <Text style={styles.head1}>Nova Untis</Text>
        </View>
      <View style={styles.body}>
        
      <View style={styles.panel}>
        <Text style={styles.head3}>Profile</Text>
        <Button title='Logout' onPress={logout}/>
        <ModalPopup visible={modalVisible} ></ModalPopup>
        <Button title='ShowMe' onPress={() => setVisibility(true)}/>
        <View style={styles.lister}>
        </View>
      </View>

      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 10,
  },
  headding: {
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  smallIcon: {
    width: 80,
    height: 80,
  },
  head1: {
    marginLeft: 10,
    width: '100%',
    textAlign: 'left',
    fontSize: 25,
  },
  head3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  panel:{
    padding: 10,
    height: 200,
    width: '90%',
    margin: 50,
    borderRadius: 20,
    backgroundColor: 'lightgray'
  },
  lister: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }
});
