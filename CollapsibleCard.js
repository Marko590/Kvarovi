import {LinearGradient} from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import Collapsible from 'react-native-collapsible';
export default function CollapsibleCard(props){
    const [check, setCheck] = useState(true);
  
    return (
      <LinearGradient colors={['#A47AFD','#FEA280']} style={[styles.gradient,{borderRadius:10}]}
        start={{x:0,y:0}} locations={[0,0.75]}>
        <TouchableOpacity
          onPress={() => { setCheck(prevCheck => !prevCheck); }}
          style={check ? styles.neighbourhoodTitlePressed : styles.neighbourhoodTitle}
          elevation={10}>
            
          <Text style={styles.neighbourhoodText}>
            {props.neighbourhood}
          </Text>
  
          {check ?
            <Image style={styles.arrowIcon} source={require('./assets/expand-more.png')} /> :
            <Image style={styles.arrowIcon} source={require('./assets/expand-less.png')} />}
  
        </TouchableOpacity>
  
        <Collapsible collapsed={check} duration={200}>
          {props.children}
        </Collapsible>
  
      </LinearGradient>
    )
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
  