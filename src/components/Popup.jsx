import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../constants/Colors';

const Popup = ({visible, onRequestClose, title, children}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}>
    <TouchableOpacity style={styles.modalContainer} onPressOut={onRequestClose}>
      <View style={styles.modalView}>
        <TouchableWithoutFeedback>
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>{title}</Text>
            </View>
            <View style={styles.modalContent}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    overflow: 'hidden',
    minWidth: '75%',
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.stone100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.stone300,
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 16,
  },
});

export {Popup};
