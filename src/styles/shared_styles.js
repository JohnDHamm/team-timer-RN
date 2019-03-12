import React from "react";
import { Dimensions } from 'react-native';

// Get Device Dimensions
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

export default sharedStyles = {

  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,

  // MEASUREMENTS


  // COLORS
  COLOR_GREEN: "#BADA55",
  COLOR_PURPLE: "#6E5EAB",
  COLOR_DARK_BLUE: "#0B163B",
  COLOR_LIGHT_BLUE: "#6A7189",
  COLOR_LIGHT_GRAY: "#CCCCCC",
  COLOR_RED: "#A82F29",
  COLOR_WHITE: "#FFFFFF",



  // FONTS
  FONT_PRIMARY_REGULAR: "dosis-regular",
  FONT_PRIMARY_LIGHT: "dosis-light",
  FONT_PRIMARY_MEDIUM: "dosis-medium",





}