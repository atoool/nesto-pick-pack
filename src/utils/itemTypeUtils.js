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

export const getFilteredBinList = (binNumberArray = [], dfc = '') => {
  if (dfc === '') {
    return binNumberArray;
  }

  const filteredBins =
    binNumberArray
      ?.map?.((binNum) => ({ binNum, type: getBinType(binNum) }))
      ?.filter?.((bin) => bin.type === dfc?.toLowerCase()) ?? [];

  if ((filteredBins?.length ?? 0) !== 0) {
    return filteredBins?.map?.((bin) => bin?.binNum);
  } else {
    return binNumberArray;
  }
};
