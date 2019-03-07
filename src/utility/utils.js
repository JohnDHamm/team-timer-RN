import {AsyncStorage} from 'react-native';
import _ from 'lodash'

const Utils = {
  createTeamList: (teamStore) => {
    return _.sortBy(_.map(teamStore), 'name');
  },

};

export default Utils;