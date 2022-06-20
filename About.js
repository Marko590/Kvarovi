import {Linking, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import React from "react";
import Background from './Background';

export default function About(props) {


	return (
		<Background style={[styles.gradient,{padding:20,alignContent:'center',paddingTop:'50%'}]}>
			
				<Text style={[styles.chosenTextTitle,{alignSelf:'flex-start'}]}>
					Аутор:
				</Text>

				<Text style={[styles.chosenTextSubTitle,{fontSize:30}]}>
					Марко Бојковић
				</Text>

				<Text style={[styles.chosenTextSubTitle,{fontSize:20}]}>
					Апликација је направљена са сврхом вежбања React-Native архитектуре, као и са сврхом вежбања REST API-ја. 
					{'\n'}	{'\n'}
				</Text>

				<Text style={[styles.chosenTextTitle,{alignSelf:'flex-start'}]}>
					Контакт:
				</Text>

				<View style={{flexDirection:'row',justifyContent:'center',alignSelf:'center'}}>

					<TouchableOpacity onPress={()=>{Linking.openURL('https://github.com/Marko590')}} style={{flexWrap:'wrap',flex:1,justifyContent:'center'}}>
						<Image source={require('./assets/git.png')} style={{width:40,height:40}}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{Linking.openURL('mailto:marko.bojkovic00@outlook.com')}} style={{flex:1,alignSelf:'center'}}>
						<Image source={require('./assets/email.png')} style={{width:40,height:40}}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{}} style={{flex:1,flexGrow:1}}>
						<Image source={require('./assets/play.png')} style={{width:40,height:45}}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{}} style={{flex:1,flexGrow:1}}>
						<Image source={require('./assets/play.png')} style={{width:40,height:45}}/>
					</TouchableOpacity>

				</View>
					
		</Background>
	)
}


const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',

	},
	gradient: {
		height:'100%',
		width:'100%'
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
		marginTop: 25,
		borderRadius: 20,
		width: 320,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		marginBottom: 35
	},
	topTabIcons: {
		width: 30,
		height: 30
	},

	localCard: {
		height: '30%',
		margin: 5,
		marginTop: 10,
		marginLeft: 15,
		marginRight: 15,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'gray',
		elevation: 50,
		shadowOpacity: '20%',
		alignContent: 'center',
		padding:20,
		paddingRight:15,
		paddingTop:10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 100,
		},
		shadowOpacity: 0.51,
		shadowRadius: 0.16,
		flexDirection: 'column',
	},
	chosenTextSubTitle: {
		color: '#d9d9d9',
		fontSize: 20,
		marginBottom:10,
		fontFamily: 'sans-serif-light'
	},

	chosenTextTitle: {
		color: '#d9d9d9',
		fontSize: 40,
		fontFamily: 'sans-serif-light',
	}
});
