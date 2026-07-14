import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestsScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Request screen</Text>
    </SafeAreaView>
  );
};

export default RequestsScreen;
