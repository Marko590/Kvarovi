import React, { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Appearance} from 'react-native'

const nightColors=['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']
	const dayColors=['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']
   
export default function Background(props){
     const [colors, setColors] = useState(dayColors);

      useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
          setColors(colorScheme === 'dark' ? nightColors : dayColors);
        });
        return () => {
          subscription.remove();
        }

      })
    return(
      <LinearGradient colors={nightColors}
      style={props.style}
      start={{ x: 0.75, y: 0.5 }} 
      locations={[0, 0.1, 0.35, 0.45, 0.75]}>
          {props.children}
        </LinearGradient>
    )
  
  }