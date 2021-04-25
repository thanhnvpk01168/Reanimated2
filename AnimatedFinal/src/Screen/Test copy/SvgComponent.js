import * as React from 'react';
import {ScrollView, StyleSheet, Dimensions, View, Text} from 'react-native';
import Svg, {
  G,
  LinearGradient,
  Circle,
  Defs,
  Ellipse,
  ClipPath,
  Rect,
  Image,
  Stop,
  RadialGradient,
  Path,
  Mask,
  Polygon,
  Use,
} from 'react-native-svg';
const {width, height} = Dimensions.get('screen');
function SvgComponent(props) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 800 300">
      <Defs>
        <Mask
          id="Mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="155"
          height="155">
          <Circle
            cx={52.5}
            cy={52.5}
            r={77}
            fill="orange"
            // stroke="#05FF00"
            // strokeWidth={11}
          />
        </Mask>
      </Defs>
      <Circle
        cx={97.5}
        cy={97.5}
        r={92}
        fill="red"
        // stroke="#000022"
        // strokeWidth={11}
        mask="url(#Mask)"
      />
    </Svg>
    // <View style={{ aspectRatio: 1,borderWidth:5,borderRadius:10,borderColor:'red' }}>
    //     <Svg height="100%" width="100%" viewBox="0 0 100 100">
    //         <Defs>
    //             <Mask id="maskabb" x="0" y="0" height="100%" width="100%">
    //                 <Rect height="100%" width="100%" fill="#B0E0E6" />
    //                 <Circle r="45" cx="50" cy="50" />
    //             </Mask>
    //         </Defs>
    //         <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 1)" mask="url(#maskabb)" fill-opacity="0" />
    //     </Svg>
    // </View>
  );
}

export default SvgComponent;
