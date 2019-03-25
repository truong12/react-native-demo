import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Tabbar1Second extends Component {
  state = { }
  render () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          textAlign: 'center'
        }}>Tabbar1Second</Text>
      </View>
    )
  }
}

export default Tabbar1Second
