import { Colors } from '../styles';

export default function getColorBin(dfc) {
  let color = Colors.dry;
  if (dfc[0].toLowerCase() === 'f') {
    color = Colors.frozen;
  } else if (dfc[0].toLowerCase() === 'c') {
    color = Colors.chilled;
  }
  return color;
}
