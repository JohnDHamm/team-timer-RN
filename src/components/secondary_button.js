import React from 'react';
import {View, Text} from 'react-native'

import sharedStyles from '../styles/shared_styles';

const SecondaryButton = ({ label, color }) => {
  return (
    <View style={{
      borderColor: color,
      borderWidth: 1,
      borderRadius: sharedStyles.DEFAULT_BORDER_RADIUS,
      paddingHorizontal: 15,
      paddingVertical: 5
    }}>
      <Text style={{
        fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
        fontSize: 20,
        color: color
      }}>{label}</Text>
    </View>
  )
}

export default SecondaryButton;