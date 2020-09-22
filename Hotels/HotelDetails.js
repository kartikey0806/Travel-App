import React from 'react';
import { View, Text, TouchableOpacity, Platform, Image, FlatList, Modal, StyleSheet, Dimensions } from 'react-native';
import { Icon, Divider, Card, Rating } from 'react-native-elements';
import { HOTELS } from '../informations/Hotels';
import { SliderBox } from 'react-native-image-slider-box';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class HotelDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hotels: HOTELS,
      showModal: false,
      location: null
    }
  }

  toggleModal() { this.setState({showModal: !this.state.showModal}) }

    render() {
      const { navigate } = this.props.navigation;
      const renderMenuItem = ({ item, index }) => {

    return (
    <View>

      <TouchableOpacity onPress={() => this.props.navigation.navigate('HotelReview',{hotelId: item.id,
        rooms: this.props.navigation.state.params.rooms, nights: this.props.navigation.state.params.nights,
        checkinDate: this.props.navigation.state.params.checkinDate, checkoutDate: this.props.navigation.state.params.checkoutDate,
        destination: this.props.navigation.state.params.destination,
        guests: this.props.navigation.state.params.guests  })}>
      <Card>
        <SliderBox
          style={{height: 150, width: 300}}
          images={item.images}
        />
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold', fontSize: 18, marginTop: 5}}>{item.name}</Text>
          <Rating ratingCount={5} style={{marginTop: 11, marginLeft: 5}} 
            imageSize={12} startingValue={item.rating} readonly={true} />
        </View>
        <View style={{flexDirection:'row'}}>
          <View>
            <Text style={{fontSize: 13}}>Safety and Hygienic Stays</Text>
            <View style={{flexDirection:'row', opacity:0.7,}}>
              <Icon name="check" size={16} color='blue'/>
              <Text style={{marginLeft: 3, color:'blue', fontSize: 13}}>Brekfast Included</Text>
            </View>
          </View>
          <View style={{}}>
            <Text style={{marginLeft: 110, fontWeight:'bold', fontSize: 17}}>₹ {item.price}</Text>
            <Text style={{marginLeft: 100, fontSize: 11, color:'grey'}}>Price Per Night</Text>
          </View>
        </View>
      </Card>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={false} visible={this.state.showModal}>
        <View>
          
          <View style={{ flexDirection: 'row', marginBottom: 1,  backgroundColor:'#dfff' }}><View style={{alignItems: 'flex-start',paddingLeft: 10,paddingTop: 10,}}><Icon name="keyboard-backspace" size={30} onPress={() => { this.toggleModal() }} /></View><Text style={{fontSize: 23,fontWeight: 'bold',paddingTop: 10,paddingLeft: 7,}}>Hotels in{this.props.navigation.state.params.destination}</Text></View>

          <MapView style={styles.mapStyle} region={{latitude: 24.573366, longitude: 73.662798, longitudeDelta: 0.422 / 5, latitudeDelta: 0.422 / 5}}>
            <Marker 
              pinColor="blue"
              description = '₹ 10,641'
              title = 'The Oberoi Udaivilas, Udaipur'
              coordinate = {{ latitude: 24.577617, longitude: 73.672409 }} 
            />
            <Marker 
              pinColor="red"
              description = '₹ 9785'
              title = 'Trident Hotel Udaipur'
              coordinate = {{ longitude: 73.66904 , latitude: 24.577139 }} 
            />
            <Marker
              pinColor='#5648d9'
              description = '₹ 10250'
              title = 'Ananta Resort, Udaipur'
              coordinate = {{ latitude: 24.570701, longitude: 73.626145 }} 
            />
            <Marker
              pinColor="green"
              description = '₹ 14300'
              title = 'The LaLiT Laxmi Vilas Palace '
              coordinate = {{ latitude: 24.593963, longitude: 73.682730  }} 
            />
            <Marker
              pinColor="orange"
              description = '₹ 7800'
              title = 'The Royal Retreat Resort & Spa'
              coordinate = {{ latitude: 24.607070, longitude: 73.646215  }} 
            />
         </MapView>

        </View>
      </Modal>
     

      
    </View>
    );
  };
    
    return(
        <View style={{marginBottom: 180}}>
            
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 20,  }}>
            
            <View style={{alignItems: 'flex-start',paddingLeft: 10,paddingTop: 10,}}>
              <Icon name={Platform.OS==='ios'?"navigate-before":"keyboard-backspace"} size={30} onPress={() => this.props.navigation.navigate('HotelSearch')} />
            </View>
            <View>
              <Text style={{fontSize: 20,fontWeight: 'bold',paddingTop: 10,paddingLeft: 5}}>{this.props.navigation.state.params.destination}</Text>
              <Text style={{paddingLeft: 12, fontWeight:'bold'}}>{this.props.navigation.state.params.checkinDate} - {this.props.navigation.state.params.checkoutDate} Sept | {this.props.navigation.state.params.guests} Guests | {this.props.navigation.state.params.rooms} Rooms </Text></View>

            <TouchableOpacity onPress={() => !this.toggleModal()}>
            <View style={{alignItems:'center',marginTop: 10, backgroundColor:'#dfff', borderWidth: 0.5, borderColor:'grey', marginLeft: 30, paddingLeft: 10, paddingRight: 10, borderRadius: 15}}>
              <FontAwesome name="map-marker" style={{}} size={22}/>
              <Text style={{fontSize: 17, color:'blue', fontWeight:'bold'}}>MAPS</Text>
            </View>
            </TouchableOpacity>

            </View>

          <View style={{ borderTopWidth: 2, borderTopColor:'grey', marginBottom: 6}}>
            <FlatList
              style={{marginTop: 10}}
              data={this.state.hotels}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          </View>
        )
    }
}

export default HotelDetails;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection:'row'
  },
});


{/* <MapView.Marker 
              id={1}
              pinColor = "blue"
              description = {item.price}
              title = 'The Oberoi Udaivilas, Udaipur'
              coordinate = {{ latitude: 24.577617, longitude: 73.672409 }} 
            />
            <MapView.Marker 
              id={2}
              pinColor = "red"
              description = {item.price}
              title = 'Trident Hotel , Udaipur'
              coordinate = {{ longitude: 73.66904 , latitude: 24.577139 }} 
            /> */}



          //   <ScrollView horizontal={true} style={{marginTop: 15}}>
          //   <Image source={require('../images/offer.jpg')} style={styles.image1}/>
          //   <Image source={require('../images/offer.jpg')} style={styles.image2}/>
          // </ScrollView>
