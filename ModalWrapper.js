import { BlurView } from 'expo-blur';
import { Image, StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Linking, Share } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function ModalWrapper(props) {


	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
	const latLng = `${props.coordinates.latitude},${props.coordinates.longitude}`;
	const label = 'Custom Label';

	const url = Platform.select({
		ios: `${scheme}${label}@${latLng}`,
		android: `${scheme}${latLng}(${label})`
	});

	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	let message = { message: '' }

	useEffect(() => {
		setLatitude(props.coordinates.latitude);
		setLongitude(props.coordinates.longitude);
		message = { message: longitude + '\n' + latitude }
	})

	return (
		
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.check}
				onRequestClose={() => {
					props.setCheck(prevCheck => !prevCheck)
				}}>

				{/* Linking.openURL(url); */}
				<TouchableWithoutFeedback onPress={() => {
					props.setCheck(prevCheck => !prevCheck);
				}}>
					<View style={{flex: 1, justifyContent: 'flex-end', elevation: 10 }}>

						<TouchableWithoutFeedback onPress={() => { }}>
							<LinearGradient colors={['#ffffff', '#a8a8a8']} style={styles.modalBackground}
								start={{ x: 0, y: 0 }} locations={[0.7, 1]}>

								<View style={styles.modalContainer}>

									<Text style={{ marginLeft: 5, alignSelf: 'flex-start', fontSize: 25, flex: 1 }}>
										{props.street}
									</Text>

									<View style={{  flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
									</View>
									<View style={styles.buttonContainer}>

										<Button icon="map-marker" style={{ borderRadius: 30, marginRight: 10, width: '45%' }} mode="contained" onPress={() => Linking.openURL(url)}>
											Na mapi
										</Button>
										<Button icon="share" style={{ borderRadius: 30, width: '45%' }} mode="outlined" onPress={() => Share.share(message)}>
											Podeli
										</Button>

									</View>

								</View>

							</LinearGradient>
							
						</TouchableWithoutFeedback>
					</View>

				</TouchableWithoutFeedback>

			</Modal>
		
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		borderRadius: 15,
		marginBottom: 5,
		justifyContent: 'flex-start',
		marginRight: 10,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	gradient: {
		borderRadius: 7,
		marginRight: 15,
		marginLeft: 15,
		marginBottom: 0,
	},
	modalContainer: {
		height: '80%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		width: '100%',
		padding: 10,
		paddingTop: 0,
		paddingLeft: 20
	},
	modalBackground:{
		elevation: 10,
		height: '20%',
		width: '98%',
		alignSelf: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderWidth: 2,
		borderBottomWidth: 0,
		borderColor: '#a8a8a8'
	}
});
