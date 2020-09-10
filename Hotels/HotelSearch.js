import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Picker,
  ScrollView,
  Modal,
  Platform,
  StatusBar,
  Image,
  FlatList
} from 'react-native';
import { Icon, Divider, Card, ListItem, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


export default class HotelSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkinDate: '11',
      checkoutDate: '12',
      showModal: false,
      destination: ' Udaipur',
      rooms: 1,
      adult: 2,
      childrens: 0,
    };
  }

  handleDestination = destination => { this.setState({destination})}
  handleCheckOutDate = checkoutDate => { this.setState({checkoutDate})}
  handleCheckInDate = checkinDate => { this.setState({checkinDate})}

  validateForm = () => {
    if ( this.state.destination.length >= 2 && this.state.checkinDate && this.state.checkoutDate ) {
      return this.setState({ isFormValid: true });
    } else {
      return this.setState({ isFormValid: false });
    }
  };

  toggleModal() { this.setState({showModal: !this.state.showModal}) }
  increaseCount() {this.setState({adult: this.state.adult + 1 })}
  decreaseCount() {this.setState({adult: this.state.adult - 1 })}
  increaseCount1() {this.setState({childrens: this.state.childrens + 1 })}
  decreaseCount1() {this.setState({childrens: this.state.childrens - 1 })}
  increaseCount2() {this.setState({rooms: this.state.rooms + 1 })}
  decreaseCount2() {this.setState({rooms: this.state.rooms - 1 })}

  render() {
    const guests = this.state.adult + this.state.childrens
    const nights = this.state.checkoutDate - this.state.checkinDate
    return (
      <ScrollView style={{ marginTop: 20, backgroundColor: '#dfff', paddingBottom: 150,}}>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{alignItems: 'flex-start',paddingLeft: 10,paddingTop: 10,}}>
            <Icon name={Platform.OS==='ios'?"navigate-before":"keyboard-backspace"} size={30}
             onPress={() => { this.props.navigation.navigate('Home'); }} />
          </View>
          <Text style={{fontSize: 23,fontWeight: 'bold',paddingTop: 10,paddingLeft: 7,}}>
            Hotels, Villas, Apts & More
          </Text>
        </View>
        <Divider style={{marginBottom: 20, height: 2, marginHorizontal: 20}}/>

        <View style={{alignItems:'center'}}>
            <Text style={{color:'grey', fontSize: 17}}>CITY NAME</Text>
            <TextInput placeholder="Destination" style={{fontSize: 20, fontWeight:'bold', marginTop: 10, marginBottom: 5, paddingLeft: 13}}
                value = {this.state.destination}
                onChangeText={this.handleDestination}
            />
        </View>
        <Divider />

        <View style={{ flexDirection: 'row' }}>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.b}>CHECK-IN</Text>
              <DatePicker
                  style={{ width: 15, height: 15, marginLeft: 16, marginTop: 5 }}
                  date={this.state.checkinDate}
                  mode="date"
                  placeholder=""
                  format="DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{ dateInput: { marginLeft: 36, marginTop: 10 }, dateIcon: { marginTop: 10} }}
                  onDateChange={(date) => {
                    this.setState({ checkinDate: date });
                  }}
                />
                <Text style={{marginLeft: 60, fontSize: 18}}>{this.state.checkinDate} Sept, 2020</Text>
            </View>

            <View style={{marginLeft: Platform.OS==='ios'?30:22 }}>
              <Text style={styles.b}>CHECK-OUT</Text>
              <DatePicker
                  style={{ width: 15, height: 15, marginLeft: 16, marginTop: 5 }}
                  date={this.state.checkoutDate}
                  mode="date"
                  placeholder=""
                  format="DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{ dateInput: { marginLeft: 36, marginTop: 10 }, dateIcon: { marginTop: 10} }}
                  onDateChange={(date) => {
                    this.setState({ checkoutDate: date });
                  }}
                />
                <Text style={{marginLeft: 60, fontSize: 18}}>{this.state.checkoutDate} Sept, 2020</Text>
            </View>

            
          </View>
        <Divider style={{marginTop: 20}}/>

        <View style={{flexDirection: 'row'}}>
          
           <View>
              <TouchableOpacity onPress={() => !this.toggleModal()}>
                <Text style={styles.b}>GUESTS</Text>
                <Text style={{marginLeft: 25, fontWeight: 'bold', fontSize: 32}}>0{guests}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => !this.toggleModal()}>
                <Text style={[styles.b,{marginLeft: 110}]}>ROOMS</Text>
                <Text style={{marginLeft: 115, fontWeight: 'bold', fontSize: 33}}>0{this.state.rooms}</Text>
              </TouchableOpacity>
            </View>

          </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity disabled={this.state.isFormValid} onPress={() => this.props.navigation.navigate('HotelDetails',{rooms: this.state.rooms, 
            destination:this.state.destination , nights: nights, 
            guests: guests, checkinDate: this.state.checkinDate, 
            checkoutDate: this.state.checkoutDate })}>
          <LinearGradient colors={['#90a3e8', '#1544ed']} style={{height: 50, width: 120, borderRadius: Platform.OS==='ios'?12:50}}>
            <Text style={{fontSize: 22, textAlign: 'center', marginTop: 10}}>Search</Text>
          </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20,}}>
          <Text style={{marginLeft: 15, fontSize: 22, fontWeight:'bold'}}>Special Offers for You </Text>
          
          <ScrollView horizontal={true}>
            
            <View style={{width: Platform.OS==='ios'?350:300, marginTop: 2}}>
            <Card>
              <View style={{borderLeftColor:'blue', borderLeftWidth: 3}}>
                <Text style={{fontSize: 12, marginLeft: 5}}>Holidays</Text>
              </View>
              <Text style={{fontWeight:'bold', marginTop: 10, fontSize: 16}}>5-Star Hotel  + Flight Packages Starting @ ₹ 999 !</Text>
              <Text style={{fontSize: 13.5, color:'grey'}}>Pay only 10% to book . Free Cancellation 8 days before the departure </Text>
              <Image source={require('../images/sbi-card.jpg')} style={{width: 90, height: 15, marginTop: 10, opacity:0 }}/>
            </Card>
            </View>

            <View style={{width: Platform.OS==='ios'?350:300, marginTop: 2}}>
            <Card>
              <View style={{marginRight: 210}}>
                <Icon name="domain" color="red"/>
              </View>
              <Text style={{fontWeight:'bold', marginTop: 10, fontSize: 16}}>Book Luxurious Vacations Near & Grab Great Benifits !</Text>
              <Text style={{fontSize: 13.5, color:'grey'}}>Room Upgrade | Early Check-in & Late Check-Out | Weekend BOGO</Text>
              <Image source={require('../images/sbi-card.jpg')} style={{width: 90, height: 5, marginTop: 10, opacity:0 }}/>
            </Card>
            </View>

            <View style={{width: Platform.OS==='ios'?350:300, marginTop: 2}}>
            <Card>
              <View style={{borderLeftColor:'blue', borderLeftWidth: 3}}>
                <Text style={{fontSize: 12, marginLeft: 5}}>Hotels Vacations</Text>
              </View>
              <Text style={{fontWeight:'bold', marginTop: 10, fontSize: 16}}> Enjoy Upto 25% OFF on booking 3 or more nights</Text>
              <Text style={{fontSize: 13.5, color:'grey'}}>Only on International Hotels</Text>
              <Image source={require('../images/sbi-card.jpg')} style={{width: 90, height: 25, marginTop: 10, opacity:0 }}/>
            </Card>
            </View>

          </ScrollView>

        </View>

        <View style={{marginTop: 25, marginBottom: 20}}>
          <Text style={{marginLeft: 20, fontSize: 14}}>COVID-19 UPDATE</Text>
          <Text style={{marginLeft: 20, fontSize: 21, fontWeight:'bold'}}>Stay Informed and Travel Safe</Text>

          <ScrollView horizontal={true}>
            
            <View style={{width: Platform.OS==='ios'?350:350, marginTop: 2}}>
            <Card>
              <View style={{flexDirection:'row'}}>
                <View><Icon name="check-circle" color="blue" style={{opacity:0.7}}/></View>
                <View style={{marginLeft: 5}}>
                  <Text style={{fontWeight:'bold', fontSize: 15}}>MySafety - Safe and Hygienic Stays</Text>
                  <Text style={{fontSize: 13, color:'grey', marginRight: 5, marginBottom: 10}}>Our hotel partners have self-certified to follow a series of precautionary measures to make your hotel stay safe and healthy.</Text>
                </View>
              </View> 
            </Card>
            </View>
            <View style={{width: Platform.OS==='ios'?350:350, marginTop: 2}}>
            <Card>
              <View style={{flexDirection:'row'}}>
                <View><Icon name="check" color="blue" style={{opacity:0.7}}/></View>
                <View style={{marginLeft: 5}}>
                  <Text style={{fontWeight:'bold', fontSize: 15}}>Free Cancellation, Zero Payment Now...</Text>
                  <Text style={{fontSize: 13, color:'grey', marginRight: 5}}>Be Flexible by opting for free cancellation, zero payment now bookin option.</Text>
                  <Text style={{color:'blue', fontWeight:'bold', marginTop: 5}}>KNOW MORE</Text>
                </View>
              </View> 
            </Card>
            </View>
            <View style={{width: Platform.OS==='ios'?350:350, marginTop: 2}}>
            <Card>
              <View style={{flexDirection:'row'}}>
                <View><Icon name="book" color="blue" style={{opacity:0.7}}/></View>
                <View style={{marginLeft: 5}}>
                  <Text style={{fontWeight:'bold', fontSize: 15}}>Follow Updates on Travel Advisory</Text>
                  <Text style={{fontSize: 13, color:'grey', marginRight: 5}}>Make Informed decisions with regular updates & about on-ground situation of your destination .</Text>
                  <Text style={{color:'blue', fontWeight:'bold', marginTop: 5}}>KNOW MORE</Text>
                </View>
              </View> 
            </Card>
            </View>

          </ScrollView>

        </View>

        <Modal animationType="slide" transparent={false} visible={this.state.showModal}>
            <View>

              <View style={{flexDirection:'row'}}>
              <Text style={styles.h}>Select No. of Guests & Rooms</Text>
              </View>
              
              <View style={{ marginLeft: 10, marginTop: 10, borderWidth: 0.5, borderRadius: 10, borderColor:'grey', paddingLeft: 10, paddingTop: 10, marginRight: 15 }}>            
              <Text style={{color:'grey', fontWeight:'bold'}}>ROOM {this.state.rooms}</Text>
              <View style={{flexDirection:'row', marginTop: 8}}>
              <View>
                <Text style={{fontSize: 18}}>Adults</Text>
                <Text style={{fontSize: 11, opacity:0.7}}>13 yrs & Above</Text>
              </View>
              <View style={{marginLeft: Platform.OS==-'ios'?80:125, marginTop: 8, flexDirection: 'row',}}>
                <LinearGradient colors={['#dfff', '#fff']} style={styles.i}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ borderRightWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.increaseCount()}>
                  <FontAwesome name="plus" style={{marginLeft:13, marginTop: 3, marginRight: 15}} size={18} />
                  </TouchableOpacity></View>
                  <Text style={{fontSize: 20, marginHorizontal: 10}}>{this.state.adult}</Text>
                  <View style={{ borderLeftWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.decreaseCount()}>
                  <FontAwesome name="minus" size={18} style={{marginLeft:15, marginTop: 3 }} />
                  </TouchableOpacity></View>
                </View>
                </LinearGradient>
              </View>
              </View>

              <View style={{flexDirection:'row', marginVertical: 20}}>
              <View>
                <Text style={{fontSize: 18}}>Child</Text>
                <Text style={{fontSize: 11, opacity:0.7}}>12 yrs & below</Text>
              </View>
              <View style={{marginLeft: Platform.OS==='ios'?120:130, marginTop: 8, flexDirection: 'row',}}>
                <LinearGradient colors={['#dfff', '#fff']} style={styles.i}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ borderRightWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.increaseCount1()}>
                  <FontAwesome name="plus" style={{marginLeft:13, marginTop: 3, marginRight: 15}} size={18} />
                  </TouchableOpacity></View>
                  <Text style={{fontSize: 20, marginHorizontal: 10}}>{this.state.childrens}</Text>
                  <View style={{ borderLeftWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.decreaseCount1()}>
                  <FontAwesome name="minus" size={18} style={{marginLeft:15, marginTop: 3 }} />
                  </TouchableOpacity></View>
                </View>
                </LinearGradient>
              </View>
              </View>

              </View>

              <TouchableOpacity>
                <Text style={{textAlign:'center', marginTop: 10, color:'blue', fontWeight:'bold', fontSize: 17}}>+ ADD ANOTHER ROOM</Text>
              </TouchableOpacity>

              <Divider style={{margin: 15}}/>

              <View style={{marginTop: 70, marginTop: 20,
                alignItems: Platform.OS==='ios'?"flex-end":"center",
                marginRight: Platform.OS === 'ios' ? 30 : 0,}}>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                <LinearGradient colors={['#dfff', '#568acc']} style={{height: 50, width: 120, borderRadius: Platform.OS==='ios'?80:500}}>
                  <Text style={{fontSize: 16, textAlign: 'center', marginTop: 12 }}>DONE</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
     
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  z: { height: 50, width: 100, borderRadius: 500 },
  i: { height: 40, width: 120 },
  h: { fontSize: Platform.OS==='ios'?20:25, marginLeft: 19, fontWeight: '700', marginTop: Platform.OS==='ios'?35:15 },
  g: { marginTop: 20, marginLeft: 20, fontSize: 18 },
  e: { textAlign: 'left', marginLeft: 20, fontSize: 18 },
  j: { fontSize: 18, textAlign: 'right', marginLeft: 90 },
  f: { marginLeft: 20, fontWeight: 'bold', fontSize: 30, },
  w: { marginLeft: 60, fontWeight: 'bold', fontSize: 20, marginTop: 7 },
  p: { fontSize: 17, paddingLeft: 10, paddingBottom: 5, marginLeft: 20, color: '#696e6b' },
  a: { marginLeft: 35, fontSize: 18, marginTop: 15 },
  b: { marginLeft: 25, marginTop: 15, fontSize: 18, fontWeight:'bold', color:'grey' },
  c: { marginTop: 15, fontSize: 18, alignContent: 'flex-end', marginLeft: 20 },
  d: { marginLeft: 10, marginRight: 40, marginTop: Platform.OS==='ios'?30:20, marginBottom: Platform.OS==='ios'?30:20 }
});
