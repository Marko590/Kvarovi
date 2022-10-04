
import { Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import React, { useState } from "react";
import { Pressable } from "@react-native-material/core";
import ModalWrapper from './ModalWrapper';
import axios from 'axios';
import { addNotificationsDroppedListener } from 'expo-notifications';


export default function StreetCard(props) {
	const [mapCheck, setMapCheck] = useState(false);
	const [check, setCheck] = useState(false);
	const [coordinates, setCoordinates] = useState({});


	const getCoordinates = (address) => {
		axios
			.post("http://192.168.0.29:3000/vodovod/coordinates", { address: address } )
			.then((response) => {
				setCoordinates(response.data);
			});
	};
	
	return (

		<Pressable style={props.style}
			elevation={5}
			onLongPress={() => {
				setCheck(prevCheck => !prevCheck);
				console.log(props.street)}}>
			<Text
				style={{ fontFamily: 'sans-serif-medium', color: 'white' }}
				onLongPress={() => {
					setCheck(prevCheck => !prevCheck);
					props.electrical?getCoordinates(props.street.split(':').at(0)):getCoordinates(props.street)
					
					console.log(props.street);
				}}>
				▫️ {props.street.trim()}
			</Text>
			<ModalWrapper street={props.street} check={check} setCheck={setCheck} coordinates={coordinates} setMapCheck={setMapCheck} />
		</Pressable>


	)


}

