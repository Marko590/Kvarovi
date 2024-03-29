import { LinearGradient } from 'expo-linear-gradient';
import { Easing, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import Collapsible from 'react-native-collapsible';

export default function WorkCard(props) {

  const [check, setCheck] = useState(true);
  const animation = useState(new Animated.Value(0))[0];
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

  const RotateData = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  useEffect(() => {
    props.setContent(props.content);
  }, []);
  const nightColors = ['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
  const dayColors = ['#A3AE6F', '#85a090', '#6893b0', '#4a85d1', '#2c77f1']
  return (
    <LinearGradient colors={dayColors} style={[styles.gradient, { borderRadius: 10, elevation: 5 }]}
      start={{ x: 0, y: 0 }} locations={[0, 0.25, 0.5, 0.75, 1]}>

      <TouchableOpacity
        onPress={() => { setCheck(prevCheck => !prevCheck); props.setIndex(props.index); props.setContent(props.content) }}
        style={props.selectedIndex == props.index ? styles.neighbourhoodTitle : styles.neighbourhoodTitlePressed}
        elevation={10}>

        <Text style={styles.neighbourhoodText}>
          {props.neighbourhood}
        </Text>
        <Animated.Image style={[styles.arrowIcon, { transform: [{ rotate: RotateData }] }]} source={require('../assets/expand-more.png')} />
        {props.selectedIndex == props.index ?
          downAnimation() : upAnimation()}


      </TouchableOpacity>

      <Collapsible collapsed={check} duration={200}>
        {props.children}
      </Collapsible>

    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',

  },
  gradient: {


    marginTop: 20,
    borderRadius: 7,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
  },

  neighbourhoodText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif-light',
  },

  neighbourhoodTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8c92a1',
    justifyContent: 'space-between',
    borderRadius: 7,

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
    backgroundColor: '#bdbdbd',
    justifyContent: 'space-between',
    borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
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


});
