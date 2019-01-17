const TimeConversion = (ms) => {
  const hours = Math.floor( ms / 1000 / 60 / 60 );
  // console.log("hours", hours);
  const minutes = Math.floor(ms / 1000 / 60) - ( hours * 60 );
  // console.log("minutes", minutes);
  const seconds = (( ms / 1000) - (hours * 60 * 60) - (minutes * 60)).toFixed(1);
  // console.log("seconds", seconds);
  let MM = minutes.toString();
  let SS = seconds.toString();
  if (seconds < 10) {
    SS = `0${seconds}`
  }
  if (hours !== 0) {
    if (minutes < 10) {
      MM = `0${minutes}`;
    }
    return `${hours.toString()}:${MM}:${SS}`
  } else {
    return `${MM}:${SS}`
  }
};

export default TimeConversion;