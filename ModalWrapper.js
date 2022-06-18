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
  let message={message:''}
  useEffect(() => {
    setLatitude(props.coordinates.latitude);
    setLongitude(props.coordinates.longitude);
    message={message:longitude+'\n'+latitude}
  })
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ width: '100%', alignSelf: 'center', height: '100%', justifyContent: 'flex-start', backgroundColor: 'green' }}
        visible={props.check}
        onRequestClose={() => {
          props.setCheck(prevCheck => !prevCheck)

        }}>
        {/* Linking.openURL(url); */}

        <TouchableWithoutFeedback onPress={() => {
          props.setCheck(prevCheck => !prevCheck);
        }}>
          <View style={{ flex: 1, justifyContent: 'flex-end', elevation: 10 }} >
            <TouchableWithoutFeedback onPress={() => { }}>
              <LinearGradient colors={['#ffffff', '#a8a8a8']} style={{
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
              }}
                start={{ x: 0, y: 0 }} locations={[0.7, 1]}>


                <View style={{ height: '80%', alignSelf: 'center', justifyContent: 'space-between', width: '100%', padding: 10, paddingTop: 0, paddingLeft: 20 }}>
                  <Text style={{ marginLeft: 5, alignSelf: 'flex-start', fontSize: 25, flex: 1 }}>{props.street}</Text>
                  <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>

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
    </View>
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
  expandableCardLast: {
    backgroundColor: '#787777',
    borderRadius: 7,
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 0,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  expandableCard: {
    backgroundColor: '#787777',
    justifyContent: 'center',
    flex: 0,
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  neighbourhoodText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'sans-serif-light',
  },

  neighbourhoodTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3b3b3',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 0,
    marginRight: 5,
    marginLeft: 5
  },
  neighbourhoodTitlePressed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d6d6d6',
    justifyContent: 'space-between',
    borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  arrowIcon: {
    marginTop: 4,
    flex: 0,
    height: 20,
    width: 20,
    alignSelf: 'flex-start',

  },
  timeTitle: {
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: '#ffa270',
    padding: 0,
    borderRadius: 10,
    alignItems: "center",
  },
  timeTitleRipple: {
    borderRadius: 10,

    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15
  }


});
