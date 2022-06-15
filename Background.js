import React, { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Background(props){
    return(
      <LinearGradient colors={['#b18cff', '#bc8fed', '#d897c0', '#ef9e99', '#FEA280']}
      style={{ elevation: 10,justifyContent:'center',padding:10}}
      start={{ x: 0.75, y: 0.35 }} 
      locations={[0, 0.1, 0.3, 0.45, 0.75]}>
          {props.children}
        </LinearGradient>
    )
  
  }