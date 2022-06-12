import {LinearGradient} from 'expo-linear-gradient';
import {  Text, View,StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import React, { useState, useEffect } from "react";

export default function CollapsibleCard(props){
    const [check, setCheck] = useState(true);
    const [drawerCheck, setDrawerCheck] = useState(true);
    return (
      <View>
        <LinearGradient colors={['#000BEA','#00C6FB']} style={[styles.timeTitle,{borderRadius:10}]}
        start={{x:0,y:0}} locations={[0,1]}
          onTouchEnd={() => { setCheck(prevCheck => !prevCheck); }}
          onLongPress={() => { setDrawerCheck(prevCheck => !prevCheck); }}
        >
          <Text style={{ fontSize: 30, color: 'white', fontFamily: 'sans-serif-light' }}>{props.text}</Text>
  
  
        </LinearGradient>
        <Collapsible collapsed={check}
          duration={500}
        >
          {props.children}
        </Collapsible>
  
      </View>
    )
  
  
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      justifyContent: 'space-between',
  
    },
    expandableCardLast: {
      backgroundColor: '#575555',
      borderRadius: 5,
      justifyContent: 'center',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      flex: 0,
      marginLeft: 15,
      marginRight: 15,
      paddingBottom: 10,
      paddingTop: 10,
    },
    expandableCard: {
      backgroundColor: '#575555',
      justifyContent: 'center',
      flex: 0,
      marginTop: 0,
      paddingBottom: 10,
      paddingTop: 10,
      marginLeft: 15,
      marginRight: 15,
    },
    neighbourhoodText: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'sans-serif-light',
    },
  
    neighbourhoodTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffa270',
      justifyContent: 'space-between',
      borderRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingLeft: 15,
      paddingRight: 10,
      paddingBottom: 5,
      paddingTop: 5,
      marginBottom: 0,
      marginLeft: 15,
      marginRight: 15,
    },
    neighbourhoodTitlePressed: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffa270',
      justifyContent: 'space-between',
      borderRadius: 5,
      paddingLeft: 15,
      paddingRight: 10,
      paddingBottom: 5,
      paddingTop: 5,
      marginLeft: 15,
      marginRight: 15,
    },
    arrowIcon: {
      marginTop: 3,
      flex: 0,
      height: 25,
      width: 25,
      alignSelf: 'flex-start',
      marginRight: 5,
    },
    timeTitle: {
      marginBottom: 10,
      marginTop: 50,
      backgroundColor: '#ffa270',
      padding: 0,
      borderRadius: 10,
      alignItems: "center",
    },
   
  
  
  });
  
  