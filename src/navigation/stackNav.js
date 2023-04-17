import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/authScreen';
import * as React from 'react';
// import HomeScreen from '../screens/home'
// import  ChatListScreen from '../navigation/bottomTabNav';
// import  ChatRoomScreen from '../navigation/bottomTabNav';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

export default function MyStack() {
  console.log('vanten da');
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthScreen} />
      {/* <Stack.Screen name="SpendingsScreen" component={SpendingsScreen} /> */}
    </Stack.Navigator>
    </NavigationContainer>
  );
}