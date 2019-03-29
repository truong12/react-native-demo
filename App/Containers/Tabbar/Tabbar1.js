import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/TabbarStyles'

class Tabbar1 extends Component {
  tabbar1Press () {
    this.props.navigation.push('HomeScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Tabbar1</Text>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.tabbar1Press()}
          title='Tabbar1 Press'
                />
      </View>
    )
  }
}

export default Tabbar1
