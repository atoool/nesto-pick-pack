import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text>Pick: ProfileScreen</Text>
      <TouchableOpacity onPress={logOutUser}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
