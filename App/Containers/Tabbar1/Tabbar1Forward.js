import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    AsyncStorage
} from 'react-native'
import styles from './Styles/Tabbar1Styles'

// Redux
import Tabbar1Action from '../../Redux/Tabbar1Redux/Tabbar1Redux'
import { connect } from 'react-redux'

class Tabbar1Forward extends Component {
  componentDidMount = async () => {
    await this.loadApp()
  }

  loadApp = async () => {
    const tabbar1Status = await AsyncStorage.getItem('tabbar1Status')
    this.props.navigation.navigate((tabbar1Status === 'first') ? 'Tabbar1First' : 'Tabbar1Second')
    this.props.tabbar1Status(tabbar1Status)
  }

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
  tabbar1Status: (tabbar1Status) => dispatch(Tabbar1Action.tabbar1Status(tabbar1Status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabbar1Forward)
