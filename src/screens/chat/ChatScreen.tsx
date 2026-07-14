import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Fonts from '../../theme/fonts'
import Colors from '../../theme/colors'

const ChatScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{
        fontFamily:Fonts.bold,
        color:Colors.primary,
        fontSize:20
      }} >Chat Screen</Text>
    </SafeAreaView>
  )
}

export default ChatScreen