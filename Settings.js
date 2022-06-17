import { StatusBar } from 'expo-status-bar';
import {  Image,  Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import 'react-native-gesture-handler';
import React from "react";
import { ScrollView } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';

import AreaPicker from './AreaPicker';


export default function Settings(props) {
	const navigation = useNavigation();

	return (

		<LinearGradient colors={['#ffffff', '#dcdcdc']}
			style={{ borderRadius: 10 }}
			start={{ x: 0, y: 0 }} locations={[0, 1]}>
			<LinearGradient colors={['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']}
				style={{ height: 86, backgroundColor: 'white', borderRadius: 20, paddingTop: 45 }}
				start={{ x: 0.75, y: 0.35 }}
				locations={[0, 0.1, 0.3, 0.45, 0.75]}>

				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flex: 1, paddingLeft: 10, marginTop: 5 }}>
						<TouchableOpacity onPress={() => { navigation.goBack() }}>
							<Image
								source={require('./assets/chevron-left.png')}
								style={{ width: 25, height: 25 }} />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 2, paddingRight: 10 }}>
						<Text style={{ textAlign: 'center', fontSize: 25, color: 'white', fontFamily: 'sans-serif-light' }}>Podešavanja</Text>
					</View>
					<View
						style={{ flex: 1, paddingRight: 10 }}>
					</View>
				</View>


			</LinearGradient>
			<ScrollView style={{ height: 740, backgroundColor: 'white' }}>
				<SettingsHeader>
					<Text style={{ fontSize: 25 }}>Osnovna podešavanja</Text>
				</SettingsHeader>


				<View style={{
					padding: 20, paddingLeft: 20,
					paddingRight: 20,
					height: 60,
					justifyContent: 'center',
					borderBottomWidth: 1,
					borderBottomColor: 'black',
					borderRadius: 35
				}}>
					<AreaPicker />
				</View>

				<SettingsEntry>
					<View style={{ flex: 2 }}>
						<Text style={{ alignSelf: 'flex-start', fontSize: 20,fontFamily:'sans-serif-light' }}>
							Izaberite boju pozadine
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							source={require('./assets/chevron-right.png')}
							style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
					</View>
				</SettingsEntry>
				<SettingsEntry>
					<View style={{ flex: 2 }}>
						<Text style={{ alignSelf: 'flex-start', fontSize: 20,fontFamily:'sans-serif-light' }}>
							Izaberite boju pozadine
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Image
							source={require('./assets/chevron-right.png')}
							style={{ width: 30, height: 30, alignSelf: 'flex-end' }} />
					</View>
				</SettingsEntry>
			</ScrollView>
			<StatusBar style="auto" />
		</LinearGradient>

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
	container: {
		justifyContent: 'space-between',

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
		marginTop: 20,
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
	},
	chosenTextSubTitle: {
		color: 'white',
		fontSize: 30,
		marginBottom: 30,
		fontFamily: 'sans-serif-light'
	},

	chosenTextTitle: {
		color: 'white',
		fontSize: 50,
		fontFamily: 'monospace'
	}
});