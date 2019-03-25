import React, { Component } from 'react'
import { SafeAreaView, Text, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/TabbarStyles'

class Tabbar3 extends Component {
  tabbar3Press () {
    this.signOut()
  }

  signOut = async () => {
    await AsyncStorage.setItem('userToken', '')
    this.props.navigation.navigate('AuthLoadingScreen')
  }

  render () {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.titleText}>Tabbar3</Text>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.tabbar3Press()}
          title='Tabbar3 Press'
                />
      </SafeAreaView>
    )
  }
}

export default Tabbar3
