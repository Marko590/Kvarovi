import React, { useState, useEffect, useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Background(props){
    return(
      <LinearGradient colors={['#9466C2', '#9279c4', '#8f8cc7', '#8d9fc9', '#8AB2CB']}
      style={{ justifyContent:'center',padding:10}}
      start={{ x: 0.75, y: 0.5 }} 
      locations={[0, 0.1, 0.35, 0.45, 0.75]}>
          {props.children}
        </LinearGradient>
    )
  
  }