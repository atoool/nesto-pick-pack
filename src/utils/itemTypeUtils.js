import { Colors } from '../styles';

const DRY = 'dry';
const FROZEN = 'frozen';
const CHILLED = 'chilled';

const getBinType = (binNumber) => {
  const startingChar = binNumber?.[0]?.toLowerCase() ?? '';
  if (startingChar === 'u' || startingChar === 'l' || startingChar === 'd') {
    return DRY;
  } else if (startingChar === 'f') {
    return FROZEN;
  } else if (startingChar === 'c') {
    return CHILLED;
  } else {
    return '';
  }
};

export const filterBinsByDFC = (binNumber, dfc) =>
  getBinType(binNumber ?? '') === dfc?.toLowerCase();

export function getColorBin(binNumber) {
  const binType = getBinType(binNumber);
  let color = Colors.dfcFallback;
  if (binType === FROZEN) {
    color = Colors.frozen;
  } else if (binType === CHILLED) {
    color = Colors.chilled;
  } else if (binType === DRY) {
    color = Colors.dry;
  }
  return color;
}

export const getDotColor = (dfc) =>
  Colors[dfc !== '' ? dfc?.toLowerCase() ?? 'dfcFallback' : 'dfcFallback'];
