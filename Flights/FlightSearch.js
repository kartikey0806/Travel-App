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
import { Icon, Divider, Card, ListItem } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


export default class FlightSearch extends React.Component {

  static navigationOptions = {
    title: 'Flight Search',
    navigationOptions: ({navigation}) => ({
      headerLeft:() => <Icon name="menu" size={30} 
          color= 'white' style={{ paddingLeft: 10}}
          onPress={ () => this.props.navigation.goBack() } />
  })
  }

  constructor(props) {
    super(props);
    this.state = {
      departDate: '04/09/2020',
      returnDate: '',
      showModal: false,
      adults: 1,
      child: 0,
      infants: 0,
      cabinClass: 'Economy',
      origin: 'New Delhi',
      destination: 'Mumbai'
    };
  }

  handleOrigin = origin => { this.setState({origin}, this.validateForm); }
  handleDestination = destination => { this.setState({destination}, this.validateForm);}
  handleDepartDate = departDate => { this.setState({departDate}, this.validateForm); }

  validateForm = () => {
    if ( this.state.destination.length >= 2 && this.state.origin.length >= 2 && this.state.departDate ) {
      return this.setState({ isFormValid: true });
    } else {
      return this.setState({ isFormValid: false });
    }
  };

  toggleModal() { this.setState({showModal: !this.state.showModal}) }
  
  increaseCount() {this.setState({adults: this.state.adults + 1 })}
  decreaseCount() {this.setState({adults: this.state.adults - 1 })}
  increaseCount1() {this.setState({child: this.state.child + 1 })}
  decreaseCount1() {this.setState({child: this.state.child - 1 })}
  increaseCount2() {this.setState({infants: this.state.infants + 1 })}
  decreaseCount2() {this.setState({infants: this.state.infants - 1 })}

  render() {
    const travellers = this.state.adults + this.state.infants + this.state.child
    return (
      <View style={{ marginTop: 20, backgroundColor: '#dfff', height: 1200 }}>

        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <View style={{alignItems: 'flex-start',paddingLeft: 10,paddingTop: 10,}}>
            <Icon name={Platform.OS==='ios'?"navigate-before":"keyboard-backspace"} size={30}
             onPress={() => { this.props.navigation.navigate('Home'); }} />
          </View>
          <Text style={{fontSize: 23,fontWeight: 'bold',paddingTop: 10,paddingLeft: 7,}}>
            Flights Search
          </Text>
        </View>

          <View>
            <Text style={styles.p}>FROM</Text>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Icon
                name="flight-takeoff"
                size={30}
                style={{ paddingRight: 5, marginLeft: 7 }}
              />
              <TextInput
                placeholder = "Origin"
                onChangeText = {this.handleOrigin}
                value = {this.state.origin}
                placeholderTextColor = "black"
                style={{ fontSize: 18, paddingLeft: 7 }}
              />
            </View>
            <Divider
              style={{ marginLeft: 10, marginRight: 30, marginTop: 8 }}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text style={styles.p}>TO</Text>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Icon
                name="flight-land"
                size={30}
                style={{ paddingRight: 5, marginLeft: 7 }}
              />
              <TextInput
                onChangeText = {this.handleDestination}
                placeholder = "Destination"
                placeholderTextColor = "black"
                value = {this.state.destination}
                style = {{ fontSize: 18, paddingLeft: 7 }}
              />
            </View>
            <Divider
              style={{ marginLeft: 10, marginRight: 30, marginTop: 8 }}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.b}>DEPARTURE</Text>
              <DatePicker
                  style={{ width: 15, height: 15, marginLeft: 16, marginTop: 5 }}
                  date={this.state.departDate}
                  mode="date"
                  placeholder=""
                  format="DD/MM/YYYY"
                  minDate="04/09/2020"
                  maxDate="31/08/2021"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{ dateInput: { marginLeft: 36, marginTop: 10 }, dateIcon: { marginTop: 10} }}
                  onDateChange={(date) => {
                    this.setState({ departDate: date }, this.validateForm);
                  }}
                />
                <Text style={{marginLeft: 60, fontSize: 18}}>{this.state.departDate}</Text>
            </View>

            <View style={{marginLeft: Platform.OS==='ios'?10:20 }}>
              <Text style={styles.b}>RETURN</Text>
              <DatePicker
                  style={{ width: 15, height: 15, marginLeft: 16, marginTop: 5 }}
                  date={this.state.returnDate}
                  mode="date"
                  placeholder=""
                  format="DD/MM/YYYY"
                  minDate="01/09/2020"
                  maxDate="31/08/2021"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{ dateInput: { marginLeft: 36, marginTop: 10 }, dateIcon: { marginTop: 10} }}
                  onDateChange={(date) => {
                    this.setState({ returnDate: date }, this.validateForm);
                  }}
                />
                <Text style={{marginLeft: 60, fontSize: 18}}>{this.state.returnDate}</Text>
            </View>

            
          </View>
          
          <Divider style={styles.d} />
          
          <View style={{flexDirection: 'row'}}>
          
           <View>
              <TouchableOpacity onPress={() => !this.toggleModal()}>
              <Text style={styles.e}>TRAVELLERS</Text>
              <Text style={styles.f}>0{travellers}</Text>
            </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => !this.toggleModal()}>
              <Text style={{marginLeft: 60, fontSize: 18}}>CABIN CLASS</Text>
              <Text style={styles.w}>{this.state.cabinClass}</Text>
              </TouchableOpacity>
            </View>

          </View>
   
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FlightDetails',{
              cabinClass: this.state.cabinClass, departDate: this.state.departDate, 
              returnDate: this.state.returnDate, travellers: travellers, 
              destination: this.state.destination, origin: this.state.origin
              })} disabled={!this.state.isFormValid}>
            <LinearGradient colors={['#90a3e8', '#1544ed']} style={{height: 50, width: 120, borderRadius: Platform.OS==='ios'?12:50}}>
              <Text style={{fontSize: 22, textAlign: 'center', marginTop: 10}}>Search</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>

        <ScrollView horizontal={true}>

          <View style={{width: Platform.OS==='ios'?350:300, marginLeft: 0, marginTop: 20}}>
          <Card>
            <View style={{borderLeftColor:'blue', borderLeftWidth: 3}}>
              <Text style={{fontSize: 12, marginLeft: 5}}>Domestic Flights</Text>
            </View>
            <Text style={{fontWeight:'bold', marginTop: 10, fontSize: 17}}>Let's Fly...</Text>
            <Text style={{fontSize: 13.8}}>Grab FLAT 10% OFF on Domestic Flights .</Text>
            <Image source={require('../images/sbi-card.jpg')} style={{width: 90, height: 33, marginTop: 10 }}/>
          </Card>
          </View>

          <View style={{width: Platform.OS==='ios'?400:300, marginLeft: 0, marginTop: 20}}>
          <Card>
            <View style={{borderLeftColor:'blue', borderLeftWidth: 3}}>
              <Text style={{fontSize: 12, marginLeft: 5}}>International Flights</Text>
            </View>
            <Text style={{fontWeight:'bold', marginTop: 5, fontSize: 17}}>Booking's Open for Flights from India to Maldives</Text>
            <Text style={{fontSize: 13.8}}>Valid for Indians with Tourist Visas .</Text>
            <Image source={require('../images/AirIndiaLogo.png')} style={{width: 90, height: 30}}/>
          </Card>
          </View>

          <View style={{width: Platform.OS==='ios'?400:300, marginLeft: 0, marginTop: 20}}>
          <Card>
            <View style={{borderLeftColor:'blue', borderLeftWidth: 3}}>
              <Text style={{fontSize: 12, marginLeft: 5}}>Flights</Text>
            </View>
            <Text style={{fontWeight:'bold', marginTop: 13, fontSize: 17}}>A Welcome Surprise for you !</Text>
            <Text style={{fontSize: 13.8, marginBottom: 24}}>Flat 10% OFF up to ₹ 1,200 on your first Flight Booking .</Text>
          </Card>
          </View>

          <View style={{width: Platform.OS==='ios'?430:300, marginLeft: 0, marginTop: 20}}>
          <Card>
            <View style={{borderLeftColor:'blue', borderLeftWidth: 3}}>
              <Text style={{fontSize: 12, marginLeft: 5}}>International Flights</Text>
            </View>
            <Text style={{fontWeight:'bold', marginTop: 5, fontSize: 17}}>Rejoice Travellers! Bookings open for Flights to the USA & London</Text>
            <Text style={{fontSize: 13.8}}>For Indian citizens with valid visas .</Text>
            <Image source={require('../images/AirIndiaLogo.png')} style={{width: 90, height: 30}}/>
          </Card>
          </View>
          

        </ScrollView>
                  
          <Modal animationType="slide" transparent={false} visible={this.state.showModal}>
            <View>

              <View style={{flexDirection:'row'}}>
              <Text style={styles.h}>Select Travellers & Class</Text>
              </View>
              <Text style={{marginLeft: 20, opacity:0.7, marginTop: 10}}>ADD NUMBER OF TRAVELLERS</Text> 
              
              <View style={{ marginTop: 20, marginLeft: 20 }}>            
              <View style={{flexDirection:'row'}}>
              <View>
                <Text style={{fontSize: 18}}>Adults <Text style={{fontSize: 11}}>12 yrs & Above</Text></Text>
                <Text style={{fontSize: 11, opacity:0.7}}>on the day of travel</Text>
              </View>
              <View style={{marginLeft: Platform.OS==-'ios'?80:75, marginTop: 8, flexDirection: 'row',}}>
                <LinearGradient colors={['#dfff', '#fff']} style={styles.i}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ borderRightWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.increaseCount()}>
                  <FontAwesome name="plus" style={{marginLeft:13, marginTop: 3, marginRight: 15}} size={18} />
                  </TouchableOpacity></View>
                  <Text style={{fontSize: 20, marginHorizontal: 10}}>{this.state.adults}</Text>
                  <View style={{ borderLeftWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.decreaseCount()}>
                  <FontAwesome name="minus" size={18} style={{marginLeft:15, marginTop: 3 }} />
                  </TouchableOpacity></View>
                </View>
                </LinearGradient>
              </View>
              </View>

              <View style={{flexDirection:'row', marginVertical: 20}}>
              <View>
                <Text style={{fontSize: 18}}>Child <Text style={{fontSize: 11}}>2 - 12 yrs</Text></Text>
                <Text style={{fontSize: 11, opacity:0.7}}>on the day of travel</Text>
              </View>
              <View style={{marginLeft: Platform.OS==='ios'?120:105, marginTop: 8, flexDirection: 'row',}}>
                <LinearGradient colors={['#dfff', '#fff']} style={styles.i}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ borderRightWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.increaseCount1()}>
                  <FontAwesome name="plus" style={{marginLeft:13, marginTop: 3, marginRight: 15}} size={18} />
                  </TouchableOpacity></View>
                  <Text style={{fontSize: 20, marginHorizontal: 10}}>{this.state.child}</Text>
                  <View style={{ borderLeftWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.decreaseCount1()}>
                  <FontAwesome name="minus" size={18} style={{marginLeft:15, marginTop: 3 }} />
                  </TouchableOpacity></View>
                </View>
                </LinearGradient>
              </View>
              </View>

              <View style={{flexDirection:'row', marginBottom: 20}}>
              <View>
                <Text style={{fontSize: 18}}>Infants <Text style={{fontSize: 11}}>Under 2 years</Text></Text>
                <Text style={{fontSize: 11, opacity:0.7}}>on the day of travel</Text>
              </View>
              <View style={{marginLeft: Platform.OS==='ios'?85:80, marginTop: 8, flexDirection: 'row',}}>
                <LinearGradient colors={['#dfff', '#fff']} style={styles.i}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{ borderRightWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.increaseCount2()}>
                  <FontAwesome name="plus" style={{marginLeft:13, marginTop: 3, marginRight: 15}} size={18} />
                  </TouchableOpacity></View>
                  <Text style={{fontSize: 20, marginHorizontal: 10}}>{this.state.infants}</Text>
                  <View style={{ borderLeftWidth: 0.5, borderColor: 'black'}}><TouchableOpacity onPress={() => this.decreaseCount2()}>
                  <FontAwesome name="minus" size={18} style={{marginLeft:15, marginTop: 3 }} />
                  </TouchableOpacity></View>
                </View>
                </LinearGradient>
              </View>
              </View>
              </View>

              <Divider style={{margin: 15}}/>
              <View>
              <Text style={{marginLeft: 20, fontSize: 18, fontWeight: 'bold'}}>CABIN CLASS</Text>
              <Picker selectedValue={this.state.cabinClass} style={{width: 210, height: Platform.OS==='ios'?0:50, marginLeft: 15}}
                onValueChange={(itemValue, itemIndex) => this.setState({cabinClass: itemValue})}> 
                <Picker.Item label="Economy" value="Economy" />
                <Picker.Item label="Premium Economy" value="Premium Economy" />
                <Picker.Item label="Business" value="Bussines" />
              </Picker>
              </View>

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

      </View>
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
  b: { marginLeft: 25, marginTop: 15, fontSize: 18 },
  c: { marginTop: 15, fontSize: 18, alignContent: 'flex-end', marginLeft: 20 },
  d: { marginLeft: 10, marginRight: 40, marginTop: Platform.OS==='ios'?30:20, marginBottom: Platform.OS==='ios'?30:20 }
});
