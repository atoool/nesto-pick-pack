import { Colors } from '../styles';

export default function getColorBin(dfc) {
  let color = Colors.dfcFallback;
  const dfcCheck = dfc[0].toLowerCase();
  if (dfcCheck === 'f') {
    color = Colors.frozen;
  } else if (dfcCheck === 'c') {
    color = Colors.chilled;
  } else if (dfcCheck === 'u' || dfcCheck === 'l') {
    color = Colors.dry;
  }
  return color;
}
