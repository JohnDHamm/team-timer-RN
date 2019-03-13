import React from 'react';
import { View } from 'react-native';

const Separator = ({ width, color }) => {
  return (
    <View style={{
      width: width,
      height: 1,
      borderColor: 'transparent',
      borderBottomColor: color,
      borderWidth: 1,
      marginBottom: 10,
    }}/>
  )
}

export default Separator;