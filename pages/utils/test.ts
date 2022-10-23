import { Extrapolate, interpolate } from "./interpolate";
const activeIndex = 0 
const outputRange = [-350,0,350]
const val = interpolate(activeIndex,{inputRange:[0,1,2],outputRange,extrapolate:Extrapolate.clamp})
console.log(val)