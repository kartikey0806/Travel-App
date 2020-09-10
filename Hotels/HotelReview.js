import React, {useState} from 'react';
import {
  TextInput,
  Button,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  CheckBox,
  SafeAreaView,
  Share,
  ScrollView,
  Modal,
  Picker,
  Alert,
} from 'react-native';
import { Icon, Divider, Card, Input, ListItem, Rating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Communications from 'react-native-communications';
import { HOTELS } from '../informations/Hotels';
import { SliderBox } from 'react-native-image-slider-box';

function RenderHotel(props) {
  const hotel = props.hotel;

  const shareHotel = (title, message, url) => {
    Share.share(
    { title: title,
      message: 'Make Your Trip' + ': Checkout my ' + hotel.name + ' Hotel from ' + props.originPoint + " to " + props.destinationPoint + " at a great discount of 20% and just at the cost of ₹ " + hotel.price,
      url: url },
    { dialogTitle: 'Share this Hotel' })
  }

  const shareBooking = (title, message, url) => {
    Share.share(
    { title: title,
      message: 'Make Your Trip' + ': Hey!, Checkout my Booking of ' + hotel.name + ' in ' +  props.destinationPoint + " which I got at a great discount of 20% and just at the cost of ₹ " + hotel.price,
      url: url },
    { dialogTitle: 'Share your Booking' })
  }

  if ( hotel != null ) {
    return (
      <View style={{marginBottom: 51.5}}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'navigate-before' : 'keyboard-backspace'}size={30} onPress={props.navigation} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Review your Hotel</Text>
          <View style={{marginLeft: 120}}>
            <Icon name='share' onPress={() => shareHotel(hotel.name)}/>
          </View>
        </View>
        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

        <ScrollView>
          
          <View style={{alignItems:'flex-start', marginLeft: 15, marginBottom: 5}}>
            <Text style={{fontSize: 19, fontWeight:'bold'}}>{hotel.name}</Text>
            <Rating ratingCount={5} imageSize={10} startingValue={hotel.rating} readonly={true} />
          </View>
          <SliderBox style={{height: 200, width: 340, marginLeft: 10 }} images={hotel.images} />
          <View style={{marginTop: 7, marginLeft: 10, flexDirection:'row'}}>
            <View style={{paddingVertical: 6, borderWidth: 1,borderRadius: 10,  borderColor:'lightblue', width: 60,}}><Text style={{textAlign:'center', fontWeight:'bold'}}>HOTEL</Text></View>
            <View style={{marginLeft: 10, paddingVertical: 6, borderWidth: 1, borderColor:'lightblue', width: 40, backgroundColor:'#dfff', borderRadius: 5}}><Text style={{fontSize: 17, textAlign:'center', fontWeight:'bold'}}>{hotel.rating}<Text style={{fontSize: 14, fontWeight:'normal'}}>/5</Text></Text></View>
            <Text style={{marginLeft: 10, color:'grey', fontWeight:'bold', marginTop: 7}}>Read 170 Reviews</Text>
          </View>

          <ScrollView horizontal={true} style={{marginLeft: 20, marginTop: 10}}>
            <View>
              <Icon name="wifi" style={{opacity:0.7}}/>
              <Text style={{color:'grey', fontSize: 13,}}>Free</Text>
              <Text style={{color:'grey', fontSize: 13,}}>Wi-Fi</Text>
            </View>
            <View style={{marginLeft: 30}}>
              <FontAwesome name="stethoscope" size={24} style={{textAlign:'center', opacity:0.7}}/>
              <Text style={{color:'grey', fontSize: 13,}}>Doctor</Text>
              <Text style={{color:'grey', fontSize: 13,}}>on Call</Text>
            </View>
            <View style={{marginLeft: 30}}>
              <Icon name="restaurant" size={24} style={{textAlign:'center',  opacity:0.7}}/>
              <Text style={{color:'grey', fontSize: 13,}}>Restaurant</Text>
            </View>
            <View style={{marginLeft: 30}}>
              <Icon name="weekend" size={24} style={{textAlign:'center',  opacity:0.7}}/>
              <Text style={{color:'grey', fontSize: 13,}}>Confernce</Text>
              <Text style={{color:'grey', textAlign:'center', fontSize: 13,}}>Room</Text>
            </View>
            <View style={{marginLeft: 30}}>
              <View style={{flexDirection:'row'}}><Icon name="home" size={24} style={{textAlign:'center',  opacity:0.7}}/>
              <FontAwesome name="long-arrow-up" size={18} style={{marginTop: 3}}/></View>
              <Text style={{color:'grey', fontSize: 13,}}>Lawn</Text>
            </View>
            <View style={{marginLeft: 30}}>
              <Icon name="pause" size={23} style={{textAlign:'center',  opacity:0.7}}/>
              <Text style={{color:'grey', fontSize: 13,}}>Elevator</Text>
            </View>
            <View style={{marginLeft: 30, marginTop: 2}}>
              <FontAwesome name="glass" size={20} style={{textAlign:'center',  opacity:0.7}}/>
              <Text style={{color:'grey', fontSize: 13,}}>Bar</Text>
            </View>
            <View style={{marginLeft: 30}}>
              <Text style={{fontSize: 22, textAlign:'center', fontWeight:'bold',  opacity:0.7}}>P</Text>
              <Text style={{color:'grey', fontSize: 13, textAlign:'center'}}>Parking</Text>
            </View>
            <View style={{marginLeft: 30, marginRight: 10}}><TouchableOpacity>
              <Text style={{color:'blue', textAlign:'center', fontWeight:'bold'}}>+ 19</Text>
              <Text style={{color:'blue', fontWeight:'bold'}}>Amenities</Text>
            </TouchableOpacity></View>
          </ScrollView> 

          <View style={{marginTop: 15,}}>
            <View style={{backgroundColor:'#dfff',borderRadius:30, borderWidth: 1, borderColor:'black', paddingVertical: 10, marginHorizontal: 10}}>
              <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 17}}>{props.checkinDate} Sept - {props.checkoutDate} Sept | {props.room} Room | {props.guests} Guests </Text>
            </View>
            <Text style={{fontWeight:'bold', textAlign:'center', marginTop: 7}}>Check-in: <Text style={{fontWeight: '900'}}>1 PM |</Text> Check-out: <Text style={{fontWeight:'900'}}>11 AM</Text></Text>
          </View>
          <Divider style={{marginHorizontal: 10,marginTop: 4,  height: 2}}/>

        </ScrollView>

      </View>
    );
  }   
  else {
    return <View></View>;
  }
}

class HotelReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: HOTELS,
    };
  }

  navigation = () => { this.props.navigation.navigate('HotelSearch')}

  render() {
    const hotelId = this.props.navigation.getParam('hotelId', '');

    return (
      <SafeAreaView style={{marginTop: 30}}>
        <RenderHotel
          hotel = {this.state.hotels[+hotelId]} navigation = {this.navigation}
          checkinDate = {this.props.navigation.state.params.checkinDate} checkoutDate = {this.props.navigation.state.params.checkoutDate}
          room = {this.props.navigation.state.params.rooms} guests = {this.props.navigation.state.params.guests}
        />
      </SafeAreaView>
    );
  }
}

export default HotelReview;
