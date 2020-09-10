import React from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { Icon, Divider, Card } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { FLIGHTS } from '../informations/Flights';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import { deleteBooking } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
    deleteBooking: (flightId) => dispatch(deleteBooking(flightId))
})

const mapStateToProps = state => {
    return {
      flights: state.flights,
      bookings: state.bookings
    }
  }


class MyTrips extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            flights: FLIGHTS
        }
    }

    static navigationOptions = {
        title: 'My Trips',
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="suitcase" size={28} iconStyle={{color: tintColor}} />
        ),
      };

    render() {
        const renderMenuItem = ({item, index}) => {
            const rightButton = [{
                text: 'Cancel', 
                type: 'delete',
                onPress: () => {
                  Alert.alert(
                  'CANCEL BOOKING ',
                  'Are you sure you want to cancel your Flight booking to Mumbai ?',
                  [{ text: 'Cancel' },
                  { text: 'OK', onPress: () => this.props.deleteBooking(item.id) }],
                  { cancelable: false }
                  )}
              }];
        
        
        if (item.name==='Indigo') {
        return (
            <Swipeout right={rightButton} autoClose={true}>
            <View style={{borderColor:'black', borderWidth: 0.8, marginHorizontal: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../images/indigo.png')} style={{width: 35, height: 30}}/>
                    <Text style={{fontSize: 20, marginLeft: 5, marginTop: 2, fontWeight:'bold'}}>{item.name} | <Text style={{fontSize: 16, color:'grey'}}>{item.number} | <Text style={{color:'black', fontSize: 14}}>TripId: 817482423</Text> </Text></Text>
                </View>
                <View>
                    <Text>{item.departTime} - {item.reachTime}</Text>
                </View>
            </View>
            </Swipeout>
            );        
        }
        if (item.name==='Vistara') {
            return (
                <Swipeout right={rightButton} autoClose={true}>
                <View style={{borderColor:'black', borderWidth: 0.8, marginHorizontal: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../images/vistara.png')} style={{width: 35, height: 30}}/>
                        <Text style={{fontSize: 20, marginLeft: 5, marginTop: 2, fontWeight:'bold'}}>{item.name} | <Text style={{fontSize: 16, color:'grey'}}>{item.number} | <Text style={{color:'black', fontSize: 14}}>TripId: 817482423</Text> </Text></Text>
                    </View>
                    <View>
                        <Text>{item.departTime} - {item.reachTime}</Text>
                    </View>
                </View>
                </Swipeout>
            );        
        }
        if (item.name==='Air India') {
            return (
                <Swipeout right={rightButton} autoClose={true}>
                <View style={{borderColor:'black', borderWidth: 0.8, marginHorizontal: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../images/AirIndiaLogo.png')} style={{width: 35, height: 30}}/>
                        <Text style={{fontSize: 20, marginLeft: 5, marginTop: 2, fontWeight:'bold'}}>{item.name} | <Text style={{fontSize: 16, color:'grey'}}>{item.number} | <Text style={{color:'black', fontSize: 14}}>TripId: 817482423</Text> </Text></Text>
                    </View>
                    <View>
                        <Text>{item.departTime} - {item.reachTime}</Text>
                    </View>
                </View>
                </Swipeout>
                );        
            }
        if (item.name==='SpiceJet') {
            return (
                <Swipeout right={rightButton} autoClose={true}>
                <View style={{borderColor:'black', borderWidth: 0.8, marginHorizontal: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../images/spicejet.png')} style={{width: 35, height: 30}}/>
                        <Text style={{fontSize: 20, marginLeft: 5, marginTop: 2, fontWeight:'bold'}}>{item.name} | <Text style={{fontSize: 16, color:'grey'}}>{item.number} | <Text style={{color:'black', fontSize: 14}}>TripId: 817482423</Text> </Text></Text>
                    </View>
                    <View>
                        <Text>{item.departTime} - {item.reachTime}</Text>
                    </View>
                </View>
                </Swipeout>
            );        
        }
        else {
            return (
                <Swipeout right={rightButton} autoClose={true}>
                <View style={{borderColor:'black', borderWidth: 0.8, marginHorizontal: 10, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../images/goAir.png')} style={{width: 35, height: 30}}/>
                        <Text style={{fontSize: 20, marginLeft: 5, marginTop: 2, fontWeight:'bold'}}>{item.name} | <Text style={{fontSize: 16, color:'grey'}}>{item.number} | <Text style={{color:'black', fontSize: 14}}>TripId: 817482423</Text> </Text></Text>
                    </View>
                    <View>
                        <Text>{item.departTime} - {item.reachTime}</Text>
                    </View>
                </View>
                </Swipeout>
            );        
        }
    };

        if ( this.props.bookings.length === 0 ) {
            return(
                <View>
                    <Text style={{fontSize: 25, marginTop: 30, marginLeft: 20, fontWeight:'bold'}}>My Trips</Text>
                    <Divider style={{marginHorizontal: 10, height: 2, marginVertical: 10}}/>
                    <Text style={{fontSize: 18, marginTop: 5, textAlign:'center', marginBottom: 20}}>Oops! , Looks like you have no Upcoming Trips</Text>
                    <View style={{marginHorizontal: 30, borderRadius: 100, padding: 20, backgroundColor:'#dfff', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={{fontSize: 20}}>Make your Trips Now!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } 
        else {
        return (
            <View style={{backgroundColor:'#dfff', height: 1000}}>
                <Text style={{fontSize: 25, marginTop: 25, marginLeft: 20, fontWeight:'bold'}}>My Trips</Text>
                <Divider style={{marginHorizontal: 10, height: 2, marginVertical: 10}}/>
                <FlatList 
                    data={this.state.flights.filter(flight => this.props.bookings.some(el => el === flight.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTrips);
