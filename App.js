import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SettingsScreen from './Screens/SettingsScreen';
import TimetableScreen from './Screens/TimetableScreen';
import Toast from 'react-native-toast-message';
import { ContextStore, StoreProvider } from './Screens/components/ContextStore';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        options={{headerShown: false}}
        name='Splash'
        component={SplashScreen}
        />
        <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{headerShown: false}}
         />
        <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{headerShown: false}}
         />
        <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{headerShown: false}}
         />
        <Stack.Screen
        options={{headerShown: false}}
        name='Timetable'
        component={TimetableScreen}
        />
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

console.log('Active development do not share!');

//Do not share until release!

//Propperty of Team BlackNeutron [https://blackneutron.ml] 

//This Pre-Release was made by Protonos [https://protonos.ml]

//Networking written by Galyx