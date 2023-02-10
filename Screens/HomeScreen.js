import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Changes } from './components/ChangeList';
import { Notifications } from './components/NotificationList';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment'; 
import { refresh } from '@react-native-community/netinfo';
import * as untis from './components/UntisApi';
import * as database from './components/DatabaseHandler';
import { ContextStore } from './components/ContextStore';


export default function HomeScreen( {navigation} ) {

  const [Time,setTime] = useState('Today is Friday 13th');
  const [Greeting,setGreeting] = useState('Good day sir ')
  const [refreshing, setRefreshing] = useState(false);
  const {UntisSession,setUntisSession} = useContext(ContextStore);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime('Today is '+moment().format('dddd DD MMMM YYYY'));
      const hour = parseInt(moment().format('HH'));
      if (hour>=18){
        setGreeting('Good evening!')
      }else if (hour>=15){
        setGreeting('Good afternoon!')
      }else if (hour>=12){
        setGreeting('Good midday!')
      }else if (hour>=0){
        setGreeting('Good morning!')
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  async function fetchdata() {
    if (true) {
      setRefreshing(true)
      const uname = await getKey('ActiveUname');
      const upw = await getKey('ActivePass');
      untis.login(uname,upw).then(res => {
        const sess = res.result;
        setKey('UntisUser',JSON.stringify(res.result));
        setUntisSession(res.result);
        database.resetConfig().then(()=>{
          untis.initConfigChain(sess);
          setTimeout(() => {setRefreshing(false)}, 2000);
        });
      });
    } else {showToast('error','No Internet Connection')}
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.headding}>
          <Text style={{fontSize:25}}>{Greeting}</Text>
          <Image style={styles.smallIcon} source={require('./assets/placeholder.jpeg')}/>
        </View>
        <Text style={{fontSize:20, marginTop:8}}>{Time}</Text>
        <View style={styles.menubar}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}}><Image style={styles.smallIcon} source={require('./assets/placeholder.jpeg')}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('Timetable')}}><Image style={styles.smallIcon} source={require('./assets/placeholder.jpeg')}/></TouchableOpacity>
      </View>
      </View>
      <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={fetchdata} /> }>
      <View style={styles.body}>
      <View style={styles.frame}>
          <Changes/>
      </View>

      <View style={styles.frame}>
          <Notifications/>
      </View>

      <View style={styles.frame}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Information</Text>
        <View style={styles.part}><Text style={{fontSize:18}}>Server status:</Text><Text style={{color:'green',fontSize:16,fontWeight:'bold'}}>ONLINE</Text></View>
        <View style={styles.part}><Text style={{fontSize:18}}>Last update:</Text><Text style={{fontSize:16,fontWeight:'bold'}}>2 hours ago</Text></View>
        <View style={styles.part}><Text style={{fontSize:18}}>School role:</Text><Text style={{fontSize:16,fontWeight:'bold'}}>Student</Text></View>
      </View>
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  top: {
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 20,
  },
  headding: {
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  menubar: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  smallIcon: {
    width: 50,
    height: 50,
  },
  body: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
    frame:{
    width: '90%',
    padding: 8,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: 'lightgray'
  },
  part: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    padding:4,
    borderBottomWidth: 2,
  }
});
