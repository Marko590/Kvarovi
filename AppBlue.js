import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Collapsible from 'react-native-collapsible';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable } from "@react-native-material/core";
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
const Tab = createBottomTabNavigator();
import CollapsibleTime from './CollapsibleTime';
import { Chip, Icon,Surface } from "@react-native-material/core";
var HTMLParser = require('fast-html-parser');
import StreetCard from './StreetCard';
import CollapsibleCard from './CollapsibleCard';
import ModalWrapper from './ModalWrapper';



const TimeButton= (props)=>{
  const [check, setCheck] = useState(true);
  
  return (
    <TouchableOpacity style={check?styles.timeButtonPressed:styles.timeButton} onPress={()=>{setCheck(prevCheck=>!prevCheck)}} >
            <Text style={check?styles.timeButtonTextPressed:styles.timeButtonText}>{props.time}</Text>
          </TouchableOpacity>)
}


const Kvarovi = () => {

  const [streets, setStreets] = useState({});

  const [data, setData] = useState({});
  const [check, setCheck] = useState(true);
  const getData = () => {
    axios
      .get("http://192.168.0.31:8081/vodovod/kvarovi")
      .then((response) => {
        console.log(response.data);
        setData(response.data.allData);
      });
  };



  return (
    <View>
      <LinearGradient colors={['#2337b0','#484fe8','#3f67cc', '#00C6FB']} style={{elevation:10 }}
      start={{ x: 0.85, y:0 }} locations={[0,0.1,0.45, 0.6]}>
        <LinearGradient colors={['#484fe8','#248bf2', '#00C6FB']} style={{ backgroundColor:'#4a84fe', height: 250, margin: 5, marginTop: 30, borderRadius: 5 ,borderWidth:1,borderColor:'gray',elevation:8}}
      start={{ x: 0.85, y:0 }} locations={[0.1,0.64,1]}>

          
        </LinearGradient>
        <LinearGradient colors={['#ffffff', '#b8b8b8']} style={[styles.buttonContainer]}
          start={{ x: 0, y: 0 }} locations={[0.5, 1]}>
          <TimeButton time='15:00'/>
          <TimeButton time='20:00'/>
          <TimeButton time='22:00'/>
        </LinearGradient>

        <View style={styles.cardHolder}>
          
          {data.map(a => {
            return (
              <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                {a.streets.map(neighbourhoodInfo => {
                  return (
                    <ScrollView contentContainerStyle={{ paddingLeft: 10, paddingRight: 10,marginTop:10,marginBottom:10 }} showsVerticalScrollIndicator={false} overScrollMode='never'>
                      
                        <CollapsibleCard neighbourhood={neighbourhoodInfo.neighbourhood}>
                            {neighbourhoodInfo.streetList.map(street => {
                              return (
                                <StreetCard style={neighbourhoodInfo.streetList.indexOf(street) == (neighbourhoodInfo.streetList.length - 1)
                                  ? styles.expandableCardLast
                                  : styles.expandableCard}
                                  street={street}
                                />)
                            })}
                        </CollapsibleCard>
                      
                      </ScrollView>
                    )
                })}
              </ScrollView>
            )
          })}
        </View>
        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
};


const Radovi = (props) => {

  return (
    <View style={styles.container}>
      <ScrollView style={{ alignSelf: 'stretch' }}>
        <Text></Text>
      </ScrollView>
    </View>
  );
};

function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, }}>
      <Tab.Screen name="Kvarovi" component={Kvarovi} />
      <Tab.Screen name="Radovi" component={Radovi} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Home} />
        <Stack.Screen name="Kvarovi" component={Kvarovi} />
        <Stack.Screen name="Radovi" component={Radovi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '10%',
  },
  gradient: {
    height: 1080,
    marginBottom: 0,
  },
  timeButtonText: {
    fontFamily: 'sans-serif-light',
    borderRadius: 120,
    backgroundColor: '#ffffff',
    height: '80%',
    color: 'blue',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 120
  },
  timeButton: {
    alignSelf: 'center',
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '90%',

  },
  timeButtonPressed:{
    alignSelf: 'center',
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '90%',
  },
  timeButtonTextPressed: {
    fontFamily: 'sans-serif-light',
    borderRadius: 120,
    backgroundColor: '#d6d6d6',
    height: '80%',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 120
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    height: 40,
    marginTop: 35,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  expandableCardLast: {
    backgroundColor: '#787777',
    borderRadius: 7,
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  expandableCard: {
    backgroundColor: '#787777',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  arrowIcon: {
    marginTop: 4,
    flex: 0,
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
  },
  cardHolder:{ 
  backgroundColor: '#ededed', 
  height: 300, 
  margin: 20, 
  marginTop: 20, 
  borderRadius: 5,
  borderWidth:1,
  borderColor:'gray',
  elevation:5 }
});
