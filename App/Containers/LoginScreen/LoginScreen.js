import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View,
    Text,
    TextInput,
    AsyncStorage
} from 'react-native'
import { Button } from 'react-native-elements'
import React, { Component } from 'react'
import styles from './Styles/LoginScreenStyles'

class LoginScreen extends Component {
  onFbLoginPress () {

  }

  signIn = async () => {
    await AsyncStorage.setItem('userToken', '123456789')
    this.props.navigation.navigate('AuthLoadingScreen')
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior='padding'>

        <TouchableWithoutFeedback>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Instamobile</Text>
              <TextInput placeholder='Username' placeholderColor='#c4c3cb' style={styles.loginFormTextInput} />
              <TextInput placeholder='Password' placeholderColor='#c4c3cb' style={styles.loginFormTextInput} secureTextEntry />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.signIn()}
                title='Login'
                />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onFbLoginPress()}
                title='Login with Facebook'
                loading
                />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

export default LoginScreen
