import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Typography } from '../styles';

const DropDown = ({
  showDropDown,
  onShowDropDown,
  index,
  issue,
  list,
  onSetIssue,
}) => {
  return (
    <View style={styles.dropDefaultBox}>
      <TouchableWithoutFeedback
        onPress={() => {
          onShowDropDown(!showDropDown[index], index);
        }}>
        <View style={styles.dropDefaultItemBox}>
          <Text style={styles.dropDefaultItemText}>{issue[index]}</Text>
        </View>
      </TouchableWithoutFeedback>
      {showDropDown[index] && (
        <View style={styles.dropListBox}>
          {list.map((elem, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                onSetIssue(elem.value, index);
              }}
              style={styles.dropTouch}>
              <View
                style={[
                  styles.dropListItemBox,
                  elem.value === issue[index] && {
                    backgroundColor: Colors.offWhite,
                  },
                ]}>
                <Text style={styles.dropLabelText}>{elem.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDefaultBox: { alignSelf: 'flex-end', marginBottom: 10 },
  dropListItemBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    zIndex: 20,
  },
  dropLabelText: {
    paddingLeft: 30,
    width: '100%',
    ...Typography.norma13,
  },
  dropTouch: { height: 50, width: '100%', zIndex: 20 },
  dropListBox: {
    position: 'absolute',
    elevation: 10,
    backgroundColor: Colors.WHITE,
    width: 190,
    height: 'auto',
    alignSelf: 'center',
    marginTop: 40,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    zIndex: 20,
  },
  dropDefaultItemText: {
    textAlignVertical: 'center',
    height: '100%',
    marginLeft: 35,
    ...Typography.bold13,
  },
  dropDefaultItemBox: {
    borderColor: Colors.primary4,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 40,
    width: 200,
  },
});

export default DropDown;
