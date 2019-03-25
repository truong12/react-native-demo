import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native'
import styles from './Styles/AuthLoadingScreenStyles'

class AuthLoadingScreen extends Component {
  componentDidMount = async () => {
    await this.loadApp()
  }
  loadApp = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    this.props.navigation.navigate((userToken === '123456789') ? 'App' : 'Auth')
  }

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }
}

export default AuthLoadingScreen
