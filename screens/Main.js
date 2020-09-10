import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './Home';
import Wallet from './Wallet';
import CustomDrawer from '../CustomDrawer';
import Offers from './Offers';
import MyTrips from './MyTrips';
import TripIdeas from './TripIdeas';
import Flights from '../Flights/Flights';
import Hotels from '../Hotels/Hotels';

const Switch = createSwitchNavigator({
  Home: Home,
  Flights: Flights,
  Hotels: Hotels
},{initialRouteName: 'Home'})

const Navigator = createBottomTabNavigator({
  Home: {screen: Home },
  MyTrips: MyTrips ,
  Offers: Offers, 
  TripIdeas: TripIdeas, 
  Wallet: {screen: Wallet}
},{ tabBarOptions: {
      inactiveBackgroundColor: '#403e39', activeBackgroundColor: '#403e39',
      inactiveTintColor: 'grey', activeTintColor: '#5a84e6'
}});

const DrawerNavigator = createDrawerNavigator({ 
  Main: Navigator,
},{contentComponent: CustomDrawer })

const Mains = createSwitchNavigator({
  A: DrawerNavigator,
  B: Switch
});
 
const AppContainer = createAppContainer(Mains);

export default class Main extends React.Component {
  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : 0 }}>
        <AppContainer />
      </View>
    );
  }
}
