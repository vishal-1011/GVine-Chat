import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import Header from '../components/header'
import { style } from '../constants/constants'
import Message from '../asset/svg/message'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import auth from '@react-native-firebase/auth';
import moment from 'moment';


export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [users, setUsers] = useState([])
    const [currentUser, setcurrentUser] = useState({});
    const [roomNames, setRoomNames] = useState(true); //loader
    const [roomList, setRoomList] = useState([])
    const a = auth().currentUser


    useEffect(() => {
        firestore()
            .collection('users').where('email', '!=', a.email)
            .get().then((res) => {
                const data = res._docs.map((item) => {
                    return { ...item._data, isSelected: false, id: item.id }
                })
                setUsers(data)
                getCurrentUserId()
                // setRoomNames()
            })
    }, [])

    const getCurrentUserId = async () => {
        firestore().collection('users').where('email', '==', a.email).get().then((res) => {
            firestore().collection('THREADS').where('participants', 'array-contains-any', [a.email]).get()
                .then((res2) => {
                    setcurrentUser(res._docs[0]._data)
                    setRoomList(res2._docs)
                    setRoomNames(false)
                })

            return res
        })

    }

    const rooms = () => {
        firestore().collection('THREADS').where('participants', 'array-contains-any', [a.email]).get()
            .then((res) => {
                return res._docs
            })
    }

    const ChatListScreen = () => {
        if (!roomNames) {
            return roomList.map((item, indes) => {
                let chatName = item._data.participants.filter((item) => item !== a.email)
                let latestChatTime = moment(item._data.latestMessage.createdAt).format('LT');
                return (
                    <TouchableOpacity
                        style={styles.chatlistCard}
                        key={indes}
                        onPress={() => {
                            navigation.navigate('ChatListScreen', {
                                chatName: chatName[0],
                                roomID: item.id,
                                currentUser,
                            })
                        }}
                    >
                        <View style={styles.avatar}>
                            <Icon name="rocket" size={25} color={style.THEMECOLOR} />
                        </View> 
                        <View style={{ justifyContent: 'flex-start', flex: 3 }}>
                            <Text style={{ color: 'white' }}>{chatName[0]}</Text>
                            <Text style={{ color: 'white' }}>{item._data.latestMessage.text || 'Tap to chat'}</Text>
                        </View>
                        {item._data.latestMessage.text !== '' ?
                            <Text style={{ color: 'white', fontSize: 12 }}>{latestChatTime}</Text>
                            : null}


                    </TouchableOpacity>)
            })

        } else {
            return <ActivityIndicator size="large" color={style.THEMECOLOR} />


        }
    }

    return (
        <ScrollView style={{ backgroundColor: style.BACKGROUNDCOLOR, flex: 4 }} contentContainerStyle={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <ScrollView style={{marginTop:22}} contentContainerStyle={styles.centeredView}>
                    <View style={styles.modalView} >
                        <Text style={styles.modalText}>Friends List</Text>
                        {users.map((item, index) => {

                            return <View style={styles.checkboxContainer}>


                                <TouchableOpacity
                                    style={{ flexDirection: 'row' }}
                                    onPress={() => {
                                        firestore()
                                            .collection('THREADS')
                                            .doc(a.email.concat('x', item.email)).get()
                                            .then((res) => {
                                                if (res._exists) {

                                                    navigation.navigate('ChatListScreen', {
                                                        chatName: item.email,
                                                        roomID: a.email.concat('x', item.email),
                                                        currentUser,
                                                    })
                                                } else {
                                                    firestore()
                                                    .collection('THREADS')
                                                    .doc(item.email.concat('x', a.email)).get()
                                                    .then((res2) => {
                                                        if (res2._exists) {
        
                                                            navigation.navigate('ChatListScreen', {
                                                                chatName: item.email,
                                                                roomID: item.email.concat('x', a.email),
                                                                currentUser,
                                                            })
                                                        } else {
                                                            firestore()
                                                                .collection('THREADS')
                                                                .doc(a.email.concat('x', item.email)).set({
                                                                    latestMessage: {
                                                                        text: '',
                                                                        createdAt: new Date().getTime()
                                                                    },
                                                                    participants: [a.email, item.email]
                                                                })
                                                        }})
                                                }
                                            })
                                        getCurrentUserId()
                                        setModalVisible(!modalVisible)
                                    }}>
                                    <View style={styles.avatar2}>
                                        <Icon name="rocket" size={25} color={style.THEMECOLOR} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={styles.label}>{item.email}</Text>
                                        <Text style={styles.label}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        })}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={async () => {

                                setModalVisible(!modalVisible)
                            }}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
            <Header isBackArrowVisible={false} isMenuVisible={true} isLogoImageVisible={true} />
            <View>
                {ChatListScreen()}

            </View>
            <TouchableOpacity
                style={{
                    height: 70, width: 70, backgroundColor: style.THEMECOLOR, borderRadius: 35, justifyContent: 'center', alignItems: 'center', margin: 20, position: 'absolute', right: 20,
                    bottom: 20,
                }}
                onPress={() => setModalVisible(true)}                   >
                <Message />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#d8dee8'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        // backgroundColor: style.BUTTONCOLOR,
    },
    buttonOpen: {
        // backgroundColor: style.BUTTONCOLOR,
    },
    buttonClose: {
        // backgroundColor: style.BUTTONCOLOR,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 200,
        paddingHorizontal: 15,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        marginTop: 1,
        color: 'black'
    },
    chatlistCard: {
        height: 60,
        with: 200,
        backgroundColor: '#1e1e1e',
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderRadius: 20,
        marginHorizontal: 15,
        marginTop: 15,
        padding: 10

    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar2: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})