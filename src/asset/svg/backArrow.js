import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg width="25" height="19" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M19.1431 8L0.856897 8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M7.85693 1L0.856934 8L7.85693 15" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}

export default BackArrow
