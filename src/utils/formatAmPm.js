function formatAmPm(date) {
  let dt = new Date(date);
  let minutes = dt.getMinutes();
  let hours = dt.getHours();
  let AmPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;
  return hours + ':' + minutes + ' ' + AmPm;
}

export default formatAmPm;
