import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Collapsible from 'react-native-collapsible';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable } from "@react-native-material/core";
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LinearGradient} from 'expo-linear-gradient';
const Tab = createBottomTabNavigator();
import CollapsibleTime from './CollapsibleTime';
import StreetCard from './StreetCard';
import CollapsibleCard from './CollapsibleCard';
var HTMLParser = require('fast-html-parser');

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
    <View style={styles.container} >



      <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }} >
      
        
        {data.map(a => {
          return (<View>
            <CollapsibleTime text={a.time}>
              <View style={{  shadowOffset: 20, shadowOpacity: 20, }}>

                {a.streets.map(neighbourhoodInfo => {
                  return (
                    <View style={{ marginTop: 20 }}>
                      <CollapsibleCard neighbourhood={neighbourhoodInfo.neighbourhood}>
                        <View>

                          {neighbourhoodInfo.streetList.map(street => {
                            return (
                              <StreetCard style={neighbourhoodInfo.streetList.indexOf(street) == (neighbourhoodInfo.streetList.length - 1)
                                ? styles.expandableCardLast
                                : styles.expandableCard}
                                street={street}
                              />
                            )
                          })}
                        </View>
                      </CollapsibleCard>
                    </View>
                  )
                })}
              </View>
            </CollapsibleTime>
          </View>
          )
        })}
        <StatusBar style="auto" />
      </ScrollView>
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
    flex: 1,
    
    justifyContent: 'space-between',

  },
  gradient:{
    
    
    
    borderRadius: 7,
    marginRight:15,
    marginLeft:15,
    marginBottom: 0,
  },
  expandableCardLast: {
    backgroundColor: '#787777',
    borderRadius: 7,
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 0,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  expandableCard: {
    backgroundColor: '#787777',
    justifyContent: 'center',
    flex: 0,
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  neighbourhoodText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'sans-serif-light',
  },

  neighbourhoodTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3b3b3',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 0,
    marginRight:5,
    marginLeft:5
  },
  neighbourhoodTitlePressed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d6d6d6',
    justifyContent: 'space-between',
    borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft:5,
    marginRight:5
  },
  arrowIcon: {
    marginTop: 4,
    flex: 0,
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
    
  },
  timeTitle: {
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: '#ffa270',
    padding: 0,
    borderRadius: 10,
    alignItems: "center",
  },
  timeTitleRipple: {
    borderRadius: 10,
    
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15
  }


});
