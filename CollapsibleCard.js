import {LinearGradient} from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import Collapsible from 'react-native-collapsible';
export default function CollapsibleCard(props){
    const [check, setCheck] = useState(true);
  
    return (
      <LinearGradient colors={['#8A5DB6','#99C5E1']} style={[styles.gradient,{borderRadius:10,elevation:5}]}
        start={{x:0,y:0}} locations={[0,0.65]}>
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
      color: 'white',
      fontSize: 20,
      fontFamily: 'sans-serif-light',
    },
  
    neighbourhoodTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#9c9c9c',
      justifyContent: 'space-between',
      borderRadius: 7,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingLeft: 15,
      paddingRight: 10,
      paddingBottom: 5,
      paddingTop: 5,
     
      marginRight:5,
      marginLeft:5,
      elevation:3
    },
    neighbourhoodTitlePressed: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#bdbdbd',
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
   
  
  });
  