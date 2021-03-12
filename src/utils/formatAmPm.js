import moment from 'moment-timezone';

export default function formatAmPm(date) {
  var strTime = moment(date).tz('Asia/Dubai').format('hh:mm A');
  return strTime;
}
