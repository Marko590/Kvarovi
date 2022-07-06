import React, { useState, useEffect,useLayoutEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AlertLabel from './AlertLabel';
import { Picker } from "@react-native-picker/picker";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AreaPicker from "../Settings/AreaPicker";
import axios from 'axios';
export default function SideBar(props) {

	
	
	const navigation = useNavigation();

	const moveToScreen = (screen) => {
		navigation.navigate(screen);
	}
	const [plumbingAlerts, setPlumbingAlerts] = useState(0);
	const getPlumbingData = () => {
		axios
			.get("https://kvaroviserver.azurewebsites.net/vodovod/kvarovi")
			.then((response) => {
				console.log(response.data);
				setPlumbingData(response.data);
				setLoading(false);
			});
	};
	const [plumbingData, setPlumbingData] = useState([]);

	function aggregatePlumbingAlerts() {
		let alert = 0;
		plumbingData.map && plumbingData.map(item => {
			item.streets.map(neighbourhoodInfo => {
				if (neighbourhoodInfo.neighbourhood == chosen) {
					alert += neighbourhoodInfo.streetList.length
				}
			})
		})
		console.log(alert)
		setPlumbingAlerts(alert)
	}
	const [electricalAlerts, setElectricalAlerts] = useState(1);
	const [electricalData, setElectricalData] = useState({});
    const getElectricalData = () => {
        axios
            .get("https://kvaroviserver.azurewebsites.net/struja/radovi")
            .then((response) => {
                console.log(response.data);
                const array = [];
                setElectricalData(response.data.allData);
            });
    };

	function aggregateElectricalAlerts(){
        setElectricalAlerts(0)
        electricalData.find
        &&electricalData.find(element => element.neighbourhood == chosen)
        &&electricalData.find(element => element.neighbourhood == chosen).interval.map(item => {
                    setElectricalAlerts(prevState => (prevState + item.streets.length))        
            })
    }
    
	useLayoutEffect(()=>{
		getElectricalData()
		getPlumbingData()
		aggregateElectricalAlerts()
		aggregatePlumbingAlerts()

	},[])
	
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
	const [chosen, setChosen] = useState("");

	const dayColors = ['#3769B9', '#527aa7', '#6d8c94', '#889d82', '#a3ae6f']
	return (
		<View style={{ flexDirection: 'column' }}>
			<View style={{ marginTop: 40 }}>
				<SideBarEntry>
					<Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>{props.chosen}</Text>
					
				</SideBarEntry>
				<SideBarEntry>
				<AlertLabel alerts={props.plumbing}/>
					<AlertLabel alerts={props.electrical}/>
					
					</SideBarEntry>
				<AlertLabel alerts={2}/>
			</View>
			<LinearGradient colors={['#ffffff', '#dcdcdc']} style={{ borderRadius: 15, paddingTop: 30 }}
				start={{ x: 0, y: -0.6 }} locations={[0.82, 1]}>
					
				<SideBarHeader>
					<Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Водовод</Text>
					
				</SideBarHeader>

				<SideBarEntry pressEvent={() => { props.setIndex(0) }}>
					<Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Кварови</Text>
					<ChevronRight />
				</SideBarEntry>

				<SideBarEntry pressEvent={() => { props.setIndex(1) }}>
					<Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Радови</Text>
					<ChevronRight />
				</SideBarEntry>


			</LinearGradient>

			<LinearGradient colors={['#ffffff', '#dcdcdc']} style={{ borderRadius: 15 }}
				start={{ x: 0, y: -0.6 }} locations={[0.82, 1]}>

				<SideBarHeader>
					<Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Струја</Text>
				</SideBarHeader>


				<SideBarEntry pressEvent={() => { props.setIndex(2) }}>
					<Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Кварови</Text>
					<ChevronRight />
				</SideBarEntry>


			</LinearGradient>
			<View style={{ alignSelf: 'flex-start' }}>
				<TouchableOpacity style={{ flex: 1 }} onPress={() => { moveToScreen("Settings") }}>
					<Image
						source={require('../assets/settings.png')}
						style={{ width: 50, height: 50, marginTop: 100, marginLeft: 20 }} />
				</TouchableOpacity>
			</View>
		</View>
	)
}


export function SideBarEntry(props) {

	return (
		<TouchableOpacity onPress={() => { props.pressEvent() }}>
			<View style={styles.sideBarEntry}>
				{props.children}
			</View>
		</TouchableOpacity>
	)
}

export function SideBarHeader(props) {

	return (
		<View style={{ paddingTop: 50, marginTop: 20 }}>
			<View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
				{props.children}
			</View>
		</View>
	)
}

export function ChevronRight(props) {

	return (
		<LinearGradient colors={['#265db5', '#a0b053']} style={{ marginRight: 20, borderRadius: 20 }}
			start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
			<Image
				style={{ width: 25, height: 25 }}
				source={require('../assets/chevron-right.png')} />
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		height: '10%',
	},
	gradient: {
		height: 1080,
		marginBottom: 0,
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
	categoryContainer: {

		alignItems: 'center',
		paddingLeft: 20,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 10
	},
	Card: {
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
	}
});
