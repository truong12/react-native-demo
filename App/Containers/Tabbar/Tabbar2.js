import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
// Redux
import Tabbar1Action from '../../Redux/Tabbar1Redux/Tabbar1Redux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/TabbarStyles'

class Tabbar2 extends Component {
  tabbar2Press () {
    this.props.navigation.push('HomeScreen')
  }

  tabbar1Fist = async () => {
    await AsyncStorage.setItem('tabbar1Status', 'first')
    this.props.tabbar1Status('first')
  }

  tabbar1Second = async () => {
    await AsyncStorage.setItem('tabbar1Status', 'second')
    this.props.tabbar1Status('second')
  }

  onTapCameraRoll = () => {
    this.props.navigation.push('CameraRollScreen')
  }

  onTapImagePicker = () => {
    this.props.navigation.push('ImagePickerScreen')
  }

  onTapGooglePlaces () {
    this.props.navigation.push('GooglePlacesAutocompleteScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Tabbar2</Text>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.tabbar2Press()}
          title='Tabbar2 Press'
        />
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.tabbar1Fist()}
          title='Tabbar 1 First'
        />
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.tabbar1Second()}
          title='Tabbar 1 Second'
        />

        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onTapCameraRoll()}
          title='Camera Roll'
        />

        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onTapImagePicker()}
          title='ImagePicker'
        />

        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onTapGooglePlaces()}
          title='Google Places'
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
  tabbar1Status: (tabbar1Status) => dispatch(Tabbar1Action.tabbar1Status(tabbar1Status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabbar2)
