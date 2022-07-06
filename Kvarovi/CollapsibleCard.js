import { LinearGradient } from 'expo-linear-gradient';
import { Easing, Animated, Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import Collapsible from 'react-native-collapsible';
export default function CollapsibleCard(props) {
  const [check, setCheck] = useState(true);



  const animation = useState(new Animated.Value(1))[0];
  const downAnimation = () => {
    animation.setValue(1);
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }
  const upAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }
  
  const nightColors = ['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
  	const dayColors=['#A3AE6F', '#85a090', '#6893b0', '#4a85d1', '#2c77f1']

  const RotateData = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });
  return (
    <LinearGradient colors={['#265db5','#aec251']} style={[styles.gradient, { borderRadius: 10, elevation: 5 }]}
      start={{ x: 0, y: -0.5 }} locations={[0, 1]}>
      <TouchableOpacity
        onPress={() => { setCheck(prevCheck => !prevCheck); if (check) { downAnimation() } else { upAnimation() } }}
        style={check ? styles.neighbourhoodTitlePressed : styles.neighbourhoodTitle}
        elevation={10}>

        <Text style={styles.neighbourhoodText}>
          {props.neighbourhood}
        </Text>


        <Animated.Image style={[styles.arrowIcon, { transform: [{ rotate: RotateData }] }]} source={require('../assets/expand-more.png')} />


      </TouchableOpacity>

      <Collapsible collapsed={check} duration={300}>
        {props.children}
      </Collapsible>

    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {

    justifyContent: 'space-between',

  },
  gradient: {
    borderRadius: 7,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 30,
  },

  neighbourhoodText: {
    color: '#dbdbdb',
    fontSize: 20,
    fontFamily: 'sans-serif-light',
  },

  neighbourhoodTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#838791',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginRight: 5,
    marginLeft: 5,
    elevation: 3
  },
  neighbourhoodTitlePressed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8c92a1',
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
    height: 20,
    width: 20,
    
  },


});
