import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AreaPicker(props) {

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
		<Picker
			selectedValue={chosen}
			onValueChange={(itemValue, itemIndex) => {
				setChosen(itemValue);
				storeData(itemValue)
			}}
			
			>
				<Picker.Item label="" value="" />
			<Picker.Item label="Стари Град" value="Стари град" />
			<Picker.Item label="Савски Венац" value="Савски венац" />
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
	)
}