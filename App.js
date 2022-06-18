import { StatusBar } from 'expo-status-bar';
import { Animated, Image, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
	createStackNavigator, TransitionPresets, CardStyleInterpolators,
	createStackNavigato
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import StreetCard from './StreetCard';
import CollapsibleCard from './CollapsibleCard';
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeButton from './TimeButton';
import Background from './Background';
import SideBar, { SideBarEntry } from './SideBar';
import AreaPicker from './AreaPicker';
import Settings from './Settings';
import Radovi from './Radovi';
function TabIcon(props) {
	return (
		<TouchableOpacity
			onPress={() => { props.onPress() }}>
			<Image
				style={[styles.topTabIcons,props.style]}
				source={props.src} />
		</TouchableOpacity>
	)
}


const Kvarovi = (props) => {

	const [streets, setStreets] = useState([]);
	const [chosen, setChosen] = useState("");
	const [selectedIndex, setIndex] = useState(0);
	const [data, setData] = useState({});

	const getData = () => {
		axios
			.get("http://192.168.0.31:8081/vodovod/kvarovi")
			.then((response) => {
				console.log(response.data);
				setData(response.data.allData);
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



	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem('@storage_Key', value)
		} catch (e) {
			// saving error
		}
	}
	useEffect(() => {
		getData();
		readData();
	}, []);

	return (
		<View>
			<Background style={{ justifyContent: 'center', padding: 10 }}>
				<ScrollView>
					{/* View holding the top tab icons */}
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35,padding:20,paddingBottom:0 }}>
						<TabIcon onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }} src={require('./assets/hamburger.png')} />
						<TabIcon onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }} src={require('./assets/about.png')} style={{width:35,height:35}} />
					</View>

					{/* Card displaying info about user's selected neighbourhood */}
					<LinearGradient
						colors={['#6D80D0', '#7176d6', '#886fd4', '#9466c2']}
						style={styles.localCard}
						start={{ x: 0.7, y: 0 }}
						locations={[0, 0.1, 0.5, 0.85]}>

						<Text style={styles.chosenTextTitle}>{chosen}</Text>

						<View>
							<Text style={styles.chosenTextSubTitle}>
								Broj kvarova u Vašem naselju:
								<Text> {
									data.at && data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen) &&
									data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen).streetList.length
								}</Text>
							</Text>
						</View>

					</LinearGradient>

					{/* View holding the buttons indicating time*/}
					<View style={styles.buttonContainer}>
						{data.map && data.map((a, index) => {
							return (
								<TimeButton
									time={a.time}
									setIndex={setIndex}
									index={index}
									selectedIndex={selectedIndex}
									isAlone={data.length == 1 ? true : false} />
							)
						})
						}

					</View>
					

					{/* View holding the cards displaying the streets */}
					<LinearGradient colors={['#ffffff', '#cccccc']} style={[styles.cardHolder]}
						start={{ x: 0, y: 0 }} locations={[0.7, 1]}>

						<ScrollView showsVerticalScrollIndicator={false} overScrollMode='never' >
							{data.at && data.at(selectedIndex).streets.map(neighbourhoodInfo => {
								return (
									<ScrollView
										contentContainerStyle={{ padding: 15 }}
										showsVerticalScrollIndicator={false}
										overScrollMode='never'>
										<CollapsibleCard neighbourhood={neighbourhoodInfo.neighbourhood}>
											{neighbourhoodInfo.streetList.map(street => {
												return (
													<StreetCard
														style={neighbourhoodInfo.streetList.indexOf(street) == (neighbourhoodInfo.streetList.length - 1)
															? styles.expandableCardLast
															: styles.expandableCard}
														street={street} />
												)
											})
											}
										</CollapsibleCard>
									</ScrollView>)
							})}
						</ScrollView>
					</LinearGradient>
					<StatusBar style="auto" />
				</ScrollView>
			</Background>
		</View>
	);
};




function Main() {

	const [selectedIndex, setIndex] = useState(0);
	const [check, setCheck] = useState(false);



	return (
		<SideMenu isOpen={check} menu={<SideBar setIndex={setIndex} />} animationFunction={(prop, value) =>
			Animated.spring(prop, {
				toValue: value,
				friction: 17,
				useNativeDriver: true,
			})}>
			<TouchableOpacity
				onPress={() => { setCheck(false) }}
				activeOpacity={1}>
				{
					{
						0: <Kvarovi setDrawerCheck={setCheck} />,
						1: <Radovi setDrawerCheck={setCheck} />,
						2: <Settings setDrawerCheck={setCheck} />
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
			</Stack.Navigator>
		</NavigationContainer>
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
		marginBottom: 35
	},
	topTabIcons: {
		width: 30,
		height: 30
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
		color: '#d9d9d9',
		fontSize: 30,
		marginBottom: 30,
		fontFamily: 'sans-serif-light'
	},

	chosenTextTitle: {
		color: '#d9d9d9',
		fontSize: 50,
		fontFamily: 'monospace'
	}
});
