import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Typography, Colors } from '../../styles';

const ProfileScreen = ({navigation}) => {
  const { logOutUser } = useContext(AuthContext);
  const onLabelPress=()=>{
navigation.navigate('PrintLabelsScreen',{orderId:null})
  }
  return (
    <SafeAreaView>
      <ProfileSection
        name="John Doe"
        email="john@gmail.com"
        phone="+91 8891356128"
      />
      <LinkButton title="Mark availability" topBorder={true} />
      <LinkButton title="My statistics" />
      <LinkButton title="Print label" onPress={onLabelPress} />
      <LinkButton title="Sign out" onPress={logOutUser} />
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
      <Text style={Typography.bold21}>{title}</Text>
    </TouchableOpacity>
  );
};

const ProfileSection = ({ name, email, phone }) => {
  return (
    <View style={styles.profileSectionContainer}>
      <View style={styles.profileImageView} />
      <View>
        <Text>{name}</Text>
        <Text>
          {email} | {phone}
        </Text>
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
  },
});

export default ProfileScreen;
