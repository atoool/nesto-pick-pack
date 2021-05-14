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

const ProfileScreen = ({ navigation: { dispatch } }) => {
  const { logOutUser } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(Constants.emptyEmail);

  const {
    locale: { locale },
  } = useContext(AppContext);

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
      {/* <LinkButton title="Mark availability" topBorder={true} /> */}
      {/* <LinkButton title="My statistics" /> */}
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
