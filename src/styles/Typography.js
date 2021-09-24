import { StyleSheet } from 'react-native';
import Colors from './Colors';

const fontFamily = 'roboto';

export default StyleSheet.create({
  bold30: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: 30,
  },
  bold30White: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily,
  },
  bold26: {
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily,
  },
  normal21: {
    fontSize: 21,
    fontFamily,
  },
  bold21: {
    fontWeight: 'bold',
    fontSize: 21,
    fontFamily,
    color: Colors.BLACK,
  },
  bold20White: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily,
  },
  bold20: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily,
    color: Colors.BLACK,
  },
  normal18: {
    fontSize: 18,
    fontFamily,
  },
  bold17: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily,
  },
  bold17White: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.WHITE,
    fontFamily,
  },
  bold16: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily,
  },
  bold16White: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily,
  },
  bold15: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily,
  },
  normal15: {
    fontSize: 15,
    fontFamily,
  },
  normal14: {
    fontSize: 14,
    fontFamily,
  },
  normal13: {
    fontSize: 13,
    fontFamily,
    color: Colors.BLACK,
  },
  bold13: {
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily,
    color: Colors.BLACK,
  },
  bold13White: {
    fontWeight: 'bold',
    fontSize: 13,
    color: Colors.WHITE,
    fontFamily,
  },
  normal12: {
    fontSize: 12,
    fontFamily,
  },
  normal12White: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily,
  },
  h4: {
    fontSize: 20,
    fontFamily,
  },
  h5: {
    fontSize: 18,
    fontFamily,
  },
  h6: {
    fontSize: 18,
    fontFamily,
  },
  body: {
    fontSize: 16,
    fontFamily,
  },
  buttonTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily,
  },
  timeLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondaryRed,
    fontFamily,
  },
  bottomSheetHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily,
    color: Colors.BLACK,
  },
});
