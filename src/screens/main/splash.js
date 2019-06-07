import React, { Component } from 'react';
import { View, StyleSheet, Image, Modal } from 'react-native';
import { Font } from 'expo';

import sharedStyles from '../../styles/shared_styles';
import IMAGES from '@assets/images'
import AdModal from '../../components/ad_modal'
import StoreUtils from "../../utility/store_utils";

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAdModal: false
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
      'dosis-regular': require('../../../assets/fonts/Dosis-Regular.ttf'),
      'dosis-medium': require('../../../assets/fonts/Dosis-Medium.ttf'),
      'dosis-light': require('../../../assets/fonts/Dosis-Light.ttf'),
      'dosis-semiBold': require('../../../assets/fonts/Dosis-SemiBold.ttf'),
    });
    setTimeout(() => this.checkAd(), 1500);
  }

  checkAd() {
    StoreUtils.getStore('AdStore')
      .then(res => {
        // console.log("AdStore res:", res);
        const count = (res === null) ? 1 : res.appStarts + 1;
        console.log("count:", count);
        StoreUtils.mergeStore('AdStore', {appStarts: count})
          .then(() => {
            if (count === 1 || count === 5 || (count % 10 === 0)) {
              this.setState({showAdModal: true})
            } else {
              this.props.navigation.navigate('MainApp')
            }
          })
      });
  }

  closeModal() {
    this.setState({showAdModal: false});
    this.props.navigation.navigate('MainApp')
  }


  render(){
    return(
      <View style={styles.container}>
        <Image
          source={IMAGES.TT_LOGO_TITLE_LG}
          style={styles.logo}
        />
        <Modal
          visible={this.state.showAdModal}
          animationType='slide'
          transparent={false}
          onRequestClose={() => this.closeModal()}
        >
          <AdModal
            topText='...lets you add workout discipline and pace info, gives you more real-time feedback, and can export your results?'
            middleImg={IMAGES.TTPRO_AD_TIMER}
            closeModal={() => this.closeModal()}
          />
        </Modal>
      </View>
    )
  }
}

const { DEVICE_WIDTH } = sharedStyles;
const logoWidth = DEVICE_WIDTH * 0.33;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: sharedStyles.COLOR_DARK_BLUE,
	},
  logo: {
	  width: logoWidth,
    height: logoWidth / IMAGES.TT_LOGO_TITLE_ASPECT
  }
});
