import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Bus(props) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M19 12V19H12V12H19Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M19 1V8H12V1H19Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M8 1V8H1V1H8Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M8 12V19H1V12H8Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>



  )
}

export default Bus
