import React, { Component } from 'react'
import { Text, View, Dimensions, Image, Animated, PanResponder, CameraRoll, PermissionsAndroid } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class CameraRollScreen extends Component {
  state = {
    photos: []
  }

  constructor () {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      photos: []
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
        ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }
  componentDidMount = async () => {
    // Android
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       'title': 'Access Storage',
    //       'message': 'Access Storage for the pictures'
    //     }
    //   )
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     CameraRoll.getPhotos({
    //       first: 20,
    //       assetType: 'Photos'
    //     }).then(r => {
    //       console.log(r)
    //       this.setState({ photos: r.edges })
    //     }).catch((err) => {
    //             // Error Loading Images
    //       console.log(err)
    //     })
    //   } else {
    //     console.log('Storage permission denied')
    //   }
    // } catch (err) {
    //   console.warn(err)
    // }

    // iOS
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
      groupTypes: 'All'
    }).then(r => {
      console.log(r)
      this.setState({ photos: r.edges })
    }).catch((err) => {
            // Error Loading Images
      console.log(err)
    })

    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderUsers = () => {
    return this.state.photos.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null
      } else if (i === this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.node.image.uri} style={[this.rotateAndTranslate, { height: '100%', width: '100%', padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{ uri: item.node.image.uri }} />

          </Animated.View>
        )
      } else {
        return (
          <Animated.View

            key={item.node.image.uri} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: '100%',
              width: '100%',
              padding: 10,
              position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{ uri: item.node.image.uri }} />

          </Animated.View>
        )
      }
    }).reverse()
  }

    //   render () {
    //     return (
    //       <View style={{ flex: 1 }}>
    //         <View style={{ height: 60 }} />
    //         <View style={{ flex: 1 }}>
    //           {this.state.photos.length > 0 && this.renderUsers()}
    //         </View>
    //         <View style={{ height: 60 }} />

    //       </View>

    //     )
    //   }

  _renderItem ({ item, index }, parallaxProps) {
    console.log(item)
    return (

      <View style={{
        width: '100%',
        height: '100%',
        padding: 10
      }}>
        {/* <ParallaxImage
          source={{ uri: item.node.image.uri }}
          containerStyle={{ flex: 1, resizeMode: 'cover', borderRadius: 20 }}
          style={{ flex: 1, resizeMode: 'cover', borderRadius: 20 }}
          parallaxFactor={0.4}
          {...parallaxProps}
                /> */}

        <Image
          source={{ uri: item.node.image.uri }}
          style={{ flex: 1, resizeMode: 'cover', borderRadius: 20 }}
        />
      </View>
    )
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <Carousel
          data={this.state.photos}
          renderItem={this._renderItem}
          hasParallaxImages
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH} />
        <View style={{ height: 40 }} />

      </View>

    )
  }
}

export default CameraRollScreen
