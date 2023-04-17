import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { style } from '../constants/constants'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function ChatListScreen({ navigation, route }) {
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState('')
  const currentuser = auth().currentUser;

  useEffect(async () => {
    setUser(currentuser._user)
    firestore().collection('users').get().then((res) => { console.log('users', res); })
  }, [])

  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(route.params.roomID)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  async function handleSend(messages) {
    const text = messages[0].text;
    firestore()
      .collection('THREADS')
      .doc(route.params.roomID)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          email: user.email
        }
      });
    await firestore()
      .collection('THREADS')
      .doc(route.params.roomID)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
  }

  return (
    <View style={{ backgroundColor: style.BACKGROUNDCOLOR, flex: 1 }}>
      <Header isBackArrowVisible={true} isMenuVisible={false} onPressBackArrow={() => navigation.goBack()} isLogoImageVisible={false} title={route.params.chatName} />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{ _id: user.uid }}
          renderBubble={(props) => {
            return (<Bubble {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: '#d8dee8',
                },
                right: { backgroundColor: style.THEMECOLOR }
              }} />)
          }}
          renderSend={(props) => {
            return (
              <View style={{ marginRight: 15, paddingBottom: 15 }}>

                <Send {...props}>
                  <Icon name="paper-plane" size={25} color={style.THEMECOLOR} />
                </Send>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})