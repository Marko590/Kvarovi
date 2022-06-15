import React, { useState, useEffect } from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";



export default function TimeButton(props) {
  const [check, setCheck] = useState(true);
  const [myIndex, setMyIndex] = useState(0);

  return (

    <TouchableOpacity style={props.selectedIndex == props.index ? styles.timeButtonPressed : styles.timeButton} onPress={() => { setCheck(prevCheck => !prevCheck); props.setIndex(props.index) }} >
      <Text style={props.selectedIndex == props.index ?(props.isAlone?styles.timeButtonTextPressed:styles.timeButtonTextPressedAlone) : styles.timeButtonText}>{props.time.trim()}</Text>
    </TouchableOpacity>)




}


const styles = StyleSheet.create({
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
  
  });
  