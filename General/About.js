import { Linking, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import React from "react";
import Background from './Background';

export default function About(props) {


	return (
		<Background style={styles.background}>

			<Text style={[styles.chosenTextTitle, { alignSelf: 'flex-start' }]}>
				Аутор:
			</Text>

			<Text style={[styles.chosenTextSubTitle, { fontSize: 30 }]}>
				Марко Бојковић
			</Text>

			<Text style={[styles.chosenTextSubTitle, { fontSize: 20 }]}>
				Апликација је направљена са сврхом вежбања React-Native архитектуре, као и са сврхом вежбања REST API-ја.
				{'\n'}	{'\n'}
			</Text>

			<Text style={[styles.chosenTextTitle, { alignSelf: 'flex-start' }]}>
				Контакт:
			</Text>

			<View style={styles.contactView}>

				<TouchableOpacity onPress={() => { Linking.openURL('https://github.com/Marko590') }} style={{ flex: 1, justifyContent: 'center' }}>
					<Image source={require('../assets/git.png')} style={{ width: 40, height: 40 }} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { Linking.openURL('mailto:marko.bojkovic00@outlook.com') }} style={{ flex: 1, alignSelf: 'center' }}>
					<Image source={require('../assets/email.png')} style={{ width: 40, height: 40 }} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { }} style={{ flex: 1, flexGrow: 1 }}>
					<Image source={require('../assets/play.png')} style={{ width: 40, height: 45 }} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { }} style={{ flex: 1, flexGrow: 1 }}>
					<Image source={require('../assets/play.png')} style={{ width: 40, height: 45 }} />
				</TouchableOpacity>

			</View>

		</Background>
	)
}


const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',

	},
	background: {
		padding: 20,
		alignContent: 'center',
		paddingTop: '50%',
		height: '100%',
		width: '100%'
	},

	chosenTextSubTitle: {
		color: '#d9d9d9',
		fontSize: 20,
		marginBottom: 10,
		fontFamily: 'sans-serif-light'
	},

	chosenTextTitle: {
		color: '#d9d9d9',
		fontSize: 40,
		fontFamily: 'sans-serif-light',
	},
	contactView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center'
	}
});
