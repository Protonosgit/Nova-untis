import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View, Image, Modal, Switch, ScrollView,TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AccountPicker } from './components/dialogs/AccountPicker';
import * as database from './components/DatabaseHandler';
import { ContextStore } from './components/ContextStore';
import * as untis from './components/UntisApi';
import { ButtonSwitch, Element1 } from './components/Elements'

export default function SettingsScreen( {navigation} ) {

  const [unametxt,setunametxt] = useState('User_Name');
  const [switch1,setswitch1] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const {ActiveUser,setActiveUser} = useContext(ContextStore);
  const {UntisSession,setUntisSession} = useContext(ContextStore);
  const bottomSheet = useRef(null);
  const snapPoints = ['20%','48%'];

  function handleBottomSheet() {
    bottomSheet.current?.present();
  }
  useEffect(()=> {
    database.getAccountInfo(ActiveUser).then(res => {
      setunametxt(res.username);
    });
  },[ActiveUser]);
  useEffect(()=> {
    loginapi();
  },[])

  // key value sys
  function setKey(key, value) {
    return SecureStore.setItemAsync(key, value)
      .catch((error) => {
        console.error(`Error saving item with key: ${key}`, error);
      });
  }
  async function getKey(key) {
    return SecureStore.getItemAsync(key)
  }
  // prepare toasts
  const showToast = (ToastType,ToastMessage) => {
    Toast.show({
      type: ToastType,
      text1: ToastMessage,
    });
  }
  //check internet connection (broken)
  useEffect(()=>{NetInfo.addEventListener(state => {setIsConnected(state.isConnected)})},[]);

// login untis
  async function loginapi() {
    if (true) {
      const uname = await getKey('ActiveUname');
      const upw = await getKey('ActivePass');
      untis.login(uname,upw).then(res => {
        const sess = res.result;
        setKey('UntisUser',JSON.stringify(res.result));
        setUntisSession(res.result);
        database.resetConfig().then(()=>{untis.initConfigChain(sess)});
        
      });
    } else {showToast('error','No Internet Connection')}
  }


  //reset data
  function killdata() {
    database.purge();
    setTimeout(() =>{
      navigation.reset({
        index: 0,
        routes: [{name: 'Splash'}],
      });
    },1000);
    showToast('info','Deleting data ♻️');
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
      <Button title='Test read rows' onPress={()=>{untis.getStatus().then((res)=>{console.log(res)})}}/>
        <View style={styles.headding}>
        <Image style={styles.smallIcon} source={require('./assets/untis.png')}/>
          <Text style={styles.head1}>Nova Untis</Text>
        </View>
        <ScrollView>
      <View style={styles.body}>
        
      <View style={[styles.panel, {height:'20%'}]}>
        <View style={styles.inset1}>
          <Image style={{height:60,width:60}} source={require('./assets/placeholder.jpeg')}/>
              <Text style={[styles.head3, {marginLeft:10,}]}>{unametxt}</Text>
              <TouchableOpacity onPress={handleBottomSheet}>
              <Image style={{height:30,width:30,marginLeft:10,}} source={require('./assets/changeuser_icon.png')}/>
              </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={()=>{navigation.replace('Login')}}>
        <View style={styles.inset1}>
          <Image style={{height:40,width:40,marginLeft:30,}} source={require('./assets/adduser_icon.png')}/>
          <Text style={{fontSize:20,marginLeft:10,}}>Add user</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.panel}>
        <Text style={styles.head3}>Apperance:</Text>
        <ButtonSwitch text='Hallo freund' />
      </View>

      <View style={styles.panel}>
        <Text style={styles.head3}>Functions:</Text>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Switch value={switch1} onValueChange={() => {setswitch1(!switch1)}}/>
        <Button onPress={killdata} title='Delete all data'/>
      </View>
      </View>
      </ScrollView>
      
      <StatusBar style="auto" />
    </SafeAreaView>
    <AccountPicker snapPoints={snapPoints} btsref={bottomSheet}/>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    margin: 8,
    width: 50,
    height: 50,
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
    backgroundColor: 'lightgray',
  },
  inset1: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',

  },
  test: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});