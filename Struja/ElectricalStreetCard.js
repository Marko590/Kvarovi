import { Text, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import ModalWrapper from '../Kvarovi/ModalWrapper';
import axios from 'axios';


export default function ElectricalStreetCard(props) {
	const [mapCheck, setMapCheck] = useState(false);
	const [check, setCheck] = useState(false);
	const [coordinates, setCoordinates] = useState({});

	const getCoordinates = (address) => {
		axios
			.get("http://192.168.0.31:3000/vodovod/coordinates", { address: address })
			.then((response) => {
				console.log(response.data);
				setCoordinates(response.data);
			});
	};

	return (

		<TouchableOpacity style={props.style} onLongPress={() => {
			setCheck(prevCheck => !prevCheck);
			console.log(props.street.split(':').at(0))
			props.electrical ? getCoordinates(props.street.split(':').at(0)) && props.street.split(':').at(0) : getCoordinates(props.street)

			console.log(props.street);
		}}
		>
			<Text
				style={{ fontFamily: 'sans-serif-medium', color: '#f9f9f9' }}
			>
				▫️ {props.street.trim()}
			</Text>
			<ModalWrapper street={props.street} check={check} setCheck={setCheck} coordinates={coordinates} setMapCheck={setMapCheck} />
		</TouchableOpacity>


	)


}

