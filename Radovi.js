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
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import WorkCard from './WorkCard';


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


export default function Radovi(props) {
	
	const [check, setCheck] = useState(false);
	const [data, setData] = useState({});
	const [html, setHtml] = useState([]);
	const [content, setContent] = useState("");
	const [selectedIndex, setIndex] = useState(-1);
	const getData = () => {
		axios
			.get("http://192.168.0.31:8081/vodovod/radovi")
			.then((response) => {
				console.log(response.data);
				const array = [];
				setData(response.data.allData);
				response.data.allData.map((item) => {
					array.push(item.content);
				});

				setHtml(array);
			});
	};
	useEffect(() => {

		getData();
	}, []);
	return (
		<Background style={{ elevation: 10, justifyContent: 'center'}}>
			<LinearGradient colors={['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']}
				style={styles.gradient}
				start={{ x: 0.75, y: 0.35 }}
				locations={[0, 0.1, 0.3, 0.45, 0.75]}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35 }}>
					<TabIcon onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }} src={require('./assets/hamburger.png')} style={{marginTop:2,marginLeft:5}}/>
					<TabIcon onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }} src={require('./assets/about.png')} style={{width:35,height:35,marginBottom:0,marginRight:5}} />
				</View>
				<ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>

				<StatusBar style="auto" />
				{data.map && data.map((item, index) => {
					return (
						<View key={index}>
							<WorkCard neighbourhood={item.title} index={index} selectedIndex={selectedIndex} setIndex={setIndex} setContent={setContent} content={item.content} />

						</View>
					)
				}
				)}
			
				<LinearGradient colors={['#ffffff', '#cccccc']} style={[styles.cardHolder]}
					start={{ x: 0, y: 0 }} locations={[0.5, 1]}>
					<ScrollView persistentScrollbar overScrollMode='never' >
						{selectedIndex == -1 ? null : <RenderHTML source={{ html: content }} contentWidth={350} />}
					</ScrollView>
				</LinearGradient>
				</ScrollView>
				</LinearGradient>
		</Background>
	)
}
const styles = StyleSheet.create({
	container: {


	},
	gradient: {
		height: 830,
		marginBottom: 0,
		padding:10
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
		height: 320,
		marginTop: 20,
		borderRadius: 20,
		width: 370,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		elevation: 5,
		marginBottom: 20,
		padding: 20
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
