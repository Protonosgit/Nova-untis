import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View, Image, Modal, Switch, ScrollView,TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';


export default function SettingsScreen( {navigation} ) {

  const [unametxt,setunametxt] = useState('User_Name');
  const [switch1,setswitch1] = useState(false);

  async function logout() {
    await SecureStore.setItemAsync('user', 'false');
    navigation.replace('Splash');
  }

  async function getuname() {
    let result = await SecureStore.getItemAsync('uname');
    if (result) {
      setunametxt(result);
    }
  }
  getuname();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headding}>
        <Image style={styles.smallIcon} source={require('./assets/untis.png')}/>
          <Text style={styles.head1}>Nova Untis</Text>
        </View>
        <ScrollView>
      <View style={styles.body}>

      <Button title='Logout' onPress={logout}/>
        
      <View style={[styles.panel, {height:'20%'}]}>
        <View style={styles.inset1}>
          <Image style={{height:60,width:60}} source={require('./assets/placeholder.jpeg')}/>
          <Text style={[styles.head3, {marginLeft:10,}]}>{unametxt}</Text>
          <Image style={{height:30,width:30,marginLeft:10,}} source={require('./assets/placeholder.jpeg')}/>
        </View>
        <TouchableWithoutFeedback onPress={()=>{console.log('Add user call')}}>
        <View style={styles.inset1}>
          <Image style={{height:40,width:40,marginLeft:30,}} source={require('./assets/placeholder.jpeg')}/>
          <Text style={{fontSize:20,marginLeft:10,}}>Add user</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.panel}>
        <Text style={styles.head3}>Apperance:</Text>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
      </View>

      <View style={styles.panel}>
        <Text style={styles.head3}>Functions:</Text>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
      </View>

      </View>
      
      <StatusBar style="auto" />
      </ScrollView>
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
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  panel:{
    padding: 10,
    //height: '20%',
    width: '90%',
    margin: 50,
    borderRadius: 20,
    backgroundColor: 'lightgray'
  },
  inset1: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',

  },
});