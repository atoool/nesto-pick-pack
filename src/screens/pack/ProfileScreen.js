import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Colors } from '../../styles';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';
import ModalComponent from '../../components/ModalComponent';
import { Constants, Storage } from '../../utils';
import TestTouchable from '../../components/TestTouchable';
import { CommonActions } from '@react-navigation/native';
import LinkButton from '../../components/LinkButton';
import MarkAvailability from '../../components/MarkAvailability';
import ProfileSection from '../../components/ProfileSection';
import ShowVersion from '../../components/ShowVersion';

const ProfileScreen = ({ navigation: { dispatch, navigate } }) => {
  const [email, setEmail] = useState(Constants.emptyEmail);
  const [modalVisible, setModalVisible] = useState(false);

  const { logOutUser } = useContext(AuthContext);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onOrderDetailsPress = () => {
    navigate('OrderDetails', { id: '' });
  };

  const onLogOut = () => {
    setModalVisible(false);
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AssignBin',
            params: { screen: 'AssignBinTabScreen', params: { logout: true } },
          },
        ],
      }),
    );
    setTimeout(() => logOutUser(), 500);
  };

  useEffect(() => {
    const onMount = async () => {
      const emailId = await Storage.getEmail();
      setEmail(emailId); //mock
    };
    onMount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title text={locale?.headings?.profile} />
        <TestTouchable>
          <ProfileSection
            name={
              email?.split('@')[0]?.toUpperCase()
                ? email?.split('@')[0]?.toUpperCase()
                : 'John Doe'
            }
            email={email} //mock
            phone="+91 8891356128"
          />
        </TestTouchable>
        <MarkAvailability title={locale?.P_markAvail} />
        <LinkButton
          title={locale?.headings.orderDetails}
          onPress={onOrderDetailsPress}
        />
        {/* <LinkButton title={locale?.P_statistics} onPress={onStatisticsPress} /> */}
        <LinkButton
          title={locale?.signout}
          onPress={() => setModalVisible(true)}
        />
        <ModalComponent
          visible={modalVisible}
          text={locale?.PS_logoutAlert}
          button1Text={locale?.no}
          button2Text={locale?.yes}
          onButton1Press={() => setModalVisible(false)}
          onButton2Press={onLogOut}
        />
      </ScrollView>
      <ShowVersion />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
});

export default ProfileScreen;
