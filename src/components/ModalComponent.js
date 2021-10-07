import React, { useState } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Colors, Typography } from '../styles';

/**
 * Modal Component
 */
const ModalComponent = ({
  visible,
  title,
  text,
  button1Text,
  button2Text,
  onButton1Press,
  onButton2Press,
}) => {
  const [highlight, setHighlight] = useState(0);
  React.useEffect(() => {
    visible
      ? StatusBar.setBackgroundColor(Colors.semiTransparent)
      : StatusBar.setBackgroundColor(Colors.WHITE);
  }, [visible]);
  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.row}>
            {onButton1Press && (
              <TouchableHighlight
                style={[styles.openButton]}
                onPressIn={() => setHighlight(1)}
                onPressOut={() => setHighlight(0)}
                onPress={onButton1Press}>
                <Text
                  style={[
                    styles.textStyle,
                    { color: highlight === 1 ? Colors.WHITE : Colors.BLACK },
                  ]}>
                  {button1Text}
                </Text>
              </TouchableHighlight>
            )}
            {onButton2Press && (
              <TouchableHighlight
                style={styles.openButton}
                onPressIn={() => setHighlight(2)}
                onPressOut={() => setHighlight(0)}
                onPress={onButton2Press}>
                <Text
                  style={[
                    styles.textStyle,
                    { color: highlight === 2 ? Colors.WHITE : Colors.BLACK },
                  ]}>
                  {button2Text}
                </Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    position: 'absolute',
    backgroundColor: Colors.semiTransparent,
    height: '100%',
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
  },
  textStyle: {
    ...Typography.bold15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 10,
    textAlign: 'center',
    ...Typography.bold20,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.BLACK,
    ...Typography.normal15,
  },
  row: { flexDirection: 'row' },
});

export default ModalComponent;
