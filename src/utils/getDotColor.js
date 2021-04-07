import { Colors } from '../styles';

function getDotColor(dfc) {
  return dfc
    ? Colors[dfc?.toLowerCase()]
      ? Colors[dfc?.toLowerCase()]
      : 'dfcFallback'
    : 'dfcFallback';
}

export default getDotColor;
