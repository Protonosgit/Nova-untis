import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import WeekView from 'react-native-week-view';


export default function TimetableScreen( {navigation} ) {

  const myEvents = [
    {
      id: 1,
      description: 'Test1',
      startDate: new Date(2023, 2, 9, 8, 0),
      endDate: new Date(2023, 2, 9, 9, 30),
      color: 'red',
    },
    {
      id: 2,
      description: 'Test2',
      startDate: new Date(2023, 2, 9, 9, 15),
      endDate: new Date(2023, 2, 9, 11, 15),
      color: 'green',
    },
  ];
  return (
    <View style={styles.container}>
      <WeekView
        events={myEvents}
        selectedDate={new Date(2023, 2, 9)}
        numberOfDays={5}
        eventContainerStyle={styles.eventContainer}
        onEventPress={(event)=>{console.log('Event id: '+event.id)}}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headding: {
    color: 'black',
    fontSize: 40,
  },
  eventContainer: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});