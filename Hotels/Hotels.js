import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Main from '../screens/Main';
import HotelSearch from './HotelSearch';
import HotelDetails from './HotelDetails'
import HotelReview from './HotelReview'

const HotelsScreen = createSwitchNavigator({
  Home: Main,
  HotelSearch: HotelSearch,
  HotelDetails: HotelDetails,
  HotelReview: HotelReview 
} , {initialRouteName:'HotelSearch'})

const AppContainer = createAppContainer(HotelsScreen);

class Hotels extends React.Component{

    render() {
        return(
            <AppContainer />
        )
    }
}

export default Hotels;
