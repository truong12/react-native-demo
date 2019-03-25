import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/Tabbar1Styles'
import { Button } from 'react-native-elements'

class Tabbar1First extends Component {
  state = { }
  onTapNextPress () {
    this.props.navigation.push('Second')
  }
  render () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          textAlign: 'center'
        }}>Tabbar1First</Text>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onTapNextPress()}
          title='Next'
                />
      </View>
    )
  }
}

export default Tabbar1First
