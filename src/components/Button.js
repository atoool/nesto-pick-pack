import {React} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.container} onPress>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
  },
});
