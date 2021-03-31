import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Feather';
import { Typography, Colors } from '../../styles';
import MarkAvailabilitySVG from '../../assets/svg/MarkAvailabilitySVG';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';
import ModalComponent from '../../components/ModalComponent';
import ProfileImageSVG from '../../assets/svg/ProfileImageSVG';
import { Constants, Storage } from '../../utils';
import TestTouchable from '../../components/TestTouchable';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState(Constants.emptyEmail);
  const [modalVisible, setModalVisible] = useState(false);

  const { logOutUser } = useContext(AuthContext);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onStatisticsPress = () => {
    navigation.navigate('StatisticsScreen');
  };
  const onLogOut = async () => {
    setModalVisible(false);
    await logOutUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AssignBin' }],
      }),
    );
  };

  useEffect(() => {
    const onMount = async () => {
      const emailId = await Storage.getEmail();
      setEmail(emailId); //mock
    };
    onMount();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
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
    </SafeAreaView>
  );
};

const LinkButton = ({ title, topBorder, onPress }) => {
  const borderStyle = {
    borderTopWidth: topBorder ? 1 : 0,
  };
  return (
    <TouchableOpacity
      style={[styles.linkButton, borderStyle]}
      onPress={onPress}>
      <Text style={[styles.linkButtonText, Typography.bold21]}>{title}</Text>
      <Icon
        name={'chevron-right'}
        size={24}
        color="#18191F"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const MarkAvailability = ({ topBorder, title }) => {
  const borderStyle = {
    borderTopWidth: topBorder ? 1 : 0,
  };
  return (
    <TouchableOpacity style={[styles.linkButton, borderStyle]}>
      <Text style={[styles.linkButtonText, Typography.bold21]}>{title}</Text>
      <MarkAvailabilitySVG />
    </TouchableOpacity>
  );
};

const ProfileSection = ({ name, email, phone }) => {
  return (
    <View style={styles.profileSectionContainer}>
      <View style={styles.profileImageView}>
        <ProfileImageSVG />
      </View>
      <View>
        <Text style={Typography.bold16}>{name}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageView: {
    // backgroundColor: Colors.secondaryGray,
    width: 60,
    height: 60,
    marginLeft: 0,
    marginRight: 20,
  },
  profileSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 32,
    paddingVertical: 20,
  },
  linkButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: '#DFDEDE',
    flexDirection: 'row',
  },
  linkButtonText: {
    flex: 1,
  },
});

export default ProfileScreen;
