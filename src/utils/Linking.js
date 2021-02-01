import { Linking as Linker } from "react-native";
import messaging from '@react-native-firebase/messaging';

const config = {
    screens: {
        LoginScreen: "LoginScreen",
        PackNow: "PackNow",
        Picknow: "PickNow",
        Notifications: "Notifications",
        Scan: "Scan",
        History: "History",
        Profile: "Profile",
        PackScreen: "PackScreen",
        ItemScreen: "ItemScreen",
        ItemSuccessScreen: "ItemSuccessScreen",
        PrintLabelsScreen: "PrintLabelsScreen",
        RepickSuccessScreen: "RepickSuccessScreen",
        ScanScreen: "ScanScreen",
        StatisticsScreen: "StatisticsScreen",
        BinAssignScreen: "BinAssignScreen",
        SubstitutesScreen:"SubstitutesScreen",
        SubstitutionDetailsScreen:"SubstitutionDetailsScreen",
        SubstituteRequestedScreen:"SubstituteRequestedScreen",
        StatisticsScreen:"StatisticsScreen",
        ItemListScreen:"ItemListScreen",
        PackCompletedScreen:"PackCompletedScreen",
        PickCompletedScreen:"PickCompletedScreen"
    }
}
export default Linking = {
    prefixes: ["http://com.nesto.store"],
    config,
    async getInitialURL() {
        const url = await Linker.getInitialURL();
  
        if (url != null) {
          return url;
        }
        const message = await messaging().getInitialNotification();
        return message?.data.key_1;
      },
}