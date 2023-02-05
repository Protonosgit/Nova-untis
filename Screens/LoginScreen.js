import { useState,useRef, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View,TextInput, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

import { SchoolSearch2 } from './components/dialogs/SchoolSearch';
import * as untis from './components/UntisApi';
import { ContextStore } from './components/ContextStore';
import * as database from './components/DatabaseHandler';


export default function LoginScreen( {navigation} ) {
  // Global state mangement
  const {Schoolname,setSchoolname} = useContext(ContextStore);
  const {SchoolInfo,setSchoolInfo} = useContext(ContextStore);
  const {ActiveUser,setActiveUser} = useContext(ContextStore);
  const {UntisSession,setUntisSession} = useContext(ContextStore);

  // setup states and vars
  const [usrname, setusrname] = useState('');
  const [usrpass, setusrpass] = useState('');
  const [school,setschool] = useState('');
  const [uerr,setuerr] = useState('');
  const [perr,setperr] = useState('');
  const [showbackbtn,setshowbackbtn] = useState(false);
  const [showloading,setshowloading] = useState(false);
  const bottomSheet = useRef(null);

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
      setKey('ActiveUname',usrname);
      setKey('ActivePass',usrpass);
    }
  }

  // check if can go back
  useEffect(()=> {
    database.getUserAccounts().then((res)=>{
      if (res.rows.length>0) {
        setshowbackbtn(true);
      } else {}
    })
  },[]);

  // Untis api login call
  async function login() {
    untis.initialLogin(usrname, usrpass, SchoolInfo.server, SchoolInfo.loginName).then((res)=>{
      const sess = res.result
      setshowloading(false);
      if (res.result){
        setUntisSession(res.result);
        database.add(SchoolInfo.address,SchoolInfo.displayName,SchoolInfo.loginName,SchoolInfo.schoolId,SchoolInfo.serverUrl,SchoolInfo.server,usrname,usrpass).then((res)=>{
          database.getUserAccounts().then((res)=>{
          setKey('ActiveUser',res.rows.length.toString())
          setActiveUser(res.rows.length.toString());
          database.resetConfig().then(()=>{
            untis.initConfigChain(sess);
            save('uname',usrname)
            showToast('success','You have been logged in 👋');
            setTimeout(()=>{navigation.replace('Home')},1000);
          })
        })
      })
      } else{ 
        showToast('error','Login failed 🛑'); 
      }});
  }
  
  // Untis api logout call (debug)
  async function callout() {
    untis.logout().then((res)=>{
      if (res.result===null){
        console.log('Logged out');
      } else{
        console.log('Error while logging out');
      }
    })
  }


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.titles}>School:</Text>
        <TouchableWithoutFeedback onPress={handleBottomSheet}><View style={styles.school}><Text style={styles.schooltxt}>{'• '+Schoolname}</Text></View></TouchableWithoutFeedback>
        <Text style={styles.titles}>User:</Text>
        <View style={styles.inputmask}><TextInput style={styles.userinput} error={uerr} underlineColorAndroid={uerr ? 'red' : 'transparent'} placeholder='Username' onChangeText={(txt)=>{setuerr('');setusrname(txt.trim().toLocaleLowerCase())}} /></View>
        <Text style={styles.titles}>Password:</Text>
        <View style={styles.inputmask}><TextInput style={styles.userinput} error={perr} underlineColorAndroid={perr ? 'red' : 'transparent'} secureTextEntry={true} placeholder='Password' onChangeText={(txt)=>{setperr('');setusrpass(txt);}} /></View>
        <TouchableOpacity style={styles.loginbtn} onPress={checkcreds}><Text style={styles.btnlabels}>Login</Text></TouchableOpacity>
        {
          showbackbtn?(
            <TouchableOpacity style={styles.cancelbtn} onPress={()=>{navigation.goBack()}} ><Text style={styles.btnlabels}>Cancel</Text></TouchableOpacity>
          ):null
        }
                {
          showloading?(
            <ActivityIndicator size={'large'}/>
          ):null
        }
      </View>
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
  },
  btnlabels: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cancelbtn: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  loginbtn: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

});