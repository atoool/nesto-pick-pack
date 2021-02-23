import { Linking as Linker } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const config = {
  screens: {
    LoginScreen: 'LoginScreen',
    PackNow: {
      initialRouteName: 'PackScreen',
      screens: {
        PackScreen: { path: 'PackScreen/:index', parse: { index: Number } },
        ItemListScreen: 'PackNow/ItemListScreen',
        ItemScreen: { path: 'PackNow/ItemScreen/:item' },
        ItemSuccessScreen: 'PackNow/ItemSuccessScreen',
        PackCompletedScreen: 'PackNow/PackCompletedScreen',
        PrintLabelsScreen: 'PackNow/PrintLabelsScreen',
        RepickSuccessScreen: 'PackNow/RepickSuccessScreen',
        ScanScreen: 'PackNow/ScanScreen',
        StatisticsScreen: 'PackNow/StatisticsScreen',
        BinAssignScreen: 'PackNow/BinAssignScreen',
        Browser: { path: 'PackNow/Browser/:src', parse: { src: String } },
      },
    },
    Picknow: {
      initialRouteName: 'PickScreen',
      screens: {
        PickScreen: 'PickScreen',
        ItemScreen: { path: 'PickNow/ItemScreen/:item' },
        ItemSuccessScreen: 'PickNow/ItemSuccessScreen',
        PickCompletedScreen: 'PickNow/PickCompletedScreen',
        SubstituteRequestedScreen: 'PickNow/SubstituteRequestedScreen',
        ScanScreen: 'PickNow/ScanScreen',
        StatisticsScreen: 'PickNow/StatisticsScreen',
        SubstitutesScreen: 'PickNow/SubstitutesScreen',
        SubstitutionDetailsScreen: 'PickNow/SubstitutionDetailsScreen',
        Browser: { path: 'PickNow/Browser/:src', parse: { src: String } },
      },
    },
    Notifications: 'Notifications',
    Scan: 'Scan',
    History: 'History',
    Drop: 'Drop',
    AssignBin: {
      screens: {
        PrintLabelsScreen: 'AssignBin/PrintLabelsScreen',
        BinAssignScreen: 'AssignBin/BinAssignScreen',
      },
    },
    Profile: {
      screens: {
        PrintLabelsScreen: 'Profile/PrintLabelsScreen',
        BinAssignScreen: 'Profile/BinAssignScreen',
        StatisticsScreen: 'Profile/StatisticsScreen',
      },
    },
  },
};
const Linking = {
  prefixes: ['http://com.nesto.store'],
  config,
  async getInitialURL() {
    const url = await Linker.getInitialURL();

    if (url != null) {
      return url;
    }
    const message = await messaging().getInitialNotification();
    return message?.data.key_1;
  },
};
export default Linking;
