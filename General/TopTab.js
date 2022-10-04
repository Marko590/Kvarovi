import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from "react";


export default function TopTab(props) {

    const navigation = useNavigation();
    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }

    return (
        <View style={styles.tabBar}>
            <TabIcon
                onPress={() => { props.setDrawerCheck(prevCheck => !prevCheck) }}
                src={require('../assets/hamburger.png')}
                style={{ top: 2 }}

            />
            <Text style={{ color: '#cfcfcf', textAlign: 'center', fontFamily: 'sans-serif-light', marginBottom: 2 }}>{props.pageName}</Text>
            <TabIcon
                onPress={() => { moveToScreen('About') }}
                src={require('../assets/about.png')}
                style={{ width: 35, height: 35 }} />
        </View>
    )
}


function TabIcon(props) {
    return (
        <TouchableOpacity
            onPress={() => { props.onPress() }}>
            <Image
                tintColor="#cfcfcf"
                style={[styles.topTabIcons, props.style]}
                source={props.src} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    topTabIcons: {
        width: 30,
        height: 30
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 35,
        padding: 10,
        paddingBottom: 0,
        marginBottom: 20
    }
});
