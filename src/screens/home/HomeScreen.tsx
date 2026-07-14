import {Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen= () => {
    console.log("Home page Render")
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text >Home Screen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen