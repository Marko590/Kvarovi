import React, { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Appearance} from 'react-native'

const nightColors=['#A293FB', '#ab93da', '#ba92a7', '#c89173', '#D19152']
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
      start={{ x: 0.3, y: 0.55 }} 
      locations={[0, 0.3, 0.35, 0.45, 0.55]}>
          {props.children}
        </LinearGradient>
    )
  
  }