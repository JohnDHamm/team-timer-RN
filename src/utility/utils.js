import _ from 'lodash'
import TimeConversion from './time_conversion'

const Utils = {
  createTeamList: (teamStore) => {
    return _.sortBy(_.map(teamStore), 'name');
  },
  createDisplayTime: (timeMS) => {
    let timeObj = {};
    const time =TimeConversion(timeMS).split('.');
    timeObj.main = time[0];
    timeObj.decimal = time[1];
    return timeObj;
  }

};

export default Utils;
