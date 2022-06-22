import { StatusBar } from 'expo-status-bar';
import {Dimensions, Animated, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import StreetCard from './Kvarovi/StreetCard';
import CollapsibleCard from './Kvarovi/CollapsibleCard';
import SideMenu from 'react-native-side-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeButton from './Kvarovi/TimeButton';
import Background from './General/Background';
import SideBar from './General/SideBar';
import Settings from './Settings/Settings';
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
	const [data, setData] = useState({});
	const navigation = useNavigation();
  
    const moveToScreen = (screen) => {
      navigation.navigate(screen);
    }
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
	
	useEffect(() => {
		getData();
		readData();
	}, []);

	const nightColors=['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
	
	const dayColors=['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']
	return (
		<View>
			<Background style={{ justifyContent: 'center' }}>

				{/* View holding the top tab icons */}
				<TopTab setDrawerCheck={props.setDrawerCheck}  pageName={"Vodovod"+'\n'+'Kvarovi'}/>




				<LinearGradient
                colors={nightColors}
                style={styles.localCard}
                start={{ x: 0.5, y: 0 }}
                locations={[0, 0.25, 0.5, 0.75, 1]}>
                <View style={{ flex: 1.5, flexDirection: 'row' }}>


                    <Text
                        style={[styles.chosenTextTitle, { flex: 3.5, right: '2.5%' }]}>
                        {chosen}
                    </Text>

                    {/* Label showing the number of malfunctions in the selected area*/}
                    <LinearGradient
                        colors={['#B3292B', '#bd3b2c', '#d2602f', '#DF7630']}
                        start={{ x: 0, y: -0.2 }}
                        locations={[0, 0.2, 0.65, 0.85]}
                        style={{ borderRadius: 10, height: 45, alignSelf: 'flex-start', justifyContent: 'center', flex: 1,marginTop:5 }}>
                        <Button
                            labelStyle={{ fontSize: 20, flexDirection: 'row', bottom: '10%', right: '10%' }}
                            color='white'
                            icon="traffic-cone"
                            style={{ borderRadius: 30 }}
                            mode="text">
                            <Text style={{ fontSize: 25 }}>
							{data.at && data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen) &&
										data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen).streetList.length?
										data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen).streetList.length:
										0}
                            </Text>
                        </Button>

                    </LinearGradient>

                </View>

                {/* Subtitle containing the streets affected by repairs */}
                <View style={{ flex: 1.8, justifyContent: 'flex-start' }}>
                    <Text style={[styles.chosenTextSubTitle]}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.chosenTextSubTitle}>
							{data.at && data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen) &&
									data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen).streetList.length?
									'Улице у којима се налазе радови:':
									'Тренутно нема радова у вашем'+'\n'+' насељу.'}
                            </Text>
							{data.at && data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen) &&
								 data.at(selectedIndex).streets.find(element => element.neighbourhood == chosen).streetList.map(item => {
									return (
										<Text style={{ color: '#d9d9d9',fontSize:15 }}>
											▫️{item.trim()}
										</Text>
									)})}
                        </View>
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
								isAlone={data.length == 1 ? true : false}/>
						)
					})
					}
				</View>

				{/* View holding the cards displaying the streets */}
				<LinearGradient 
				colors={['#fcfcfc', '#aaaaaa']} 
				style={[styles.cardHolder]}
				start={{ x: 0, y: 0 }} 
				locations={[0.7, 1]}>

					<ScrollView 
					showsVerticalScrollIndicator={false} 
					overScrollMode='never'>
						{data.at && data.at(selectedIndex).streets.map(neighbourhoodInfo => {
							return (
								<ScrollView
									contentContainerStyle={{ padding: 15 }}
									showsVerticalScrollIndicator={false}
									overScrollMode='never'>
									<CollapsibleCard neighbourhood={neighbourhoodInfo.neighbourhood}>
										{neighbourhoodInfo.streetList.map(street => 
											{
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

			</Background>
		</View>
	);
};



function Main() {

	const [selectedIndex, setIndex] = useState(0);
	const [check, setCheck] = useState(false);
	NavigationBar.setBackgroundColorAsync("#D69C61");

	return (
		<SideMenu isOpen={check} menu={<SideBar setIndex={setIndex} />} animationFunction={(prop, value) =>
			Animated.spring(prop, {
				toValue: value,
				friction: 17,
				useNativeDriver: true})}>

			<TouchableOpacity
				onPress={() => { setCheck(false) }}
				activeOpacity={1}>
				{	{	0: <Kvarovi setDrawerCheck={setCheck} />,
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
		height:windowHeight+150,
		width:windowWidth
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
        
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 0,
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
