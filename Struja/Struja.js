import { StatusBar } from 'expo-status-bar';
import { Dimensions, Animated, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import 'react-native-gesture-handler';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Background from '../General/Background';
import TopTab from '../General/TopTab';
import AlertLabel from '../General/AlertLabel';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ElectricalStreetCard from './ElectricalStreetCard'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Radovi(props) {

    const navigation = useNavigation();

    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }

    const [alerts, setAlerts] = useState(1);
    const [data, setData] = useState({});
    const getData = () => {
        axios
            .get("https://aplikacijaserver.azurewebsites.net/struja/radovi")
            .then((response) => {
                
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
  



    const [isLoading,setLoading]=useState(true);

    function aggregateAlerts(){
        setAlerts(0)
        data.find
        &&data.find(element => element.neighbourhood == chosen)
        &&data.find(element => element.neighbourhood == chosen).interval.map(item => {
                    setAlerts(prevState => (prevState + item.streets.length))        
            })
    }
    useLayoutEffect(()=>{
       aggregateAlerts()
    })
    //Fetching local and data from rest,sets loading, and calculates
    useEffect(() => {
        getData();
        readData();
        setLoading(false);
        setChosenCurrent(chosen)
        

    }, []);
    const nightColors=['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
	
	const dayColors=['#3769B9', '#527aa7', '#6d8c94', '#889d82', '#a3ae6f']


    //Chosen area for the local card
    const [chosen, setChosen] = useState("");


    //Chosen area for the picker component
    const [chosenCurrent, setChosenCurrent] = useState("");


    //Scale animation setup
    const [fadeAnim] = useState(new Animated.Value(0.5));
    useEffect(() => {
		Animated.timing(fadeAnim, {
			useNativeDriver:true,
		  toValue: 1,
		  duration: 1500,
          
		}).start();
	  }, []);
     
     
    return (
        <Background style={styles.gradient}>

            <TopTab setDrawerCheck={props.setDrawerCheck} pageName={"Struja\nPlanirana isklučenja"} />

            <LinearGradient
                colors={dayColors}
                style={styles.localCard}
                start={{ x: 0.5, y: 0 }}
                locations={[0, 0.25, 0.5, 0.75, 1]}>
                <View style={{ flex: 1.7, flexDirection: 'row' }}>


                    <Text
                        style={[styles.chosenTextTitle, { flex: 3.5, right: '2.5%' }]}>
                        {chosen}
                    </Text>

                    {/* Label showing the number of malfunctions in the selected area*/}
                   <AlertLabel alerts={alerts} icon={'traffic-cone'}/>

                </View>
                { /*
    :[
        neighbourhood::string,
        interval:
                [
                    time:string,
                    streets:[] 
                ]
            }    
    ]
     
    */}
                {/* Subtitle containing the streets affected by repairs */}
                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                    <Text style={[styles.chosenTextSubTitle]}>
                        {!isLoading?
                        <Animated.View style={{ flex: 2,transform: [{ scale:fadeAnim }] }}>
                            <Text style={styles.chosenTextSubTitle}>

                               {data.find
                               &&data.find(element=>element.neighbourhood==chosen)
                               &&data.find(element=>element.neighbourhood==chosen).interval.find(item=>item).streets.length
                               ?'Одаберите Ваше насеље у '+'\n'+ 'листи испод.'
                               :'Тренутно нема радова у вашем'+'\n'+' насељу.'}

                            </Text>

                        </Animated.View>:<ActivityIndicator size={150}/>}
                    </Text>
                </View>

            </LinearGradient>

            <LinearGradient colors={['#a8a8a8', 'transparent', 'transparent', '#a8a8a8']} style={{ elevation: 20, width: '50%', alignSelf: 'center', backgroundColor: '#fafafa', borderRadius: 10 }}
                start={{ x: 0, y: 0 }} locations={[0, 0.1, 0.9, 1]}>
               
                <Picker
                    selectedValue={chosenCurrent}
                    onValueChange={(itemValue, itemIndex) => {
                        setChosenCurrent(itemValue);}}>
                            
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
            <StatusBar style="light" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{ padding: 35,paddingTop:0,paddingBottom:90, justifyContent: 'center', alignItems: 'center' }}>

                {data.find && data.find(element => element.neighbourhood == chosenCurrent) ? data.find(element => element.neighbourhood == chosenCurrent).interval.map(item => {
                    return (
                        <Animated.View style={{opacity:fadeAnim}}>
                        <LinearGradient
                            colors={dayColors}
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
                        </Animated.View>
                    )
                }) : 
                <Animated.View style={{opacity:fadeAnim}}>
                <LinearGradient
                    colors={dayColors}
                    style={styles.cardHolder}
                    start={{ x: 0.5, y: 0 }}
                    locations={[0, 0.25, 0.5, 0.75, 1]}>
                    <View>
                        <Text style={{ color: '#d9d9d9', fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif-light' }}>Нема података за ово насеље.</Text>
                    </View>

                </LinearGradient>
                </Animated.View>}
            </ScrollView>



        </Background>
    )
}
const styles = StyleSheet.create({
    gradient: {
        height: windowHeight+150,
        
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
        height:310,
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
        marginBottom:60

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