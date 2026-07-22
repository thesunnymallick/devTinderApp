import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

interface CommonModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText?: string;
  animation: any;
  onClose: () => void;
}

const CommonModal = ({
  visible,
  title,
  message,
  buttonText = 'Done',
  animation,
  onClose,
}: CommonModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <LottieView
            source={animation}
            autoPlay
            loop={false}
            style={styles.animation}
          />

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modal: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: Colors.white,
    padding: 24,
    alignItems: 'center',
  },

  animation: {
    width: 140,
    height: 140,
  },

  title: {
    marginTop: 8,
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },

  message: {
    marginTop: 12,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },

  button: {
    marginTop: 24,
    width: '100%',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});