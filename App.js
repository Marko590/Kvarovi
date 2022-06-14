import { StatusBar } from 'expo-status-bar';
import {Animated, Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
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
import { ListItem } from "@react-native-material/core";
var HTMLParser = require('fast-html-parser');
import StreetCard from './StreetCard';
import CollapsibleCard from './CollapsibleCard';
import ModalWrapper from './ModalWrapper';
import SideMenu from 'react-native-side-menu';
import { Menu } from 'react-native-paper';

const TimeButton = (props) => {
  const [check, setCheck] = useState(true);
  const [myIndex, setMyIndex] = useState(0);

  return (

    <TouchableOpacity style={props.selectedIndex == props.index ? styles.timeButtonPressed : styles.timeButton} onPress={() => { setCheck(prevCheck => !prevCheck); props.setIndex(props.index) }} >
      <Text style={props.selectedIndex == props.index ? styles.timeButtonTextPressed : styles.timeButtonText}>{props.time.trim()}</Text>
    </TouchableOpacity>)
}


const Kvarovi = (props) => {

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
      <LinearGradient colors={['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']} style={{ elevation: 10 }}
        start={{ x: 0.75, y: 0.35 }} locations={[0, 0.1, 0.3, 0.45, 0.75]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
          <TouchableOpacity onPress={() => { props.setCheck(prevCheck => !prevCheck) }}>
            <Image
              style={[styles.topTabIcons, { marginLeft: 15, width: 25, height: 25, marginTop: 3 }]}
              source={require('./assets/hamburger.png')} />
          </TouchableOpacity>


          <Image style={[styles.topTabIcons, { marginRight: 15 }]} source={require('./assets/about.png')} on />
        </View>
        <LinearGradient colors={['#FEA280', '#e79ca5', '#c391e1', '#b18cff']} style={{
          height: 251, margin: 5, marginTop: 10, marginBottom: 20, borderRadius: 20, borderWidth: 1, borderColor: 'gray', elevation: 50, shadowOpacity: '20%', justifyContent: 'space-around', padding: 15, paddingTop: 0, shadowColor: "#000", shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.51,
          shadowRadius: 0.16,

        }}
          start={{ x: 0.7, y: 0 }} locations={[0, 0.2, 0.6, 0.85]}>
          <Text style={{ color: 'white', fontSize: 50,fontFamily:'monospace' }}>Stari Grad</Text>
          <View>
            <Text style={{ color: 'white', fontSize: 30, marginBottom: 30, fontFamily: 'sans-serif-light' }}>Broj kvarova u Vašem naselju:{selectedIndex}</Text>
          </View>
        </LinearGradient>
        <View style={styles.buttonContainer}>


          {data.map((a, index) => {
            return (
              <TimeButton time={a.time} setIndex={setIndex} index={index} selectedIndex={selectedIndex} />
            )
          })}

        </View>

        <LinearGradient colors={['#ffffff', '#cccccc']} style={[styles.cardHolder]}
          start={{ x: 0, y: 0 }} locations={[0.7, 1]}>



          <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' >
            {data.at(selectedIndex).streets.map(neighbourhoodInfo => {
              return (
                <ScrollView contentContainerStyle={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10 }} showsVerticalScrollIndicator={false} overScrollMode='never'>

                  <CollapsibleCard neighbourhood={neighbourhoodInfo.neighbourhood}>
                    {neighbourhoodInfo.streetList.map(street => {
                      return (
                        <StreetCard style={neighbourhoodInfo.streetList.indexOf(street) == (neighbourhoodInfo.streetList.length - 1)
                          ? styles.expandableCardLast
                          : styles.expandableCard}
                          street={street}/>

                        )
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
      <LinearGradient colors={['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']} style={styles.gradient}
        start={{ x: 0.75, y: 0.35 }} locations={[0, 0.1, 0.3, 0.45, 0.75]}>
          <TouchableOpacity onPress={() => { props.setCheck(prevCheck => !prevCheck) }}>
            <Image
              style={[styles.topTabIcons, { marginLeft: 15, width: 25, height: 25, marginTop: 3 }]}
              source={require('./assets/hamburger.png')} />
          </TouchableOpacity>

          </LinearGradient>
    
    </View>
  );
};



export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        
        <Stack.Screen name="Kvarovi" component={KvaroviDrawer} />
        <Stack.Screen name="Radovi" component={RadoviDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const KvaroviDrawer=(props)=>{
  const navigation=useNavigation();
  const menu = <SideBar />;
  const [check, setCheck] = useState(false);
  const [isOpen, setOpen] = useState('closed');
  return(


    <SideMenu isOpen={check} menu={menu} animationFunction={(prop, value) =>
      Animated.spring(prop, {
        toValue: value,
        friction: 8,
        useNativeDriver: true,
      })
    } >
      <TouchableOpacity onPress={() => { setCheck(false) }} activeOpacity={1}>
        <Kvarovi setCheck={setCheck} />
      </TouchableOpacity>
    </SideMenu>
  )


}

const RadoviDrawer=(props)=>{
  const navigation=useNavigation();
  const menu = <SideBar />;
  const [check, setCheck] = useState(false);
  const [isOpen, setOpen] = useState('closed');
  return(


    <SideMenu isOpen={check} menu={menu} animationFunction={(prop, value) =>
      Animated.spring(prop, {
        toValue: value,
        friction: 8,
        useNativeDriver: true,
      })
    } >
      <TouchableOpacity onPress={() => { setCheck(false) }} activeOpacity={1}>
        <Radovi setCheck={setCheck}/>
      </TouchableOpacity>
    </SideMenu>
  )


}
const SideBar = (props) => {
  const navigation=useNavigation();
  return (
    <View>
    <LinearGradient colors={['#ffffff', '#dcdcdc']} style={{borderRadius:10}}
          start={{ x: 0, y: 0 }} locations={[0.82, 1]}>
      <View style={{ paddingTop: 150 }}>
        <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Vodovod</Text>

        </View>
        <TouchableOpacity>
          <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'black' , borderRadius: 15 }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Kvarovi</Text>
            <LinearGradient colors={['#A47AFD', '#FEA280']} style={{ marginRight: 20, borderRadius: 20 }}
              start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('./assets/chevron-right.png')} />
            </LinearGradient>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'black', borderRadius: 15 }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Radovi</Text>
            <LinearGradient colors={['#A47AFD', '#FEA280']} style={{ marginRight: 20, borderRadius: 20 }}
              start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('./assets/chevron-right.png')} />
            </LinearGradient>
          </View>
        </TouchableOpacity>

      </View>
      </LinearGradient>
      <LinearGradient colors={['#ffffff', '#dcdcdc']} style={{borderRadius:10}}
          start={{ x: 0, y: 0 }} locations={[0.4, 1]}>
        <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Struja</Text>

        </View>
        <TouchableOpacity onPress={()=>{ navigation.navigate('Kvarovi', { name: 'Jane' })}}>
          <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'black', borderRadius: 15 }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Kvarovi</Text>
            <LinearGradient colors={['#A47AFD', '#FEA280']} style={{ marginRight: 20, borderRadius: 20 }}
              start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('./assets/chevron-right.png')} />
            </LinearGradient>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{ navigation.navigate('Radovi', { name: 'Jane' })}}>
          <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'black', borderRadius: 15 }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Radovi</Text>
            <LinearGradient colors={['#A47AFD', '#FEA280']} style={{ marginRight: 20, borderRadius: 30 }}
              start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('./assets/chevron-right.png')} />
            </LinearGradient>
          </View>
        </TouchableOpacity>

      </LinearGradient>

    
    </View>

  )
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
    borderRadius: 120,
    elevation: 20
  },
  timeButton: {
    alignSelf: 'center',
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '90%',
    elevation: 10
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
    borderRadius: 120,
    elevation: 20
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
    height: 350,
    margin: 20,
    marginTop: 20,
    borderRadius: 20,
    width: 320,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 5,
    marginBottom: 20
  },
  topTabIcons: {
    width: 30,
    height: 30


  }
});
