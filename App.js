import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Collapsible from 'react-native-collapsible';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable, select } from "@react-native-material/core";
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
const Tab = createBottomTabNavigator();
import CollapsibleTime from './CollapsibleTime';
import { Chip, Icon, Surface } from "@react-native-material/core";
var HTMLParser = require('fast-html-parser');
import StreetCard from './StreetCard';
import CollapsibleCard from './CollapsibleCard';
import ModalWrapper from './ModalWrapper';



const TimeButton = (props) => {
  const [check, setCheck] = useState(true);
  const [myIndex, setMyIndex] = useState(0);

  return (

    <TouchableOpacity style={props.selectedIndex == props.index ? styles.timeButtonPressed : styles.timeButton} onPress={() => { setCheck(prevCheck => !prevCheck); props.setIndex(props.index) }} >
      <Text style={props.selectedIndex == props.index ? styles.timeButtonTextPressed : styles.timeButtonText}>{props.time.trim().split(' ').at(1)}</Text>
    </TouchableOpacity>)
}


const Kvarovi = () => {

  const [streets, setStreets] = useState({});
  const [selectedIndex, setIndex] = useState(0);
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
      <LinearGradient colors={['#A47AFD', '#b07fec', '#ea999c', '#FEA280']} style={{ elevation: 10 }}
        start={{ x: 0.85, y: 0 }} locations={[0, 0.1, 0.45, 0.6]}>
        <LinearGradient colors={['#A47AFD', '#d28ebd', '#FEA280']} style={{ height: 255, margin: 5, marginTop: 90, marginBottom: 20, borderRadius: 20, borderWidth: 1, borderColor: 'gray', elevation: 20, justifyContent: 'space-evenly', padding: 15, paddingTop: 0 }}
          start={{ x: 0.85, y: 0 }} locations={[0.05, 0.4, 0.8]}>
          <Text style={{ color: 'white', fontSize: 50 }}>Stari Grad</Text>
          <Text style={{ color: 'white', fontSize: 30, marginBottom: 30, fontFamily: 'sans-serif-light' }}>Broj kvarova u Vašem naselju:{selectedIndex}</Text>
        </LinearGradient>
        <LinearGradient colors={['#ffffff', '#b8b8b8']} style={[styles.buttonContainer]}
          start={{ x: 0, y: 0 }} locations={[0.5, 1]}>


          {data.map((a, index) => {
            return (
              <TimeButton time={a.time} setIndex={setIndex} index={index} selectedIndex={selectedIndex} />
            )
          })}

        </LinearGradient>

        <LinearGradient colors={['#ffffff', '#b8b8b8']} style={[styles.cardHolder]}
          start={{ x: 0, y: 0 }} locations={[0.7, 1]}>

          
            
              <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
                {data.at(selectedIndex).streets.map(neighbourhoodInfo => {
                  return (
                    <ScrollView contentContainerStyle={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10 }} showsVerticalScrollIndicator={false} overScrollMode='never'>

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
            
          

        </LinearGradient>
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
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#9ea4ad' }, }}>
      <Tab.Screen name="Kvarovi" component={Kvarovi} />
      <Tab.Screen name="Radovi" component={Radovi} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
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
    color: 'black',
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
  timeButtonPressed: {
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
    backgroundColor: '#8c8b8b',
    height: '80%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 120
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 40,
    marginTop: 35,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    elevation: 10
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
  cardHolder: {
    backgroundColor: '#f0e9e9',
    height: 300,
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    width: 320,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 5
  }
});
