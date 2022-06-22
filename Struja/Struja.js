import { StatusBar } from 'expo-status-bar';
import { Dimensions, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Background from '../General/Background';
import RenderHTML from 'react-native-render-html';
import WorkCard from '../Radovi/WorkCard';
import TopTab from '../General/TopTab';

import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ElectricalStreetCard from './ElectricalStreetCard'

export default function Radovi(props) {

    const navigation = useNavigation();

    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }

    const [alerts, setAlerts] = useState(1);
    const [data, setData] = useState({});
    const getData = () => {
        axios
            .get("http://192.168.0.31:8081/struja/radovi")
            .then((response) => {
                console.log(response.data);
                const array = [];
                setData(response.data.allData);


            });
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            setChosen(value);
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        getData();
        readData();
        setChosenCurrent(chosen)
        setAlerts(0)
        data.find&& data.find(element => element.neighbourhood == chosen)
            && data.find(element => element.neighbourhood == chosen).interval.map(item => {
                return (
                    setAlerts(prevState => (prevState + item.streets.length))
                )
            })

    }, []);

    const nightColors = ['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
    const dayColors = ['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']


    /*
    :[
        neighbourhood::string,
        interval:
                [
                    time:string,
                    streets:[] 
                ]
            }    
    ]
    
    
    */
    const array = [1, 2, 3]

    const [chosen, setChosen] = useState("");
    const [chosenCurrent, setChosenCurrent] = useState("");
    return (
        <Background style={styles.gradient}>

            <TopTab setDrawerCheck={props.setDrawerCheck} pageName={"Struja\nPlanirana isklučenja"} />

            <LinearGradient
                colors={nightColors}
                style={styles.localCard}
                start={{ x: 0.5, y: 0 }}
                locations={[0, 0.25, 0.5, 0.75, 1]}>
                <View style={{ flex: 1.5, flexDirection: 'row' }}>


                    <Text
                        style={[styles.chosenTextTitle, { flex: 3.5, right: '2.5%' }]}>
                        {chosen}
                    </Text>

                    {/* Label showing the number of malfunctions in the selected area*/}
                    <LinearGradient
                        colors={['#B3292B', '#bd3b2c', '#d2602f', '#DF7630']}
                        start={{ x: 0, y: -0.2 }}
                        locations={[0, 0.2, 0.65, 0.85]}
                        style={{ borderRadius: 10, height: 45, alignSelf: 'flex-start', justifyContent: 'center', flex: 1, marginTop: 5 }}>
                        <Button
                            labelStyle={{ fontSize: 20, flexDirection: 'row', bottom: '10%', right: '10%' }}
                            color='white'
                            icon="traffic-cone"
                            style={{ borderRadius: 30 }}
                            mode="text">
                            <Text style={{ fontSize: 25 }}>

                                {alerts}
                            </Text>
                        </Button>

                    </LinearGradient>

                </View>

                {/* Subtitle containing the streets affected by repairs */}
                <View style={{ flex: 1.8, justifyContent: 'flex-start' }}>
                    <Text style={[styles.chosenTextSubTitle]}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.chosenTextSubTitle}>

                                Улице у којима се налазе радови:

                            </Text>

                        </View>
                    </Text>
                </View>

            </LinearGradient>

            <LinearGradient colors={['#a8a8a8', '#ffffff', '#ffffff', '#a8a8a8']} style={{ elevation: 20, width: '50%', alignSelf: 'center', backgroundColor: '#fafafa', borderRadius: 10, marginBottom: 30 }}
                start={{ x: 0, y: 0 }} locations={[0, 0.1, 0.9, 1]}>

                <Picker
                
                    selectedValue={chosenCurrent}
                    onValueChange={(itemValue, itemIndex) => {
                        setChosenCurrent(itemValue);

                    }}
                >
                    <Picker.Item label="Стари Град" value="Стари град" />
                    <Picker.Item label="Савски Венац" value="Савски венац" />
                    <Picker.Item label="Палилула" value="Палилула" />
                    <Picker.Item label="Звездара" value="Звездара" />
                    <Picker.Item label="Вождовац" value="Вождовац" />
                    <Picker.Item label="Чукарица" value="Чукарица" />
                    <Picker.Item label="Раковица" value="Раковица" />
                    <Picker.Item label="Нови Београд" value="Нови Београд" />
                    <Picker.Item label="Земун" value="Земун" />
                    <Picker.Item label="Гроцка" value="Гроцка" />
                    <Picker.Item label="Барајево" value="Барајево" />
                    <Picker.Item label="Сурчин" value="Сурчин" />
                </Picker>
            </LinearGradient>
            <StatusBar style="auto" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{ padding: 35, justifyContent: 'center', alignItems: 'center' }}>

                {data.find && data.find(element => element.neighbourhood == chosenCurrent) ? data.find(element => element.neighbourhood == chosenCurrent).interval.map(item => {
                    return (

                        <LinearGradient
                            colors={nightColors}
                            style={styles.cardHolder}
                            start={{ x: 0.5, y: 0 }}
                            locations={[0, 0.25, 0.5, 0.75, 1]}>
                            <View style={{ borderBottomWidth: 0.5, borderRadius: 15, borderColor: '#d9d9d9' }}>
                                <Text style={{ color: '#d9d9d9', fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif-light' }}>{item.time}</Text>
                            </View>
                            <ScrollView contentContainerStyle={{ marginTop: 10 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                                {item.streets.map(street => {
                                    return (
                                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                                            <ElectricalStreetCard
                                                style={item.streets.indexOf(street) == (item.streets.length - 1)
                                                    ? styles.expandableCardLast
                                                    : styles.expandableCard}
                                                street={street.trim()}
                                                electrical={true} />
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </LinearGradient>
                    )
                }) : <LinearGradient
                    colors={nightColors}
                    style={styles.cardHolder}
                    start={{ x: 0.5, y: 0 }}
                    locations={[0, 0.25, 0.5, 0.75, 1]}>
                    <View>
                        <Text style={{ color: '#d9d9d9', fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif-light' }}>Нема података за ово насеље.</Text>
                    </View>

                </LinearGradient>}
            </ScrollView>



        </Background>
    )
}
const styles = StyleSheet.create({
    gradient: {
        height: '100%',
        
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
        height: 320,
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
        marginBottom: 20,

    },
    topTabIcons: {
        width: 30,
        height: 30
    },

    localCard: {
        height: '30%',
        margin: 5,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 40,
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
