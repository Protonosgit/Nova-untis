import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Changes } from './components/ChangeList';
import { Notifications } from './components/NotificationList';


export default function HomeScreen( {navigation} ) {

  async function save() {
    await SecureStore.setItemAsync('user','false');
  }
  async function getKey() {
    let result = await SecureStore.getItemAsync('uname');
    if (result) {
      console.log(result);
    } else {
      console.log('err')
    }
  }

  function gotoSettings() {
    navigation.navigate('Settings');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.headding}>
          <Text style={styles.head1}>Good morning Kay Julius Donatus</Text>
          <Image style={styles.smallIcon} source={require('./assets/placeholder.jpeg')}/>
        </View>
        <Text style={styles.head2}>Today is Friday 13. of december</Text>
        <TouchableOpacity onPress={gotoSettings}><Image style={styles.smallIcon} source={require('./assets/placeholder.jpeg')}/></TouchableOpacity>
      </View>

      <View style={styles.body}>
        
      <View style={styles.eventpanel}>
        <Text style={styles.head3}>Timetable events</Text>
        <View style={styles.lister}>
          <Changes/>
        </View>
      </View>

      <View style={styles.notipanel}>
        <Text style={styles.head3}>Notifications</Text>
        <View style={styles.lister}>
          <Notifications/>
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
    fontSize: 25,
  },
  head2:{
    fontSize: 20,
  },
  head3: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  eventpanel:{
    flex: 2,
    padding: 10,
    width: '90%',
    margin: '5%',
    borderRadius: 20,
    backgroundColor: 'lightgray'
  },
    notipanel:{
    flex: 1,
    padding: 10,
    width: '90%',
    margin: '5%',
    borderRadius: 20,
    backgroundColor: 'lightgray'
  },
  lister: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
