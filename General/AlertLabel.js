import { LinearGradient } from "expo-linear-gradient"
import { Button } from "react-native-paper"
import React from "react";
import { Text } from "react-native";

export default function AlertLabel(props) {

    return (
        <LinearGradient
            colors={['#B3292B', '#bd3b2c', '#d2602f', '#DF7630']}
            start={{ x: 0, y: -0.2 }}
            locations={[0, 0.2, 0.65, 0.85]}
            style={{ borderRadius: 10, height: 45, alignSelf: 'flex-start', justifyContent: 'center', flex: 1, marginTop: 10 }}>
            <Button
                labelStyle={{ fontSize: 25, flexDirection: 'row', bottom: '10%', right: '10%' }}
                color='white'
                icon={props.icon}
                style={{ borderRadius: 30 }}
                mode="text">
                <Text style={{ fontSize: 25 }}>
                    {props.alerts}
                </Text>
            </Button>
        </LinearGradient>
    )
}