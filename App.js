/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AuthScreen from './src/screens/authScreen';
import HomeScreen from './src/screens/homeScreen'
import RegisterScreen from './src/screens/registrationScreen'
import ChatListScreen from './src/screens/chatListScreen';
import ChatRoom from './src/screens/chatRoom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

function App() {
  // useEffect(()=>{
  //   firestore()
  //   .collection('users').where('email', '!=', a.email)
  //   .get().then((res) => {
  //       console.log(res,'hello');
  //       const data = res._docs.map((item) => {
  //           return { ...item._data, isSelected: false, id: item.id }
  //       })
  //       setUsers(data)
  //       // getCurrentUserId()
  //       // setRoomNames()
  //   })
  // })
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Auth" screenOptions={{headerShown:false}}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />

    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
