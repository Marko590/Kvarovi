import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import 'react-native-gesture-handler';
import React from "react";
import { ScrollView } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';
import Background from '../General/Background';
import AreaPicker from './AreaPicker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Settings(props) {
	const navigation = useNavigation();

	return (

		<View>
			<Background style={styles.topBar}>

				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

					<View style={{ flex: 1, paddingLeft: 15, marginTop: 5 }}>
						<TouchableOpacity onPress={() => { navigation.goBack() }}>
							<Image
								source={require('../assets/chevron-left.png')}
								style={{ width: 25, height: 25 }}/>
						</TouchableOpacity>
					</View>

					<View style={{ flex: 2, paddingRight: 10 }}>
						<Text style={{ textAlign: 'center', fontSize: 25, color: 'white', fontFamily: 'sans-serif-light' }}>Подешавања</Text>
					</View>

					<View
						style={{ flex: 1, paddingRight: 10 }}>
					</View>

				</View>

			</Background>

			<ScrollView style={{ height: windowHeight, backgroundColor: 'white' }}>

				<SettingsHeader>
					<Text style={{ fontSize: 25 }}>Основна подешавања</Text>
				</SettingsHeader>

				<View style={styles.pickerContainer}>
					<AreaPicker />
				</View>

				<SettingsEntry>
					<View style={{ flex: 2 }}>
						<Text style={{ alignSelf: 'flex-start', fontSize: 18, fontFamily: 'sans-serif-light' }}>
							Изаберите боју позадине
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							source={require('../assets/chevron-right.png')}
							style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
					</View>
				</SettingsEntry>
				<SettingsEntry>
					<View style={{ flex: 2 }}>
						<Text style={{ alignSelf: 'flex-start', fontSize: 18, fontFamily: 'sans-serif-light' }}>
						Изаберите боју позадине
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							source={require('../assets/chevron-right.png')}
							style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
					</View>
				</SettingsEntry>
			</ScrollView>
			<StatusBar style="auto" />
		</View>

	)
}

export function SettingsEntry(props) {

	return (
		<TouchableOpacity style={styles.settingsEntry}>
			{props.children}
		</TouchableOpacity>
	)
}

export function SettingsHeader(props) {

	return (
		<View style={{ paddingTop: 50 }}>
			<View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'black', borderBottomWidth: 1, borderRadius: 15 }}>
				{props.children}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	arrowIcon: {
		marginTop: 4,
		flex: 0,
		height: 20,
		width: 20,
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
	settingsEntry: {
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30,
		height: 60,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		borderRadius: 35
	},
	categoryContainer: {
		alignItems: 'center',
		paddingLeft: 20,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 10
	},
	pickerContainer: {
		padding: 20, paddingLeft: 20,
		paddingRight: 20,
		height: 60,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		borderRadius: 35
	},
	topBar: {
		height: '10%',
		backgroundColor: 'white',
		borderRadius: 30,
		paddingTop: '10%',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	}
});