import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'

import HomeScreen from '../Containers/HomeScreen/HomeScreen'
import LoginScreen from '../Containers/LoginScreen/LoginScreen'
import Tabbar1 from '../Containers/Tabbar/Tabbar1'
import Tabbar2 from '../Containers/Tabbar/Tabbar2'
import Tabbar3 from '../Containers/Tabbar/Tabbar3'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen/AuthLoadingScreen'
import Tabbar1Forward from '../Containers/Tabbar1/Tabbar1Forward'
import Tabbar1First from '../Containers/Tabbar1/Tabbar1First'
import Tabbar1Second from '../Containers/Tabbar1/Tabbar1Second'
import CameraRollScreen from '../Containers/CameraRoll/CameraRollScreen';

const Tabbar1FirstNav = createStackNavigator(
  {
    First: Tabbar1First,
    Second: Tabbar1First
  },
  {
    initialRouteName: 'First'
  }
)

const Tabbar1Nav = createSwitchNavigator(
  {
    Tabbar1Forward: Tabbar1Forward,
    Tabbar1First: Tabbar1FirstNav,
    Tabbar1Second: Tabbar1Second
  }
)

function missionStackNavigate (navigation, screenProps) {
  if (navigation.isFocused()) {
    if (screenProps.tabbar1Status === 'first') {
      navigation.navigate('First')
    }
  } else {
    // navigation.navigate('Mission')
    if (screenProps.tabbar1Status === 'first') {
      navigation.navigate('Tabbar1First')
    } else {
      navigation.navigate('Tabbar1Second')
    }
  }
}

const TabbarNav = createBottomTabNavigator(
  {
    Tabbar1: {
      screen: Tabbar1Nav,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarOnPress: () => {
          missionStackNavigate(navigation, screenProps)
        }
      })
    },
    Tabbar2: Tabbar2,
    Tabbar3: Tabbar3
  },
  {
    tabBarOnPress: {
      jumpToIndex: 0
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Tabbar1') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`
          iconName = 'stepforward'
        } else if (routeName === 'Tabbar2') {
          iconName = 'stepforward'
        } else if (routeName === 'Tabbar3') {
          iconName = 'stepforward'
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icon
        return <AntDesign name={iconName} color={tintColor} size={18} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
)

const HomeNav = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen}
  }
)

const AuthStackNav = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen}
  }, {
    headerMode: 'none'
  }
)

const CameraRollNav = createStackNavigator(
  {
    CameraRollScreen: {screen: CameraRollScreen}
  }
)

const App = createStackNavigator(
  {
    TabbarNav: TabbarNav,
    HomeScreen: HomeNav,
    CameraRollScreen: CameraRollNav
  }, {
    mode: 'modal',
    headerMode: 'none'
  }
)

// BEGIN ROOT
const RootNav = createSwitchNavigator(
  {
    AuthLoadingScreen: AuthLoadingScreen,
    Auth: AuthStackNav,
    App: App
  }
)

export default createAppContainer(RootNav)
