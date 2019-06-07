import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import { WebBrowser } from 'expo'
import sharedStyles from "../styles/shared_styles";
import IMAGES from "../../assets/images";

export default class AdModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  };

  openAppStore() {
    WebBrowser.openBrowserAsync('https://itunes.apple.com/us/app/team-timer-pro/id1458066942?ls=1&mt=8');
  };

  render() {
    return(
      <SafeAreaView
        style={styles.modal}
      >
        <View style={styles.top}>
          <Text style={styles.titleText}>Did you know? </Text>
          <Text style={styles.ttpro}>Team Timer Pro</Text>
        </View>
        {this.props.topText &&
          <View>
            <Text style={styles.text}>{this.props.topText}</Text>
          </View>
        }
        {this.props.middleImg &&
          <Image
            style={styles.middleImg}
            source={this.props.middleImg}
          />
        }
        {this.props.bottomText &&
          <View>
            <Text style={styles.text}>{this.props.bottomText}</Text>
          </View>
        }
        <TouchableOpacity
          onPress={() => this.openAppStore()}>
          <Image
            style={styles.appStore}
            source={IMAGES.APP_STORE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.closeModal()}>
          <Text style={styles.dismiss}>No thanks</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const { DEVICE_WIDTH, DEVICE_HEIGHT } = sharedStyles;
const middleImgHeight = DEVICE_HEIGHT * 0.5;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_PURPLE,
  },
  titleText: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    color: sharedStyles.COLOR_LIGHT_GRAY,
    paddingBottom: 3,
  },
  text: {
    textAlign: 'center',
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    color: sharedStyles.COLOR_LIGHT_GRAY,
    paddingHorizontal: 15,
  },
  ttpro: {
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    fontSize: 30,
    color: sharedStyles.COLOR_GREEN,
  },
  top: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  middleImg: {
    width: middleImgHeight * IMAGES.TTPRO_AD_ASPECT,
    height: middleImgHeight
  },
  appStore: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_WIDTH * 0.6 / IMAGES.APP_STORE_ASPECT
  },
  dismiss: {
    fontFamily: sharedStyles.FONT_PRIMARY_REGULAR,
    fontSize: 20,
    color: sharedStyles.COLOR_GREEN,
    paddingBottom: 40
  }
});
