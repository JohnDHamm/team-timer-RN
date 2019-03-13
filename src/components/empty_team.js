import React from 'react';
import {View, Text, Image} from 'react-native'

import IMAGES from '@assets/images';
import sharedStyles from '../styles/shared_styles';

const EmptyTeam = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: 85, height: 85 / IMAGES.EMPTY_TEAM_ASPECT, marginBottom: 10}}
        source={IMAGES.EMPTY_TEAM_MED}
        />
      <Text style={{
        fontFamily: sharedStyles.FONT_PRIMARY_LIGHT,
        fontSize: 25,
        color: sharedStyles.COLOR_RED
      }}>
        Your team is empty!
      </Text>
    </View>
  )
}

export default EmptyTeam;
