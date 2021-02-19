import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Feather';
import { Typography, Colors } from '../../styles';
import MarkAvailabilitySVG from '../../assets/svg/MarkAvailabilitySVG';
import Title from '../../components/Title';
import { AppContext } from '../../context/AppContext';

const ProfileScreen = ({ navigation }) => {
  const { logOutUser } = useContext(AuthContext);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const onLabelPress = () => {
    navigation.navigate('PrintLabelsScreen', { orderId: null });
  };
  const onStatisticsPress = () => {
    navigation.navigate('StatisticsScreen');
  };
  const onLogOut = async () => {
    Alert.alert(
      '',
      locale?.PS_logoutAlert,
      [
        {
          text: locale?.no,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: locale?.yes,
          onPress: logOutUser,
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Title text={locale?.headings?.profile} />
      <ProfileSection
        name="John Doe"
        email="john@gmail.com"
        phone="+91 8891356128"
      />
      <MarkAvailability title={locale?.P_markAvail} />
      <LinkButton title={locale?.P_statistics} onPress={onStatisticsPress} />
      <LinkButton title={locale?.P_printlabel} onPress={onLabelPress} />
      <LinkButton title={locale?.signout} onPress={onLogOut} />
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
      <View style={styles.profileImageView} />
      <View>
        <Text style={Typography.bold16}>{name}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageView: {
    backgroundColor: 'gray',
    width: 60,
    height: 60,
    borderRadius: 60,
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
