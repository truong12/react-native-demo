import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends Component {
  onLogoutPress () {
    // this.props.navigation.navigate('TabbarNav')
    this.props.navigation.navigate('Second')
  }

  onNextPress () {
    this.props.navigation.push('HomeScreen')
  }

  render () {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.titleText}>HomeScreen</Text>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onLogoutPress()}
          title='Logout'
                />
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onNextPress()}
          title='Next'
                />
      </SafeAreaView>
    )
  }
}

export default HomeScreen
