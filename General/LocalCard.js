import { Dimensions, Animated, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import AlertLabel from './AlertLabel';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function LocalCard(props) {
	const dayColors = ['#3769B9', '#527aa7', '#6d8c94', '#889d82', '#a3ae6f']
	const data = props.data;
	return (

		<LinearGradient
			colors={dayColors}
			style={styles.localCard}
			start={{ x: 0.5, y: 0 }}
			locations={[0, 0.25, 0.5, 0.75, 1]}>
			<View style={{ flex: 2, flexDirection: 'row' }}>

				<Text
					style={[styles.chosenTextTitle, { flex: 3.5, right: '2.5%' }]}>
					{props.chosen}
				</Text>

				{/* Label showing the number of malfunctions in the selected area*/}
				<AlertLabel alerts={props.alerts} />

			</View>

			{/* Subtitle containing the streets affected by repairs */}
			<View style={{ flex: 1.8, justifyContent: 'flex-start', alignItems: 'center' }}>

				{!props.isLoading ?
					<Animated.View style={{ flex: 2, transform: [{ scale: fadeAnim }] }}>
						<Text style={styles.chosenTextSubTitle}>
							{data.find && data.find(element => element).streets.find(item => item.neighbourhood == chosen)
								&& data.find(element => element).streets.find(item => item.neighbourhood == chosen).streetList.length ? 'Улице у којима се налазе радови:' :
								'Тренутно нема радова у вашем' + '\n' + ' насељу.'}
						</Text>
						{data.map && data.map(item => {
							return (
								item.streets.map(neighbourhoodInfo => {
									return (
										neighbourhoodInfo.neighbourhood === chosen ?
											neighbourhoodInfo.streetList.map(street => {
												return (
													<Text style={{ color: '#dbdbdb', fontSize: 15, flexShrink: 1 }}>▫️ {street.trim()}</Text>
												)

											}) : null
									)
								})
							)
						})

						}
					</Animated.View> : <ActivityIndicator style={{ alignSelf: 'center' }} size={75} />}

			</View>



		</LinearGradient>
	)

}



const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',

	},
	gradient: {
		height: windowHeight + 75,
		width: windowWidth,
		backgroundColor: '#2d2d44'
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
		justifyContent: 'center',
		height: 375,
		marginTop: 25,
		borderRadius: 20,
		width: 320,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		marginBottom: 35,
	},
	topTabIcons: {
		width: 30,
		height: 30
	},

	localCard: {
		height: 250,

		marginTop: 10,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 30,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'gray',
		elevation: 50,
		shadowOpacity: '20%',
		alignContent: 'center',
		padding: 20,
		paddingRight: 15,
		paddingTop: 5,
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
		color: '#d1d1d1',
		fontSize: 20,
		marginBottom: 10,
		marginRight: 10,
		fontFamily: 'sans-serif-light'
	},

	chosenTextTitle: {
		color: '#d1d1d1',
		fontSize: 40,
		fontFamily: 'sans-serif-light',
		marginTop: 0,
		marginLeft: 5


	}
});
