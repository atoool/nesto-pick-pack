import { Colors } from '../styles';

function getDotColor(dfc) {
  return dfc
    ? Colors[dfc?.toLowerCase()]
      ? Colors[dfc?.toLowerCase()]
      : Colors.dfcFallback
    : Colors.dfcFallback;
}

export default getDotColor;
