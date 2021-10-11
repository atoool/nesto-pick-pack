import React, { useContext, useEffect } from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Title from '../../components/Title';
import { Colors, Typography } from '../../styles';
import Success1SVG from '../../assets/svg/Success1SVG.svg';
import Success2SVG from '../../assets/svg/Success2SVG.svg';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';

/**
 * Screen for showing success message after initiating substitution
 */
const SubstituteRequestedScreen = ({ navigation }) => {
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
        <Title text={locale?.headings.Substituted} style={styles.title} />
        <View style={styles.successIconBox}>
          <View style={styles.rightIconBox}>
            <Success1SVG width={100} />
          </View>
          <View style={styles.leftIconBox}>
            <Success2SVG width={100} />
          </View>
        </View>
        <View style={styles.statusBox}>
          <Text style={Typography.bold17}>{locale?.SRS_statusTitle}</Text>
          <Text style={styles.statusText}>{locale?.SRS_statusText}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={Typography.bold17}>{locale?.SRS_infoTitle}</Text>
          <Text style={styles.statusText}>{locale?.SRS_infoText}</Text>
        </View>
        <Button
          title={locale?.SRS_button}
          style={styles.button}
          onPress={() => {
            navigation.popToTop();
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
  rightIconBox: { right: -17 },
  leftIconBox: { left: -17 },
  statusBox: {
    alignItems: 'center',
    marginHorizontal: 32,
    marginVertical: 30,
  },
  infoBox: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.offWhite,
  },
  statusText: {
    ...Typography.normal15,
    textAlign: 'center',
    marginTop: 7,
  },
  button: { marginVertical: 30, marginHorizontal: 60 },
});

export default SubstituteRequestedScreen;
