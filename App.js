import { StatusBar } from 'expo-status-bar';
import { Animated, Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Collapsible from 'react-native-collapsible';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useLayoutEffect } from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import  TimeButton from './TimeButton';


const Kvarovi = (props) => {




  const [chosen, setChosen] = useState("");
  const [selectedIndex, setIndex] = useState(0);
  const [data, setData] = useState({});
 
  const getData = () => {
    axios
      .get("http://192.168.0.31:8081/vodovod/kvarovi")
      .then((response) => {
        console.log(response.data);
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



  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    getData();
    readData();
  }, []);
  const asdf = [1, 2, 3, 4]

  return (
    <View>
      <LinearGradient colors={['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']} style={{ elevation: 10,justifyContent:'center',padding:10}}
        start={{ x: 0.75, y: 0.35 }} locations={[0, 0.1, 0.3, 0.45, 0.75]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
          <TouchableOpacity onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }}>
            <Image
              style={[styles.topTabIcons, {  width: 25, height: 25 }]}
              source={require('./assets/hamburger.png')} />
          </TouchableOpacity>


          <Image style={[styles.topTabIcons, { }]} source={require('./assets/about.png')} on />
        </View>
        <LinearGradient colors={['#FEA280', '#e79ca5', '#c391e1', '#b18cff']} style={styles.localCard}
          start={{ x: 0.7, y: 0 }} locations={[0, 0.2, 0.6, 0.85]}>
          <Text style={{ color: 'white', fontSize: 50, fontFamily: 'monospace' }}>{chosen}</Text>
          <View>
            <Text style={{ color: 'white', fontSize: 30, marginBottom: 30, fontFamily: 'sans-serif-light' }}>
              Broj kvarova u Vašem naselju:{
                data.at &&
                data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen).streetList.length
              }
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          {data.map && data.map((a, index) => {
            return (
              <TimeButton time={a.time} setIndex={setIndex} index={index} selectedIndex={selectedIndex} isAlone={data.length==1?true:false} />
            )
          })
          }
        </View>

        <LinearGradient colors={['#ffffff', '#cccccc']} style={[styles.cardHolder]}
          start={{ x: 0, y: 0 }} locations={[0.7, 1]}>

          <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' >
            {data.at && data.at(selectedIndex).streets.map(neighbourhoodInfo => {
              return (
                <ScrollView
                  contentContainerStyle={{ padding:15}}
                  showsVerticalScrollIndicator={false}
                  overScrollMode='never'>
                  <CollapsibleCard neighbourhood={neighbourhoodInfo.neighbourhood}>
                    {neighbourhoodInfo.streetList.map(street => {
                      return (
                        <StreetCard
                          style={neighbourhoodInfo.streetList.indexOf(street) == (neighbourhoodInfo.streetList.length - 1)
                            ? styles.expandableCardLast
                            : styles.expandableCard}
                          street={street} />
                      )
                    })
                    }
                  </CollapsibleCard>
                </ScrollView>)
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
      <LinearGradient colors={['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']}
        style={styles.gradient}
        start={{ x: 0.75, y: 0.35 }}
        locations={[0, 0.1, 0.3, 0.45, 0.75]}>

        <TouchableOpacity onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }}>
          <Image
            style={[styles.topTabIcons, { marginLeft: 15, width: 25, height: 25, marginTop: 3 }]}
            source={require('./assets/hamburger.png')} />
        </TouchableOpacity>
        <StatusBar style="auto" />
        
      </LinearGradient>

    </View>
  );
};



export default function App() {

  const [selectedIndex, setIndex] = useState(0);
  const [check, setCheck] = useState(false);


  return (
    <SideMenu isOpen={check} menu={<SideBar setIndex={setIndex} />} animationFunction={(prop, value) =>
      Animated.spring(prop, {
        toValue: value,
        friction: 17,
        useNativeDriver: true,
      })}>
      <TouchableOpacity onPress={() => { setCheck(false) }} activeOpacity={1}>
        {selectedIndex === 0 ? <Kvarovi setDrawerCheck={setCheck} /> : <Radovi />}

      </TouchableOpacity>
    </SideMenu>
  );
}



const SideBar = (props) => {
  const [chosen, setChosen] = useState("");

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

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    readData();
  }, [])
  return (
    <View>
      <LinearGradient colors={['#ffffff', '#dcdcdc']} style={{ borderRadius: 10 }}
        start={{ x: 0, y: 0 }} locations={[0.82, 1]}>

        <View style={{ paddingTop: 150 }}>

          <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Vodovod</Text>
          </View>

          <SideBarEntry pressEvent={() => { props.setIndex(0) }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Kvarovi</Text>
            <ChevronRight />
          </SideBarEntry>

          <SideBarEntry pressEvent={() => { props.setIndex(1) }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Radovi</Text>
            <ChevronRight />
          </SideBarEntry>
        </View>
      </LinearGradient>

      <LinearGradient colors={['#ffffff', '#dcdcdc']} style={{ borderRadius: 10 }}
        start={{ x: 0, y: 0 }} locations={[0.82, 1]}>

        <SideBarHeader>
          <Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Struja</Text>
        </SideBarHeader>


        <SideBarEntry pressEvent={() => { }}>
          <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Kvarovi</Text>
          <ChevronRight />
        </SideBarEntry>

        <SideBarEntry pressEvent={() => { }}>
          <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Radovi</Text>
          <ChevronRight />
        </SideBarEntry>


        <Picker
          selectedValue={chosen}
          onValueChange={(itemValue, itemIndex) => {
            setChosen(itemValue);
            storeData(itemValue)}}>
          <Picker.Item label="Стари Град" value="Стари Град" />
          <Picker.Item label="Савски Венац" value="Савски Венац" />
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
    </View>
  )
}

function SideBarEntry(props) {

  return (
    <TouchableOpacity onPress={() => { props.pressEvent() }}>
      <View style={styles.sideBarEntry}>
        {props.children}
      </View>
    </TouchableOpacity>
  )
}

function SideBarHeader(props) {

  return (
    <View style={{ paddingTop: 50 }}>
      <View style={styles.categoryContainer}>
        {props.children}
      </View>
    </View>
  )
}


function ChevronRight(props) {

  return (
    <LinearGradient colors={['#A47AFD', '#FEA280']} style={{ marginRight: 20, borderRadius: 20 }}
      start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
      <Image
        style={{ width: 25, height: 25 }}
        source={require('./assets/chevron-right.png')} />
    </LinearGradient>
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
    marginTop:20,
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
  },
  sideBarEntry: {
    alignItems: 'center',
    paddingLeft: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 15
  },
  categoryContainer: {

    alignItems: 'center',
    paddingLeft: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  localCard: {
    height: 251,
    margin: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 50,
    shadowOpacity: '20%',
    justifyContent: 'space-around',
    padding: 15,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 0.16,
  }
});
