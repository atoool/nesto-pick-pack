import React, { useContext, useEffect } from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Title from '../../components/Title';
import { Colors, Typography } from '../../styles';
import Success1SVG from '../../assets/svg/Success1SVG.svg';
import Success2SVG from '../../assets/svg/Success2SVG.svg';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';

/**
 * Screen for showing successful message when re-pick is requested
 */
const RepickSuccessScreen = ({ navigation }) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  useEffect(() => {
    const disableBack = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      disableBack.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title text={locale?.success} style={styles.title} />
        <View style={styles.successIconBox}>
          <View style={styles.successIcon1}>
            <Success1SVG width={100} />
          </View>
          <View style={styles.successIcon2}>
            <Success2SVG width={100} />
          </View>
        </View>
        <View style={styles.statusBox}>
          <Text style={Typography.bold17}>{locale?.RSS_statusTitle}</Text>
          <Text style={styles.statusText}>{locale?.RSS_statusText}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={Typography.bold17}>{locale?.RSS_infoTitle}</Text>
          <Text style={styles.infoText}>{locale?.RSS_infoText}</Text>
        </View>
        <Button
          title={locale?.RSS_button}
          style={styles.button}
          onPress={() => {
            navigation.pop(2);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  title: { borderBottomWidth: 0, alignSelf: 'center' },
  successIconBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  successIcon1: { right: -17 },
  successIcon2: { left: -17 },
  statusBox: {
    alignItems: 'center',
    marginHorizontal: 32,
    marginVertical: 30,
  },
  statusText: { ...Typography.normal15, textAlign: 'center', marginTop: 7 },
  infoBox: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.offWhite,
  },
  infoText: { ...Typography.normal15, textAlign: 'center', marginTop: 7 },
  button: { marginVertical: 30, marginHorizontal: 60 },
});

export default RepickSuccessScreen;
