import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';


export default function TimetableScreen( {navigation} ) {


  return (
    <View style={styles.container}>
      <Image source={require('./assets/untis.png')} />
      <Text style={styles.headding}>Nova Untis</Text>
      <StatusBar style='auto' />
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