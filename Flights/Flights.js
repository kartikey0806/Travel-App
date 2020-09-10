import React from 'react';
import FlightDetails from './FlightDetails';
import FlightSearch from './FlightSearch';
import FlightReview from './FlightReview';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Main from '../screens/Main';
import HotelSearch from '../Hotels/HotelSearch';

import { connect } from 'react-redux';
import { fetchFlights } from '../redux/ActionCreators';
import MyTrips from '../screens/MyTrips';

const mapStateToProps = state => {
  return {
    flights: state.flights
  }
}

const mapDispatchToProps = dispatch => ({
  fetchFlights: () => dispatch(fetchFlights())
})

const FlightsScreen = createSwitchNavigator({
  Home: Home,
  FlightSearch: FlightSearch,
  FlightDetails: FlightDetails,
  FlightReview: FlightReview,
  HotelSearch: HotelSearch
} , {initialRouteName:'FlightSearch'})

const AppContainer = createAppContainer(FlightsScreen);

class Flights extends React.Component{
    
    componentDidMount() {
        this.props.fetchFlights();
    }
      
    render() {
        return(
            <AppContainer />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flights);
