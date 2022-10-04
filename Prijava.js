import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from "react";
import { StorageAccessFramework } from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import Background from './General/Background';
import * as FileSystem from 'expo-file-system';
import TopTab from './General/TopTab';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Prijava(props) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    function read() {
        StorageAccessFramework.createFileAsync('content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.marko590.kvarovi', 'text.txt');
        FileSystem.writeAsStringAsync('content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.marko590.kvarovi/ulice.txt', 'asdfghasd', {})
        
    }
    useEffect(() => {
        read()
    })


    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    return (
        <View>
            <Background style={styles.gradient}>

                <TopTab setDrawerCheck={props.setDrawerCheck} pageName={"Struja\nPlanirana isklučenja"} />
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <Text>Your expo push token: {expoPushToken}</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Title: {notification && notification.request.content.title} </Text>
                        <Text>Body: {notification && notification.request.content.body}</Text>
                        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                    <Button
                        title="Press to schedule a notification"
                        onPress={async () => {
                            await schedulePushNotification();
                        }}
                    />
                </View>
            </Background>
        </View>
    )

}
const styles = StyleSheet.create({
    gradient: {
        height: windowHeight + 85,
        backgroundColor: '#465461'
    },

    buttonContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        height: 40,
        marginTop: 35,
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,

    },
    arrowIcon: {
        marginTop: 4,
        flex: 0,
        height: 20,
        width: 20,
        alignSelf: 'flex-start',
    },
    cardHolder: {
        backgroundColor: '#f0e9e9',
        height: 310,
        margin: 15,
        marginTop: 0,
        marginLeft: 10,
        borderRadius: 20,
        width: 300,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        elevation: 15,
        padding: 10,
        paddingBottom: 0,
        marginBottom: 60

    },
    topTabIcons: {
        width: 30,
        height: 30
    },

    localCard: {
        height: 250,
        margin: 11,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        elevation: 50,
        shadowOpacity: '20%',
        alignContent: 'center',
        padding: 20,
        paddingRight: 15,
        paddingTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 100,
        },
        shadowOpacity: 0.51,
        shadowRadius: 0.16,
        flexDirection: 'column',
    },
    chosenTextSubTitle: {
        color: '#d9d9d9',
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'sans-serif-light'
    },
    chosenTextTitle: {
        color: '#d9d9d9',
        fontSize: 40,
        fontFamily: 'sans-serif-light',

    },
    expandableCardLast: {
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: 'white',
        borderRadius: 10,

        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    expandableCard: {
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
});