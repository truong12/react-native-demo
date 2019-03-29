import React, { Component } from 'react'
import { View, Text, ImagePickerIOS, ImageEditor } from 'react-native'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/ImagePickerScreenStyles'

class ImagePickerScreen extends Component {
  onTapImagePicker () {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      console.log(imageUri)
      this.setState({ image: imageUri })

      let cropData = {
        offset: {x: 0, y: 0},
        size: {width: 20, height: 20}
    //  displaySize:{width:20, height:20}, THESE 2 ARE OPTIONAL.
    //
      }
      ImageEditor.cropImage(imageUri,
        cropData, (successURI) => {
          console.log(successURI)
        },
        (error) => { console.log('cropImage,', error) }
    )
    }, error => console.error(error))
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>ImagePickerScreen</Text>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => this.onTapImagePicker()}
          title='Image Picker' />
      </View>
    )
  }
}

export default ImagePickerScreen
