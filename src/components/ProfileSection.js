import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../styles';
import ProfileImageSVG from '../assets/svg/ProfileImageSVG';

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
});
export default ProfileSection;
