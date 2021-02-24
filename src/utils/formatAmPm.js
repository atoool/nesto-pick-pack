function formatAmPm(date) {
  let dt = new Date(date);
  var minutes = dt.getMinutes();
  var hours = dt.getHours();
  var AmPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + AmPm;
  return strTime;
}

export default formatAmPm;
