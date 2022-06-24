import React, { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Appearance} from 'react-native'

const nightColors=['#2D2D44', '#30344e', '#323b59', '#354163', '#37486d'].reverse()
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
      start={{ x: 0, y: 0.35 }} 
      locations={[0, 0.3, 0.35, 0.45, 0.55]}>
          {props.children}
        </LinearGradient>
    )
  
  }