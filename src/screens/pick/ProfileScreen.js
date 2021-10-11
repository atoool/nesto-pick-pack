import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Colors } from '../../styles';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';
import ModalComponent from '../../components/ModalComponent';
import { Constants, Storage } from '../../utils';
import { CommonActions } from '@react-navigation/native';
import TestTouchable from '../../components/TestTouchable';
import LinkButton from '../../components/LinkButton';
import ProfileSection from '../../components/ProfileSection';
import MarkAvailability from '../../components/MarkAvailability';
import ShowVersion from '../../components/ShowVersion';

/**
 * Profile screen (user info anf app version is showed here).
 */
const ProfileScreen = ({ navigation: { dispatch, navigate } }) => {
  const { logOutUser } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(Constants.emptyEmail);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onOrderDetailsPress = () => {
    navigate('OrderDetails', { id: '' });
  };

  /**
   * While logging out, routes are reset, so that when logged in immediately,
   * default home screen is showed instead of profile screen.
   */
  const onLogOut = () => {
    setModalVisible(false);
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Pick now',
            params: { screen: 'PickScreen', params: { logout: true } },
          },
        ],
      }),
    );
    setTimeout(() => logOutUser(), 500);
  };

  useEffect(() => {
    const onMount = async () => {
      const emailId = await Storage.getEmail();
      setEmail(emailId);
    };
    onMount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.profile} />
      <TestTouchable>
        <ProfileSection
          name={
            email?.split('@')[0]?.toUpperCase()
              ? email?.split('@')[0]?.toUpperCase()
              : 'John Doe'
          }
          email={email}
          phone="+91 8891356128"
        />
      </TestTouchable>
      <MarkAvailability title={locale?.P_markAvail} />
      <LinkButton
        title={locale?.headings.orderDetails}
        onPress={onOrderDetailsPress}
      />
      <LinkButton
        title={locale?.signout}
        onPress={() => setModalVisible(true)}
      />
      <ShowVersion />
      <ModalComponent
        visible={modalVisible}
        text={locale?.PS_logoutAlert}
        button1Text={locale?.no}
        button2Text={locale?.yes}
        onButton1Press={() => setModalVisible(false)}
        onButton2Press={onLogOut}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
});

export default ProfileScreen;
