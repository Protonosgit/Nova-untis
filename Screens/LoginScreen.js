import { useState,useRef, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View,TextInput, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

import { SchoolSearch2 } from './components/dialogs/SchoolSearch';
import {untisLogin,untisLogout} from './components/UntisApi';
import { ContextStore } from './components/ContextStore';
import * as database from './components/DatabaseHandler';


export default function LoginScreen( {navigation} ) {

  const {Schoolname,setSchoolname} = useContext(ContextStore);
  const {SchoolInfo,setSchoolInfo} = useContext(ContextStore);

  // setup states and vars
  const [usrname, setusrname] = useState('');
  const [usrpass, setusrpass] = useState('');
  const [school,setschool] = useState('');
  const [uerr,setuerr] = useState('');
  const [perr,setperr] = useState('');
  const [showbackbtn,setshowbackbtn] = useState(false);
  const [showloading,setshowloading] = useState(false);
  const bottomSheet = useRef(null);

  // prepare toasts
  const showToast = (ToastType,ToastMessage) => {
    Toast.show({
      type: ToastType,
      text1: ToastMessage,
    });
  }

  // check user login
  async function getKey() {
    let result = await SecureStore.getItemAsync('user');
    if (result) {
      if (result==='true') {
        setshowbackbtn(true);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getKey();

  // handle bottomsheet
  function handleBottomSheet() {
    bottomSheet.current?.present();
  }
  // key value sys
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  // login user
  function checkcreds() {
    if(usrname.length<3) {
      setuerr('Username is too short');
    }
    else if (usrpass.length<3) {
      setperr('Password is too short')
    }
    else if(Schoolname==='Select your school') {
      alert('No school was selected');
    }
    else {
      setshowloading(true);
      login();
    }
  }

  // Run on start
  useEffect(()=> {
    
  },[]);

  // Untis api login call
  async function login() {
    untisLogin(usrname, usrpass).then((res)=>{
      setshowloading(false);
      if (res.result){
        database.add(SchoolInfo.address,SchoolInfo.displayName,SchoolInfo.loginName,SchoolInfo.schoolId,SchoolInfo.serverUrl,usrname,usrpass);
        save('uname',usrname);
        save('user','true');
        showToast('success','You have been logged in 👋');
        navigation.replace('Home');

      } else{ showToast('error','Login failed 🛑'); }});
  }
  // Untis api logout call
  async function callout() {
    untisLogout().then((res)=>{
      if (res.result===null){
        console.log('Logged out');
      } else{
        console.log('Error while logging out');
      }
    })
  }

  //debug
  function temptest() {
    database.getUserCount().then((res)=>{ console.log(res); })
  }


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.titles}>School:</Text>
        <TouchableWithoutFeedback onPress={handleBottomSheet}><View style={styles.school}><Text style={styles.schooltxt}>{'• '+Schoolname}</Text></View></TouchableWithoutFeedback>
        <Text style={styles.titles}>User:</Text>
        <View style={styles.inputmask}><TextInput style={styles.userinput} error={uerr} underlineColorAndroid={uerr ? 'red' : 'transparent'} placeholder='Username' onChangeText={(txt)=>{setuerr('');setusrname(txt)}} /></View>
        <Text style={styles.titles}>Password:</Text>
        <View style={styles.inputmask}><TextInput style={styles.userinput} error={perr} underlineColorAndroid={perr ? 'red' : 'transparent'} secureTextEntry={true} placeholder='Password' onChangeText={(txt)=>{setperr('');setusrpass(txt);}} /></View>
        <Button title='Login' onPress={checkcreds} disabled={showloading} />
        {
          showbackbtn?(
            <Button title='Cancel' onPress={()=>{navigation.replace('Home')}} />
          ):null
        }
                {
          showloading?(
            <ActivityIndicator size={'large'}/>
          ):null
        }
      </View>
      <Button title='Test' onPress={temptest} disabled={showloading} />
      <StatusBar style="auto" />
    </View>
    <SchoolSearch2 onDismiss={()=>{console.log('weg')}} btsref={bottomSheet} />
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
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