import {LinearGradient} from 'expo-linear-gradient';
import {  Text, View,StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import React, { useState, useEffect } from "react";
import { Pressable } from "@react-native-material/core";
import ModalWrapper from './ModalWrapper';
import axios from 'axios';


export default function StreetCard(props) {
    const [mapCheck, setMapCheck] = useState(false);
  const [check, setCheck] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [errorMsg, setError] = useState("");


  const getCoordinates = (address) => {
    axios
      .get("http://192.168.0.31:8081/vodovod/radovi", { params: { address: address } })
      .then((response) => {
        console.log(response.data);
        setCoordinates(response.data);
      });
  };
  return (

    <Pressable style={props.style}
      onLongPress={() => {
        setCheck(prevCheck => !prevCheck);

        console.log(props.street)
      }}
      elevation={5}
    >
      <Text
        onLongPress={() => {
          setCheck(prevCheck => !prevCheck);
          getCoordinates(props.street)
          console.log(props.street)
        }}
        style={{ fontFamily: 'sans-serif-medium', color: 'white' }}>

        ▫️ {props.street}
      </Text>

      <ModalWrapper street={props.street} check={check} setCheck={setCheck} coordinates={coordinates} setMapCheck={setMapCheck} />


    </Pressable>


  )


}