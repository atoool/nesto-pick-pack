import React, { useContext, useEffect } from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Title from '../../components/Title';
import { Colors, Typography, width } from '../../styles';
import Success1SVG from '../../assets/svg/Success1SVG.svg';
import Success2SVG from '../../assets/svg/Success2SVG.svg';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';

const SubstituteRequestedScreen = ({ navigation }) => {
  const {
    locale: { locale },
  } = useContext(AppContext);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView>
        <Title
          text={locale?.headings.Substituted}
          style={{ borderBottomWidth: 0, alignSelf: 'center' }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View style={{ right: -17 }}>
            <Success1SVG width={100} />
          </View>
          <View style={{ left: -17 }}>
            <Success2SVG width={100} />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 32,
            marginVertical: 30,
          }}>
          <Text style={Typography.bold17}>{locale?.SRS_statusTitle}</Text>
          <Text
            style={[
              Typography.normal15,
              { textAlign: 'center', marginTop: 7 },
            ]}>
            {locale?.SRS_statusText}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            padding: 32,
            backgroundColor: Colors.offWhite,
          }}>
          <Text style={Typography.bold17}>{locale?.SRS_infoTitle}</Text>
          <Text
            style={[
              Typography.normal15,
              { textAlign: 'center', marginTop: 7 },
            ]}>
            {locale?.SRS_infoText}
          </Text>
        </View>
        <Button
          title={locale?.SRS_button}
          style={{ marginVertical: 30, marginHorizontal: 60 }}
          onPress={() => {
            navigation.popToTop();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubstituteRequestedScreen;
