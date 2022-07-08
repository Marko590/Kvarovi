import { StatusBar } from 'expo-status-bar';
import { Dimensions, Animated, Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import React, { useState, useEffect, useLayoutEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import StreetCard from './Kvarovi/StreetCard';
import CollapsibleCard from './Kvarovi/CollapsibleCard';
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeButton from './Kvarovi/TimeButton';
import Background from './General/Background';
import AreaPicker from './Settings/AreaPicker';
import SideBar from './General/SideBar';
import Settings from './Settings/Settings';
import AlertLabel from './General/AlertLabel';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import Radovi from './Radovi/Radovi';
import * as NavigationBar from 'expo-navigation-bar';
import About from './General/About';
import Struja from './Struja/Struja';
import TopTab from './General/TopTab';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function TabIcon(props) {
	return (
		<TouchableOpacity
			onPress={() => { props.onPress() }}>
			<Image
				style={[styles.topTabIcons, props.style]}
				source={props.src} />
		</TouchableOpacity>
	)
}


const Kvarovi = (props) => {

	const [chosen, setChosen] = useState("");
	const [selectedIndex, setIndex] = useState(0);
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const navigation = useNavigation();

	const moveToScreen = (screen) => {
		navigation.navigate(screen);
	}

	const getData = () => {
		axios
			.get("https://kvaroviserver.azurewebsites.net/vodovod/kvarovi")
			.then((response) => {
				console.log(response.data);
				setData(response.data);
				setLoading(false);
			});
	};

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
	function aggregateAlerts() {
		let alert = 0;
		data.map && data.map(item => {
			item.streets.map(neighbourhoodInfo => {
				if (neighbourhoodInfo.neighbourhood == chosen) {
					alert += neighbourhoodInfo.streetList.length
				}
			})
		})
		console.log(alert)
		setAlerts(alert)
	}
	useLayoutEffect(() => {
		aggregateAlerts()
		readData();
		if (chosen === 'Палилула') {
			setVisible(false);
		}
	})
	useEffect(() => {
		getData();
		readData();
		if (chosen === 'Палилула') {
			setVisible(false);
		}

	}, []);
	useEffect(() => {
		if (chosen === 'Палилула') {
			setVisible(false);
		}
		Animated.timing(fadeAnim, {

			useNativeDriver: false,
			toValue: 1,
			duration: 1500,
		}).start();
	}, []);
	const nightColors = ['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
	const [fadeAnim] = useState(new Animated.Value(0.5));
	const dayColors = ['#3769B9', '#527aa7', '#6d8c94', '#889d82', '#a3ae6f']
	const [alerts, setAlerts] = useState(0);
	const [visible, setVisible] = useState(true);
	const hideDialog = () => setVisible(false);



	return (
		<View>
			{!visible ?
				<Background style={styles.gradient}>

					{/* View holding the top tab icons */}
					<TopTab setDrawerCheck={props.setDrawerCheck} pageName={"Vodovod" + '\n' + 'Kvarovi'} />


					<LinearGradient
						colors={dayColors}
						style={styles.localCard}
						start={{ x: 0.5, y: 0 }}
						locations={[0, 0.25, 0.5, 0.75, 1]}>
						<View style={{ flex:1.7, flexDirection: 'row' }}>

							<Text
								style={[styles.chosenTextTitle, { flex: 3.5, right: '2.5%' }]}>
								{chosen}
							</Text>

							{/* Label showing the number of malfunctions in the selected area*/}
							<AlertLabel alerts={alerts} icon={'traffic-cone'} />

						</View>

						{/* Subtitle containing the streets affected by repairs */}
						<View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center' }}>

							{!isLoading ?
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


					{/* View holding the cards displaying the streets */}
					{!isLoading ?
						<ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{ padding: 35, paddingLeft: 15, paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}>

							{data.map && data.map(a => {
								return (
									<Animated.View style={{ opacity: fadeAnim,marginLeft:20 }}>
										<LinearGradient
											colors={['#3b506e', '#aaaaaa']}
											style={[styles.cardHolder]}
											start={{ x: 0, y: 0 }}
											locations={[1, 1]}>
											<View style={{ borderBottomWidth: 0.5, borderRadius: 15, borderColor: '#d9d9d9', padding: 15 }}>
												<Text style={{ color: '#d9d9d9', fontSize: 30, textAlign: 'center', fontFamily: 'sans-serif-medium' }}>{a.time}</Text>
											</View>
											<ScrollView
												style={{ flex: 2 }}
												contentContainerStyle={{ padding: 20, paddingBottom: 0 }}
												showsVerticalScrollIndicator={false}
												overScrollMode='never'>

												{a.streets.map(b => {
													return (
														<CollapsibleCard neighbourhood={b.neighbourhood}>
															{b.streetList.map(street => {
																return (
																	<StreetCard
																		style={b.streetList.indexOf(street) == (b.streetList.length - 1)
																			? styles.expandableCardLast
																			: styles.expandableCard}
																		street={street} />
																)
															})}
														</CollapsibleCard>
													)
												})}
											</ScrollView>


										</LinearGradient>
									</Animated.View>
								)
							})}

						</ScrollView> : <Animated.View style={{ opacity: fadeAnim }}>
							<LinearGradient
								colors={['#3b506e', '#aaaaaa']}
								style={[styles.cardHolder]}
								start={{ x: 0, y: 0 }}
								locations={[1, 1]}>

								<ActivityIndicator size={150} />
							</LinearGradient></Animated.View>
					}
					<StatusBar style="light" />

				</Background> :
				<Background style={styles.gradient}>
					<Provider style={{ elevation: 50 }}>
						<Portal>
							<Dialog visible={visible} onDismiss={(hideDialog)} dismissable={false}>
								<Dialog.Content>
									
									<View style={{ height: 200 ,flexDirection:'column'}}>
									<View style={{flex:1}}>
										<Text style={{fontSize:30}}>Одаберите насеље у којем живите:</Text>
										</View>
										<View style={{flex:1}}>
										<AreaPicker />
										</View>
									</View>
									<Dialog.Actions style={{ alignSelf: 'flex-end' }}>
									
										<Button onPress={hideDialog}>Потврди</Button>
									</Dialog.Actions>
								</Dialog.Content>
							</Dialog>
						</Portal>
					</Provider>
				</Background>}
		</View>
	);
};



function Main() {

	
	
	const [selectedIndex, setIndex] = useState(0);
	const [check, setCheck] = useState(false);
	NavigationBar.setBackgroundColorAsync("#323b59");

	return (
		<SideMenu isOpen={check} menu={<SideBar setIndex={setIndex} />} animationFunction={(prop, value) =>
			Animated.spring(prop, {
				toValue: value,
				friction: 17,
				useNativeDriver: true
			})}>

			<TouchableOpacity
				onPress={() => { setCheck(false) }}
				activeOpacity={1}>
				{{
					0: <Kvarovi setDrawerCheck={setCheck} />,
					1: <Radovi setDrawerCheck={setCheck} />,
					2: <Struja setDrawerCheck={setCheck} />
				}[selectedIndex]}
			</TouchableOpacity>
		</SideMenu>
	)
}

export default function App() {
	const Stack = createStackNavigator();
	const [check, setCheck] = useState(false);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
				<Stack.Screen name="Main" component={Main} />
				<Stack.Screen name="Settings" component={Settings} />
				<Stack.Screen name="About" component={About} />
			</Stack.Navigator>
		</NavigationContainer>
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
		marginBottom: 15,
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
		marginRight: 20,
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
