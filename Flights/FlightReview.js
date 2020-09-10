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
import { Icon, Divider, Card, Input, ListItem } from 'react-native-elements';
import { FLIGHTS } from '../informations/Flights';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import { baseUrl } from '../informations/baseUrl';
import { postBooking } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    flights: state.flights,
    bookings: state.bookings
  }
}

const mapDispatchToProps = dispatch => ({
  postBooking: (flightId) => dispatch(postBooking(flightId))
})

const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min
const Id = rand(99999990,10000000)

function RenderFlight(props) {
  const flight = props.flight;
  const totalAmount = flight.price * props.travellers;
  const tax = (totalAmount * 13) / 100;
  const convinenceFee = 290
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const paidAmount = tax + convinenceFee + totalAmount

  const shareFlight = (title, message, url) => {
    Share.share(
    { title: title,
      message: 'Make Your Trip' + ': Checkout my ' + flight.name + ' Flight from ' + props.originPoint + " to " + props.destinationPoint + " at a great discount of 20% and just at the cost of ₹ " + flight.price,
      url: url },
    { dialogTitle: 'Share your ' + flight.name + ' Flight' })
  }

  const shareBooking = (title, message, url) => {
    Share.share(
    { title: title,
      message: 'Make Your Trip' + ': Hey!, Checkout my Booking of ' + flight.name + "'s Flight from " + props.originPoint + " to " + props.destinationPoint + " which I got at a great discount of 20% and just at the cost of ₹ " + flight.price,
      url: url },
    { dialogTitle: 'Share your Booking' })
  }

  if (flight != null && flight.name==="Vistara") {
    return (
      <View style={{marginBottom: 51.5}}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'navigate-before' : 'keyboard-backspace'}size={30} onPress={props.navigation} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Review your Flight</Text>
          <View style={{marginLeft: 120}}>
            <Icon name='share' onPress={() => shareFlight(flight.name)}/>
          </View>
        </View>
        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

      <ScrollView style={{ marginBottom: 51.5 }}>
      
        <View> 
          
        <View style={{ marginBottom: 5, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ backgroundColor: '#505459', width: 120, height: 50 }}>
            <Text style={{fontSize: 17,textAlign: 'center',paddingTop: 5,color: '#b8bbbf',}}>DEPART</Text>
            <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',opacity: 0.8,paddingHorizontal: 6,textAlign: 'center',}}>{props.departDate}</Text>
          </View>
          <View style={{ marginLeft: 13, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{flight.category} | {flight.duration} | {props.class}</Text>
          </View>
        </View>

        <Divider style={{ marginBottom: 10, marginTop: 7, marginHorizontal: 15 }}/>

        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Image
              source={require('../images/vistara.png')}
              style={{ width: 45, height: 45, marginRight: 7 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{flight.name} </Text>
            <Text style={{ color: 'grey', fontSize: 17, marginTop: 13 }}>| {flight.number}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start', width: 140 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.originPoint}</Text>
              <Text style={{ color: 'black', opacity: 0.8 }}>{flight.originAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
              <Divider />
            </View>

            <View style={{ alignItems: 'flex-end', width: 140, marginRight: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.destinationPoint}</Text>
              <Text style={{ textAlign: 'right' }}>  {flight.destinationAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal1}</Text>
            </View>
          </View>
        </View>

        <Card>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Fare Type</Text>
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Cabin Baggage 7 Kgs, Check-in baggage included
            </Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Cancellation Fees Apply</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Date Change Chargeable</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Free seats available in Business lounge
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'lightgreen',
              padding: 4,
              marginVertical: 5,
            }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Upgrade your fares to enjoy Additional benifits
            </Text>
          </View>
        </Card>

        <Divider style={{ marginTop: 7, marginHorizontal: 15 }} />

        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 23 }}>
              <FontAwesome
                name="briefcase"
                size={20}
                style={{ opacity: 0.7 }}
              />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Cabin Bag - 7 Kgs
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginLeft: 23, marginTop: 5 }}>
              <FontAwesome name="suitcase" size={20} style={{ opacity: 0.7 }} />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Check-in bag - 20 Kgs{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: '#dfff',marginVertical: 10,marginLeft: 15,marginRight: 20,}}>
          <View style={{flexDirection: 'row',marginLeft: 10,marginTop: 10,marginBottom: 10,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fly Faster with Fast Forward</Text>
            <FontAwesome name="suitcase" style={{ color: 'blue', alignSelf: 'center', marginLeft: 10 }} size={17} />
          </View>
          <View style={{ marginLeft: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16.5, marginRight: 15, color: 'grey' }}>Check-in at dedicated priority counters at {props.originPoint} andget your bags out before anyone else at the Destination .</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 1, fontSize: 16, color: 'black' }}>₹ 400</Text>
              <TouchableOpacity>
                <Text style={{color: 'blue',marginLeft: 210,fontWeight: 'bold',fontSize: 16.5,}}>+ ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

        <View
          style={{
            marginHorizontal: 15,
            borderColor: 'grey',
            borderWidth: 1,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
            backgroundColor: '#e0ba94',
            borderRadius: 20,
          }}>
          <LinearGradient
            colors={['#f56c42', '#e66c25']}
            style={{
              height: 16,
              width: 175,
              borderRadius: Platform.OS === 'ios' ? 12 : 50,
              marginLeft: 0,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 0,
                color: 'white',
                fontWeight: 'bold',
              }}>
              IMPORTANT INFORMATION
            </Text>
          </LinearGradient>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Mandatory check-list for passengers:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>1.</Text>{' '}
                Certify your health status through the Aarogya Setu app or the
                self-declaration form at the airport.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>2.</Text>{' '}
                Remember to do web check-in before arriving at the airport.
                Please do carry a printed or soft copy of the boarding pass.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>3.</Text>{' '}
                Please reach at least 2 hours prior to flight departure.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>4.</Text>{' '}
                No meal service will be available on-board.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>5.</Text>{' '}
                Face masks are compulsory. We urge you to carry your own.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>6.</Text>{' '}
                Remember to download the baggage tag(s) and affix it on your
                bag(s).
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Baggage Information:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                Carry no more than 1 check-in baggage and 1 hand baggage per
                passenger. The free check-in baggage allowance is 20 kgs, extra
                baggage can be availed at an additional cost.
              </Text>
            </View>
          </View>
        </View>

        <Divider style={{
            marginTop: 7,
            marginHorizontal: 5,
            marginBottom: 10,
            height: 3,
          }}/>

        <View>
          <Text style={{ fontSize: 21, opacity: 0.6, marginLeft: 15 }}>
            Cancellation & Date change charges
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <View style={{ width: 230 }}>
              <Text
                style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
                Cancellation Fees Apply
              </Text>
              <Text>
                A penalty of upto ₹{' '}
                {(totalAmount + tax - (totalAmount + tax) / 3).toFixed(0)} will
                be charged by the airline & by Make Your Trip based on how close
                to the departure date you cancel.
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  marginTop: 18,
                  fontSize: 19,
                  color: 'grey',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                ₹ {((totalAmount + tax) / 3).toFixed(0)}
              </Text>
              <Text style={{ fontSize: 13, textAlign: 'center' }}>
                Approx Refund
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 15,
              color: 'blue',
              fontSize: 16,
              fontWeight: 'bold',
              opacity: 0.7,
            }}>
            VIEW POLICY
          </Text>
        </View>

        <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
            </View>
            <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 110 }}>
            <TouchableOpacity onPress={props.onshowmodal1}>
              <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/*Fare Brekup page 1*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
          <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row',}}>
              <TouchableOpacity onPress={props.onshowmodal}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Base Fare</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Travellers ( {props.travellers} X ₹ {flight.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {totalAmount}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {(tax).toFixed(0)}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        </View>
        
        {/*Travellers Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible1}>
          <View style={{ backgroundColor: '#fff', marginBottom: 51.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal1} /></View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Travellers Details</Text>
            </View>
            <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1.5,}} />
          
          <ScrollView style={{ backgroundColor: '#fff' }}>
            
            <View style={{flexDirection:'row'}}>
              <View>
                <Image source={require('../images/vistara.png')} style={{width: 70, height: 50, marginLeft: 20}}/>
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

            <Text style={{ fontSize: 25, color: 'grey', marginLeft: 20, marginBottom: 10, }}>Traveller Details</Text>

            <View>
              <TextInput
                placeholder="First Name"
                value = {props.firstName}
                onChangeText = {props.firstName1}
                style={{ marginLeft: 20, fontSize: 18, marginRight: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.middleName}
                onChangeText = {props.middleName1}
                placeholder="Middle Name (Optional)"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.lastName}
                onChangeText = {props.lastName1}
                placeholder="Last Name"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />

              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <View>
                  <Text style={{fontSize: 20,color: 'grey',marginTop: 2,marginLeft: 5}}>Gender -</Text>
                  <Picker selectedValue={props.gender} style={{ width: Platform.OS === 'ios' ? 0 : 150, height: Platform.OS === 'ios' ? 0 : 30,}} 
                    onValueChange={props.picker}>
                      <Picker.Item label="Male" value="Male" /><Picker.Item label="Female" value="Female" /><Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10, marginTop: 10 }}>
                  <Input 
                    value = {props.age}
                    onChangeText = {props.age1}
                    placeholder="Age" 
                    keyboardType="number-pad" 
                  />
                </View>
              </View>

              <Text style={{marginLeft: 20, color:'blue', fontSize: 16, fontWeight:'bold', marginBottom: 5}}> + ADD MORE TRAVELLERS</Text>
              
            </View>

            <Divider style={{ marginBottom: 10, marginHorizontal: 5, height: 3 }} />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, color: 'grey' }}>Contact Information</Text>
              <Text style={{ color: 'grey' }}>Your ticket and flights information will be sent here</Text>

              <View style={{ marginRight: 20 }}>
                <Input
                  placeholder="Email"
                  leftIcon={<FontAwesome size={20} name="user-o" />}
                  keyboardType="email-address"
                  value = {props.email}
                  onChangeText = {props.email1}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>  
                <View style={{width: 150,borderRightWidth: 1,borderColor: 'grey'}}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Country Code</Text>
                  <Picker selectedValue={props.countryCode} style={{ width: Platform.OS === 'ios' ? 0 : 190,height: Platform.OS === 'ios' ? 0 : 18,marginLeft: 2,marginTop: 13,}} 
                    onValueChange={props.picker1}>
                      <Picker.Item label="India (+ 91)" value="+91" /><Picker.Item label="Usa (+ 1)" value="+1" /><Picker.Item label="Russia (+ 44)" value="+44" /><Picker.Item label="Honkong (+ 852)" value="+852" /><Picker.Item label="Bhutan (+ 975)" value="+975" /><Picker.Item label="China (+ 86)" value="+86" /><Picker.Item label="Switzerland (+ 41)" value="+41" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Mobile No.</Text>
                  <Input
                    value = {props.phone}
                    onChangeText = {props.phone1}
                    placeholder={props.countryCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

            </View>

            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft: 17}}>
               <CheckBox 
                  value={isSelected1}
                  onValueChange={setSelection1}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6, marginTop: 5}}>
                <Text style={{fontSize: 17}}>GST Number for Business travel (Optional)</Text>
              </View>
            </View>

            <View style={{height: (isSelected1 ? 100 : 0 ), opacity:(isSelected1 ? 1: 0), }} >
              <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 5}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor: 'blue'}}>
                  <TextInput 
                    placeholder="Company Name" 
                    value = {props.companyName}
                    onChangeText = {props.companyName1} />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor:'blue'}}>
                  <TextInput 
                    placeholder="Registration No." keyboardType='number-pad' 
                    onChangeText = {props.registrationNo1} 
                    value = {props.registrationNo}
                  />
                </View>
              </View>
            </View>

            <Divider style={{height: 2, marginHorizontal: 20, marginVertical: 10}} />
            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft:17}}>
                <CheckBox 
                  value={isSelected}
                  onValueChange={setSelection}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6}}>
                <Text>I understand and agree with the Fare Rules , the Privacy Policy , the User Agreement and Terms of Service of Make Your Trip</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 110,}}>
                <TouchableOpacity onPress={props.onshowmodal2} disabled={props.FormValidity}>
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
            
          </View>
        </Modal>

        {/*Payment Page */}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible2}>
          
          <View style={{ flexDirection: 'row', backgroundColor:'#fff' }}>
            <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal2}  />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Select Payment Mode</Text>
          </View>
          <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1,}} />

        <ScrollView style={{backgroundColor:'#fff'}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
              <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
            </View>
          </View>
          <View style={{marginLeft: 15, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
          </View>
          <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

          <View style={{flexDirection:'row', paddingLeft: 15, paddingVertical: 15, backgroundColor:'lightgrey', marginHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>Payment Options</Text>
              <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 50, justifyContent:'flex-end'}}>
                <Icon name="lock" color="green" size={18} />
                <Text style={{color:'grey', marginLeft: 2}}>Safe and Secure</Text>
              </View>
          </View>

          <View>
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/bhimLogo.png') }} 
                title="UPI BHIM" titleStyle={{color:'grey', fontSize: 16}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="ios-card" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Credit/Debit/ATM Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-calculator" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="EMI" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<FontAwesome name="bank" size={19} style={{marginLeft: 7}} color="grey"/>}
                title="Net Banking" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-gift" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Gift Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-wallet" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Mobile Wallet" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/paypalLogo.png') }} 
                title="Paypal" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/amazonLogo.jpg') }} 
                title="Amazon Pay" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
            </TouchableOpacity>
          
          </View>

          <View style={{flexDirection: 'row',backgroundColor: '#43464a', height: 40, paddingTop: 4 }}>       
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)}</Text>
              <Text style={{color:'grey', marginLeft: 5, paddingTop: 4}}>Due Now</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal3} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 4 }}/>
            </View>

        </ScrollView>
        
        </Modal>

        {/*Fare Brekaup Final Page */}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible3}>
          <View style={{ backgroundColor: '#fff', height: 500, marginTop: 400 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row', backgroundColor:'#4677d4', paddingVertical: 10, marginRight: 20}}>
              <TouchableOpacity onPress={props.onshowmodal3}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Total Fare</Text>
                <Text style={{ marginLeft: 190 }}>₹ {totalAmount}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, flexDirection: 'row'}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Fee & Surcharges</Text>
                <Text style={{ marginLeft: 150 }}>₹ {(tax).toFixed(0)}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Convenience Fee*</Text>
                <Text style={{ marginLeft: 150 }}>₹ {convinenceFee}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, marginBottom: 10}}/>
            </View>
            <View style={{marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ fontSize: 22, marginRight: 140, fontWeight: '900' }}>DUE NOW</Text>
                <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)} </Text>
              </View>
              <Text style={{color:'grey', fontSize: 13}}>Price of inclusive GST wherever indicated *</Text>
            </View>
          </View>
        </Modal>

        {/*Final Review Page for booking*/}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible4}>
          <View style={{ backgroundColor: '#fff', height: 450, marginTop: 400, borderColor:'grey', borderWidth: 4 }}>

            <View style={{flexDirection:'row', alignSelf:'center', backgroundColor:'lightblue', paddingHorizontal: 40, paddingVertical: 8, marginTop: 5}}>
              <Text style={{ fontSize: 20,justifyContent: 'center',fontWeight: 'bold', alignSelf:'center', alignContent:'center', alignItems:'center'}}>CONFIRM YOUR BOOKING</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4, marginBottom: 10 }}/>

            <View>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/vistara.png')} style={{width:70, height: 50, marginLeft: 20}}/>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight:'bold', fontSize: 18}}>{flight.name} | <Text style={{color:'grey', fontSize: 16}}>{flight.number}</Text></Text>
                  <Text style={{fontWeight:'bold', marginTop: 2, fontSize: 16, opacity:0.7}}>Departure - {props.departDate}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 20, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint} | <Text style={{color:'grey', fontSize: 15}}>{flight.category}</Text></Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>

            <View style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
              <Text style={{marginLeft: 20, color:'grey', fontSize: 16}}>{props.age} yrs | {props.gender}</Text>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>
             
            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 5, marginHorizontal: 10}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 90}}>
                <TouchableOpacity onPress={props.onshowmodal5} >
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONFIRM</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        {/*Booking Page*/ }
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible5}>
          <View style={{backgroundColor:'#fff', height: 1000,}}>
          <ScrollView style={{marginBottom: 0}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop: 7, marginBottom: 20, marginRight: 10, marginLeft:5}}>
              <TouchableOpacity onPress={props.onPress()}>
                <Icon name='close' size={28} onPress={props.navigation1}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 7, marginBottom: 20}}>Booking Confirmed !</Text>
            <View style={{marginTop: 9, marginBottom: 20, marginLeft: 60}}>
              <Icon name='share' onPress={() => shareBooking(flight.name)} />
            </View>
          </View>

          <View style={{marginLeft: 15, marginRight: 15}}>

            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 16, opacity:0.8, marginLeft: 2}}>Trip ID: {Id}</Text>
              <Image source={require('../images/logo.png')} style={{height: 20, width: 40, marginLeft: 57, marginRight: 2}}/>
              <Text style={{fontSize: 18, fontWeight:'bold'}}>Make Your Trip</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 18, opacity:0.8, marginLeft: 2}}>{props.originPoint} to {props.destinationPoint}</Text>
              <Text style={{fontSize: 15, fontWeight:'bold', marginLeft: 10, opacity:0.8}}>{props.departDate}</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View><Image
                  source={require('../images/vistara.png')}
                  style={{ width: 45, height: 45, marginRight: 7 }}
                /></View>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>{flight.name} </Text>
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 3 }}>| {flight.number}</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize: 15}}>TICKET PNR - <Text style={{fontWeight:'normal'}}>Z71QW92</Text></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems:'center' }}>
                <View style={{ marginLeft: 50, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.originPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal}</Text>
                </View>

                <View style={{width: 70, marginRight: 20 }}>
                  <Ionicons name="ios-clock" size={25} style={{textAlign:'center'}} color="grey"/>
                  <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
                  <Text style={{ fontSize: 14, color: 'grey', textAlign: 'center', marginTop: 3 }}>{props.class}</Text>
                </View>

                <View style={{ marginRight: 10, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.destinationPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal1}</Text>
                </View>
              </View>
            </View>

            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 14}}>Baggage info – Check-in: 20 Kgs, Cabin: 7 Kgs</Text>

          </View>
          <Divider style={{height: 2, marginTop: 10, marginHorizontal: 15, marginBottom: 7}}/>
            
          <View style={{flexDirection:'row', marginLeft: 20}}>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 15}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>TRAVELLERS</Text>
              <View style={{flexDirection:'row', marginTop: 5}}>
                <FontAwesome size={20} name="user"/>
                <Text style={{marginLeft: 4, fontSize: 16}}>Mr. {props.firstName}{props.middleName} {props.lastName}</Text>
              </View>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingLeft: 10,paddingRight: 10,  alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Age</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.age} yrs</Text>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 10, paddingLeft: 10, alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Gender</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.gender}</Text>
            </View>
          </View>
          <Text style={{marginLeft: 20, marginTop: 15}}>Total Amount Paid - ₹ {paidAmount}</Text>
          <Text style={{marginLeft: 20}}>Email - {props.email}</Text>
          <Text style={{marginLeft: 20}}>Contact No. {props.countryCode} {props.phone}</Text>
          <Divider  style={{marginTop: 10, height: 2}}/>

          <View style={{marginTop: 15, marginLeft:12}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>IMPORTANT INFORMATION</Text>
            <Text style={{fontSize: 12}}>1) Use your Trip ID {Id} for all communication with Make Your Trip about this booking.</Text>
            <Text style={{fontSize: 12}}>2) Check-in counters at all airports close 45 minutes before departure</Text>
            <Text style={{fontSize: 12}}>3) A printed copy of this e-ticket or e-ticket display on laptop, tablet or phone must be presented at the time of check-in.</Text>
            <Text style={{fontSize: 12, marginRight:5}}>4) It is mandatory to carry government recognized photo identification (ID) with your e-ticket at the time of check-in. For infant passenger's, it is mandatory to carry the date of birth certificate</Text>
            <Text style={{fontSize: 12}}>5) For any further assistance, you can log on to makeyourtrip.com/support page or access all your trips in your account on Make your trip website or mobile app.</Text>
          </View>
          
          <Divider style={{marginTop: 10, height: 2, marginHorizontal: 10}}/>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{fontWeight:'bold', marginLeft: 10}}>Need Assistance with the Trip ?</Text>
            <Text style={{marginBottom: 10, marginLeft: 10}}>Go to www.makeyourtrip.com/support</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name="phone"/>
              <Text style={{fontWeight:'bold', marginLeft: 5}}>{flight.name} Helpline</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('1800222555', true)}>
                <Text style={{marginLeft: 5}}>1800 222 555</Text>
              </TouchableOpacity>
            </View>
          </View>

          </ScrollView>
          </View>
        </Modal>

      </ScrollView>

      </View>
    );
  }
  if (flight != null && flight.name==="Indigo") {
    return (
      <View style={{marginBottom: 51.5}}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'navigate-before' : 'keyboard-backspace'}size={30} onPress={props.navigation} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Review your Flight</Text>
          <View style={{marginLeft: 120}}>
            <Icon name='share' onPress={() => shareFlight(flight.name)}/>
          </View>
        </View>
        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

      <ScrollView style={{ marginBottom: 51.5 }}>
      
        <View> 
          
        <View style={{ marginBottom: 5, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ backgroundColor: '#505459', width: 120, height: 50 }}>
            <Text style={{fontSize: 17,textAlign: 'center',paddingTop: 5,color: '#b8bbbf',}}>DEPART</Text>
            <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',opacity: 0.8,paddingHorizontal: 6,textAlign: 'center',}}>{props.departDate}</Text>
          </View>
          <View style={{ marginLeft: 13, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{flight.category} | {flight.duration} | {props.class}</Text>
          </View>
        </View>

        <Divider style={{ marginBottom: 10, marginTop: 7, marginHorizontal: 15 }}/>

        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Image
              source={require('../images/indigo.png')}
              style={{ width: 45, height: 45, marginRight: 7 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{flight.name} </Text>
            <Text style={{ color: 'grey', fontSize: 17, marginTop: 13 }}>| {flight.number}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start', width: 140 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.originPoint}</Text>
              <Text style={{ color: 'black', opacity: 0.8 }}>{flight.originAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
              <Divider />
            </View>

            <View style={{ alignItems: 'flex-end', width: 140, marginRight: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.destinationPoint}</Text>
              <Text style={{ textAlign: 'right' }}>  {flight.destinationAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal1}</Text>
            </View>
          </View>
        </View>

        <Card>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Fare Type</Text>
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Cabin Baggage 7 Kgs, Check-in baggage included
            </Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Cancellation Fees Apply</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Date Change Chargeable</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Free seats available in Business lounge
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'lightgreen',
              padding: 4,
              marginVertical: 5,
            }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Upgrade your fares to enjoy Additional benifits
            </Text>
          </View>
        </Card>

        <Divider style={{ marginTop: 7, marginHorizontal: 15 }} />

        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 23 }}>
              <FontAwesome
                name="briefcase"
                size={20}
                style={{ opacity: 0.7 }}
              />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Cabin Bag - 7 Kgs
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginLeft: 23, marginTop: 5 }}>
              <FontAwesome name="suitcase" size={20} style={{ opacity: 0.7 }} />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Check-in bag - 20 Kgs{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: '#dfff',marginVertical: 10,marginLeft: 15,marginRight: 20,}}>
          <View style={{flexDirection: 'row',marginLeft: 10,marginTop: 10,marginBottom: 10,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fly Faster with Fast Forward</Text>
            <FontAwesome name="suitcase" style={{ color: 'blue', alignSelf: 'center', marginLeft: 10 }} size={17} />
          </View>
          <View style={{ marginLeft: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16.5, marginRight: 15, color: 'grey' }}>Check-in at dedicated priority counters at {props.originPoint} andget your bags out before anyone else at the Destination .</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 1, fontSize: 16, color: 'black' }}>₹ 400</Text>
              <TouchableOpacity>
                <Text style={{color: 'blue',marginLeft: 210,fontWeight: 'bold',fontSize: 16.5,}}>+ ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

        <View
          style={{
            marginHorizontal: 15,
            borderColor: 'grey',
            borderWidth: 1,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
            backgroundColor: '#e0ba94',
            borderRadius: 20,
          }}>
          <LinearGradient
            colors={['#f56c42', '#e66c25']}
            style={{
              height: 16,
              width: 175,
              borderRadius: Platform.OS === 'ios' ? 12 : 50,
              marginLeft: 0,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 0,
                color: 'white',
                fontWeight: 'bold',
              }}>
              IMPORTANT INFORMATION
            </Text>
          </LinearGradient>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Mandatory check-list for passengers:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>1.</Text>{' '}
                Certify your health status through the Aarogya Setu app or the
                self-declaration form at the airport.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>2.</Text>{' '}
                Remember to do web check-in before arriving at the airport.
                Please do carry a printed or soft copy of the boarding pass.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>3.</Text>{' '}
                Please reach at least 2 hours prior to flight departure.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>4.</Text>{' '}
                No meal service will be available on-board.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>5.</Text>{' '}
                Face masks are compulsory. We urge you to carry your own.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>6.</Text>{' '}
                Remember to download the baggage tag(s) and affix it on your
                bag(s).
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Baggage Information:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                Carry no more than 1 check-in baggage and 1 hand baggage per
                passenger. The free check-in baggage allowance is 20 kgs, extra
                baggage can be availed at an additional cost.
              </Text>
            </View>
          </View>
        </View>

        <Divider style={{
            marginTop: 7,
            marginHorizontal: 5,
            marginBottom: 10,
            height: 3,
          }}/>

        <View>
          <Text style={{ fontSize: 21, opacity: 0.6, marginLeft: 15 }}>
            Cancellation & Date change charges
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <View style={{ width: 230 }}>
              <Text
                style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
                Cancellation Fees Apply
              </Text>
              <Text>
                A penalty of upto ₹{' '}
                {(totalAmount + tax - (totalAmount + tax) / 3).toFixed(0)} will
                be charged by the airline & by Make Your Trip based on how close
                to the departure date you cancel.
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  marginTop: 18,
                  fontSize: 19,
                  color: 'grey',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                ₹ {((totalAmount + tax) / 3).toFixed(0)}
              </Text>
              <Text style={{ fontSize: 13, textAlign: 'center' }}>
                Approx Refund
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 15,
              color: 'blue',
              fontSize: 16,
              fontWeight: 'bold',
              opacity: 0.7,
            }}>
            VIEW POLICY
          </Text>
        </View>

        <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
            </View>
            <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 110 }}>
            <TouchableOpacity onPress={props.onshowmodal1}>
              <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/*Fare Brekup page 1*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
          <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row',}}>
              <TouchableOpacity onPress={props.onshowmodal}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Base Fare</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Travellers ( {props.travellers} X ₹ {flight.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {totalAmount}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {(tax).toFixed(0)}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        </View>
        
        {/*Travellers Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible1}>
          <View style={{ backgroundColor: '#fff', marginBottom: 51.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal1} /></View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Travellers Details</Text>
            </View>
            <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1.5,}} />
          
          <ScrollView style={{ backgroundColor: '#fff' }}>
            
            <View style={{flexDirection:'row'}}>
              <View>
                <Image source={require('../images/indigo.png')} style={{width: 60, height: 45, marginLeft: 20}}/>
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

            <Text style={{ fontSize: 25, color: 'grey', marginLeft: 20, marginBottom: 10, }}>Traveller Details</Text>

            <View>
              <TextInput
                placeholder="First Name"
                value = {props.firstName}
                onChangeText = {props.firstName1}
                style={{ marginLeft: 20, fontSize: 18, marginRight: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.middleName}
                onChangeText = {props.middleName1}
                placeholder="Middle Name (Optional)"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.lastName}
                onChangeText = {props.lastName1}
                placeholder="Last Name"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />

              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <View>
                  <Text style={{fontSize: 20,color: 'grey',marginTop: 2,marginLeft: 5}}>Gender -</Text>
                  <Picker selectedValue={props.gender} style={{ width: Platform.OS === 'ios' ? 0 : 150, height: Platform.OS === 'ios' ? 0 : 30,}} 
                    onValueChange={props.picker}>
                      <Picker.Item label="Male" value="Male" /><Picker.Item label="Female" value="Female" /><Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10, marginTop: 10 }}>
                  <Input 
                    value = {props.age}
                    onChangeText = {props.age1}
                    placeholder="Age" 
                    keyboardType="number-pad" 
                  />
                </View>
              </View>

              <Text style={{marginLeft: 20, color:'blue', fontSize: 16, fontWeight:'bold', marginBottom: 5}}> + ADD MORE TRAVELLERS</Text>
              
            </View>

            <Divider style={{ marginBottom: 10, marginHorizontal: 5, height: 3 }} />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, color: 'grey' }}>Contact Information</Text>
              <Text style={{ color: 'grey' }}>Your ticket and flights information will be sent here</Text>

              <View style={{ marginRight: 20 }}>
                <Input
                  placeholder="Email"
                  leftIcon={<FontAwesome size={20} name="user-o" />}
                  keyboardType="email-address"
                  value = {props.email}
                  onChangeText = {props.email1}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>  
                <View style={{width: 150,borderRightWidth: 1,borderColor: 'grey'}}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Country Code</Text>
                  <Picker selectedValue={props.countryCode} style={{ width: Platform.OS === 'ios' ? 0 : 190,height: Platform.OS === 'ios' ? 0 : 18,marginLeft: 2,marginTop: 13,}} 
                    onValueChange={props.picker1}>
                      <Picker.Item label="India (+ 91)" value="+91" /><Picker.Item label="Usa (+ 1)" value="+1" /><Picker.Item label="Russia (+ 44)" value="+44" /><Picker.Item label="Honkong (+ 852)" value="+852" /><Picker.Item label="Bhutan (+ 975)" value="+975" /><Picker.Item label="China (+ 86)" value="+86" /><Picker.Item label="Switzerland (+ 41)" value="+41" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Mobile No.</Text>
                  <Input
                    value = {props.phone}
                    onChangeText = {props.phone1}
                    placeholder={props.countryCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

            </View>

            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft: 17}}>
               <CheckBox 
                  value={isSelected1}
                  onValueChange={setSelection1}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6, marginTop: 5}}>
                <Text style={{fontSize: 17}}>GST Number for Business travel (Optional)</Text>
              </View>
            </View>

            <View style={{height: (isSelected1 ? 100 : 0 ), opacity:(isSelected1 ? 1: 0), }} >
              <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 5}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor: 'blue'}}>
                  <TextInput 
                    placeholder="Company Name" 
                    value = {props.companyName}
                    onChangeText = {props.companyName1} />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor:'blue'}}>
                  <TextInput 
                    placeholder="Registration No." keyboardType='number-pad' 
                    onChangeText = {props.registrationNo1} 
                    value = {props.registrationNo}
                  />
                </View>
              </View>
            </View>

            <Divider style={{height: 2, marginHorizontal: 20, marginVertical: 10}} />
            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft:17}}>
                <CheckBox 
                  value={isSelected}
                  onValueChange={setSelection}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6}}>
                <Text>I understand and agree with the Fare Rules , the Privacy Policy , the User Agreement and Terms of Service of Make Your Trip</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 110,}}>
                <TouchableOpacity onPress={props.onshowmodal2} disabled={props.FormValidity}>
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
            
          </View>
        </Modal>

        {/*Payment Page */}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible2}>
          
          <View style={{ flexDirection: 'row', backgroundColor:'#fff' }}>
            <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal2}  />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Select Payment Mode</Text>
          </View>
          <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1,}} />

        <ScrollView style={{backgroundColor:'#fff'}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
              <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
            </View>
          </View>
          <View style={{marginLeft: 15, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
          </View>
          <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

          <View style={{flexDirection:'row', paddingLeft: 15, paddingVertical: 15, backgroundColor:'lightgrey', marginHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>Payment Options</Text>
              <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 50, justifyContent:'flex-end'}}>
                <Icon name="lock" color="green" size={18} />
                <Text style={{color:'grey', marginLeft: 2}}>Safe and Secure</Text>
              </View>
          </View>

          <View>
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/bhimLogo.png') }} 
                title="UPI BHIM" titleStyle={{color:'grey', fontSize: 16}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="ios-card" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Credit/Debit/ATM Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-calculator" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="EMI" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<FontAwesome name="bank" size={19} style={{marginLeft: 7}} color="grey"/>}
                title="Net Banking" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-gift" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Gift Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-wallet" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Mobile Wallet" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/paypalLogo.png') }} 
                title="Paypal" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/amazonLogo.jpg') }} 
                title="Amazon Pay" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
            </TouchableOpacity>
          
          </View>

          <View style={{flexDirection: 'row',backgroundColor: '#43464a', height: 40, paddingTop: 4 }}>       
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)}</Text>
              <Text style={{color:'grey', marginLeft: 5, paddingTop: 4}}>Due Now</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal3} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 4 }}/>
            </View>

        </ScrollView>
        
        </Modal>

        {/*Fare Brekaup Final Page */}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible3}>
          <View style={{ backgroundColor: '#fff', height: 500, marginTop: 400 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row', backgroundColor:'#4677d4', paddingVertical: 10, marginRight: 20}}>
              <TouchableOpacity onPress={props.onshowmodal3}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Total Fare</Text>
                <Text style={{ marginLeft: 190 }}>₹ {totalAmount}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, flexDirection: 'row'}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Fee & Surcharges</Text>
                <Text style={{ marginLeft: 150 }}>₹ {(tax).toFixed(0)}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Convenience Fee*</Text>
                <Text style={{ marginLeft: 150 }}>₹ {convinenceFee}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, marginBottom: 10}}/>
            </View>
            <View style={{marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ fontSize: 22, marginRight: 140, fontWeight: '900' }}>DUE NOW</Text>
                <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)} </Text>
              </View>
              <Text style={{color:'grey', fontSize: 13}}>Price of inclusive GST wherever indicated *</Text>
            </View>
          </View>
        </Modal>

        {/*Final Review Page for booking*/}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible4}>
          <View style={{ backgroundColor: '#fff', height: 450, marginTop: 400, borderColor:'grey', borderWidth: 4 }}>

            <View style={{flexDirection:'row', alignSelf:'center', backgroundColor:'lightblue', paddingHorizontal: 40, paddingVertical: 8, marginTop: 5}}>
              <Text style={{ fontSize: 20,justifyContent: 'center',fontWeight: 'bold', alignSelf:'center', alignContent:'center', alignItems:'center'}}>CONFIRM YOUR BOOKING</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4, marginBottom: 10 }}/>

            <View>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/indigo.png')} style={{width:60, height: 45, marginLeft: 20}}/>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight:'bold', fontSize: 18}}>{flight.name} | <Text style={{color:'grey', fontSize: 16}}>{flight.number}</Text></Text>
                  <Text style={{fontWeight:'bold', marginTop: 2, fontSize: 16, opacity:0.7}}>Departure - {props.departDate}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 20, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint} | <Text style={{color:'grey', fontSize: 15}}>{flight.category}</Text></Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>

            <View style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
              <Text style={{marginLeft: 20, color:'grey', fontSize: 16}}>{props.age} yrs | {props.gender}</Text>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>
             
            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 5, marginHorizontal: 10}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 90}}>
                <TouchableOpacity onPress={props.onshowmodal5} >
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONFIRM</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        {/*Booking Page*/ }
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible5}>
          <View style={{backgroundColor:'#fff', height: 1000,}}>
          <ScrollView style={{marginBottom: 0}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop: 7, marginBottom: 20, marginRight: 10, marginLeft:5}}>
              <TouchableOpacity onPress={props.onPress()}>
                <Icon name='close' size={28} onPress={props.navigation1}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 7, marginBottom: 20}}>Booking Confirmed !</Text>
            <View style={{marginTop: 9, marginBottom: 20, marginLeft: 60}}>
              <Icon name='share' onPress={() => shareBooking(flight.name)} />
            </View>
          </View>

          <View style={{marginLeft: 15, marginRight: 15}}>

            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 16, opacity:0.8, marginLeft: 2}}>Trip ID: {Id}</Text>
              <Image source={require('../images/logo.png')} style={{height: 20, width: 40, marginLeft: 57, marginRight: 2}}/>
              <Text style={{fontSize: 18, fontWeight:'bold'}}>Make Your Trip</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 18, opacity:0.8, marginLeft: 2}}>{props.originPoint} to {props.destinationPoint}</Text>
              <Text style={{fontSize: 15, fontWeight:'bold', marginLeft: 10, opacity:0.8}}>{props.departDate}</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View><Image
                  source={require('../images/indigo.png')}
                  style={{ width: 45, height: 45, marginRight: 7 }}
                /></View>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>{flight.name} </Text>
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 3 }}>| {flight.number}</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize: 15}}>TICKET PNR - <Text style={{fontWeight:'normal'}}>Z71QW92</Text></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems:'center' }}>
                <View style={{ marginLeft: 50, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.originPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal}</Text>
                </View>

                <View style={{width: 70, marginRight: 20 }}>
                  <Ionicons name="ios-clock" size={25} style={{textAlign:'center'}} color="grey"/>
                  <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
                  <Text style={{ fontSize: 14, color: 'grey', textAlign: 'center', marginTop: 3 }}>{props.class}</Text>
                </View>

                <View style={{ marginRight: 10, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.destinationPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal1}</Text>
                </View>
              </View>
            </View>

            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 14}}>Baggage info – Check-in: 20 Kgs, Cabin: 7 Kgs</Text>

          </View>
          <Divider style={{height: 2, marginTop: 10, marginHorizontal: 15, marginBottom: 7}}/>
            
          <View style={{flexDirection:'row', marginLeft: 20}}>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 15}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>TRAVELLERS</Text>
              <View style={{flexDirection:'row', marginTop: 5}}>
                <FontAwesome size={20} name="user"/>
                <Text style={{marginLeft: 4, fontSize: 16}}>Mr. {props.firstName}{props.middleName} {props.lastName}</Text>
              </View>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingLeft: 10,paddingRight: 10,  alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Age</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.age} yrs</Text>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 10, paddingLeft: 10, alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Gender</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.gender}</Text>
            </View>
          </View>
          <Text style={{marginLeft: 20, marginTop: 15}}>Total Amount Paid - ₹ {paidAmount}</Text>
          <Text style={{marginLeft: 20}}>Email - {props.email}</Text>
          <Text style={{marginLeft: 20}}>Contact No. {props.countryCode} {props.phone}</Text>
          <Divider  style={{marginTop: 10, height: 2}}/>

          <View style={{marginTop: 15, marginLeft:12}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>IMPORTANT INFORMATION</Text>
            <Text style={{fontSize: 12}}>1) Use your Trip ID {Id} for all communication with Make Your Trip about this booking.</Text>
            <Text style={{fontSize: 12}}>2) Check-in counters at all airports close 45 minutes before departure</Text>
            <Text style={{fontSize: 12}}>3) A printed copy of this e-ticket or e-ticket display on laptop, tablet or phone must be presented at the time of check-in.</Text>
            <Text style={{fontSize: 12, marginRight:5}}>4) It is mandatory to carry government recognized photo identification (ID) with your e-ticket at the time of check-in. For infant passenger's, it is mandatory to carry the date of birth certificate</Text>
            <Text style={{fontSize: 12}}>5) For any further assistance, you can log on to makeyourtrip.com/support page or access all your trips in your account on Make your trip website or mobile app.</Text>
          </View>
          
          <Divider style={{marginTop: 10, height: 2, marginHorizontal: 10}}/>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{fontWeight:'bold', marginLeft: 10}}>Need Assistance with the Trip ?</Text>
            <Text style={{marginBottom: 10, marginLeft: 10}}>Go to www.makeyourtrip.com/support</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name="phone"/>
              <Text style={{fontWeight:'bold', marginLeft: 5}}>{flight.name} Helpline</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('1800222555', true)}>
                <Text style={{marginLeft: 5}}>1800 222 555</Text>
              </TouchableOpacity>
            </View>
          </View>

          </ScrollView>
          </View>
        </Modal>

      </ScrollView>

      </View>
    );
  }  
  if (flight != null && flight.name==="Air India") {
    return (
      <View style={{marginBottom: 51.5}}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'navigate-before' : 'keyboard-backspace'}size={30} onPress={props.navigation} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Review your Flight</Text>
          <View style={{marginLeft: 120}}>
            <Icon name='share' onPress={() => shareFlight(flight.name)}/>
          </View>
        </View>
        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

      <ScrollView style={{ marginBottom: 51.5 }}>
      
        <View> 
          
        <View style={{ marginBottom: 5, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ backgroundColor: '#505459', width: 120, height: 50 }}>
            <Text style={{fontSize: 17,textAlign: 'center',paddingTop: 5,color: '#b8bbbf',}}>DEPART</Text>
            <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',opacity: 0.8,paddingHorizontal: 6,textAlign: 'center',}}>{props.departDate}</Text>
          </View>
          <View style={{ marginLeft: 13, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{flight.category} | {flight.duration} | {props.class}</Text>
          </View>
        </View>

        <Divider style={{ marginBottom: 10, marginTop: 7, marginHorizontal: 15 }}/>

        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Image
              source={require('../images/airindia.png')}
              style={{ width: 45, height: 45, marginRight: 7 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{flight.name} </Text>
            <Text style={{ color: 'grey', fontSize: 17, marginTop: 13 }}>| {flight.number}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start', width: 140 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.originPoint}</Text>
              <Text style={{ color: 'black', opacity: 0.8 }}>{flight.originAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
              <Divider />
            </View>

            <View style={{ alignItems: 'flex-end', width: 140, marginRight: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.destinationPoint}</Text>
              <Text style={{ textAlign: 'right' }}>  {flight.destinationAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal1}</Text>
            </View>
          </View>
        </View>

        <Card>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Fare Type</Text>
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Cabin Baggage 7 Kgs, Check-in baggage included
            </Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Cancellation Fees Apply</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Date Change Chargeable</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Free seats available in Business lounge
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'lightgreen',
              padding: 4,
              marginVertical: 5,
            }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Upgrade your fares to enjoy Additional benifits
            </Text>
          </View>
        </Card>

        <Divider style={{ marginTop: 7, marginHorizontal: 15 }} />

        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 23 }}>
              <FontAwesome
                name="briefcase"
                size={20}
                style={{ opacity: 0.7 }}
              />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Cabin Bag - 7 Kgs
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginLeft: 23, marginTop: 5 }}>
              <FontAwesome name="suitcase" size={20} style={{ opacity: 0.7 }} />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Check-in bag - 20 Kgs{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: '#dfff',marginVertical: 10,marginLeft: 15,marginRight: 20,}}>
          <View style={{flexDirection: 'row',marginLeft: 10,marginTop: 10,marginBottom: 10,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fly Faster with Fast Forward</Text>
            <FontAwesome name="suitcase" style={{ color: 'blue', alignSelf: 'center', marginLeft: 10 }} size={17} />
          </View>
          <View style={{ marginLeft: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16.5, marginRight: 15, color: 'grey' }}>Check-in at dedicated priority counters at {props.originPoint} andget your bags out before anyone else at the Destination .</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 1, fontSize: 16, color: 'black' }}>₹ 400</Text>
              <TouchableOpacity>
                <Text style={{color: 'blue',marginLeft: 210,fontWeight: 'bold',fontSize: 16.5,}}>+ ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

        <View
          style={{
            marginHorizontal: 15,
            borderColor: 'grey',
            borderWidth: 1,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
            backgroundColor: '#e0ba94',
            borderRadius: 20,
          }}>
          <LinearGradient
            colors={['#f56c42', '#e66c25']}
            style={{
              height: 16,
              width: 175,
              borderRadius: Platform.OS === 'ios' ? 12 : 50,
              marginLeft: 0,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 0,
                color: 'white',
                fontWeight: 'bold',
              }}>
              IMPORTANT INFORMATION
            </Text>
          </LinearGradient>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Mandatory check-list for passengers:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>1.</Text>{' '}
                Certify your health status through the Aarogya Setu app or the
                self-declaration form at the airport.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>2.</Text>{' '}
                Remember to do web check-in before arriving at the airport.
                Please do carry a printed or soft copy of the boarding pass.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>3.</Text>{' '}
                Please reach at least 2 hours prior to flight departure.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>4.</Text>{' '}
                No meal service will be available on-board.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>5.</Text>{' '}
                Face masks are compulsory. We urge you to carry your own.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>6.</Text>{' '}
                Remember to download the baggage tag(s) and affix it on your
                bag(s).
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Baggage Information:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                Carry no more than 1 check-in baggage and 1 hand baggage per
                passenger. The free check-in baggage allowance is 20 kgs, extra
                baggage can be availed at an additional cost.
              </Text>
            </View>
          </View>
        </View>

        <Divider style={{
            marginTop: 7,
            marginHorizontal: 5,
            marginBottom: 10,
            height: 3,
          }}/>

        <View>
          <Text style={{ fontSize: 21, opacity: 0.6, marginLeft: 15 }}>
            Cancellation & Date change charges
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <View style={{ width: 230 }}>
              <Text
                style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
                Cancellation Fees Apply
              </Text>
              <Text>
                A penalty of upto ₹{' '}
                {(totalAmount + tax - (totalAmount + tax) / 3).toFixed(0)} will
                be charged by the airline & by Make Your Trip based on how close
                to the departure date you cancel.
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  marginTop: 18,
                  fontSize: 19,
                  color: 'grey',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                ₹ {((totalAmount + tax) / 3).toFixed(0)}
              </Text>
              <Text style={{ fontSize: 13, textAlign: 'center' }}>
                Approx Refund
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 15,
              color: 'blue',
              fontSize: 16,
              fontWeight: 'bold',
              opacity: 0.7,
            }}>
            VIEW POLICY
          </Text>
        </View>

        <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
            </View>
            <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 110 }}>
            <TouchableOpacity onPress={props.onshowmodal1}>
              <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/*Fare Brekup page 1*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
          <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row',}}>
              <TouchableOpacity onPress={props.onshowmodal}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Base Fare</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Travellers ( {props.travellers} X ₹ {flight.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {totalAmount}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {(tax).toFixed(0)}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        </View>
        
        {/*Travellers Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible1}>
          <View style={{ backgroundColor: '#fff', marginBottom: 51.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal1} /></View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Travellers Details</Text>
            </View>
            <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1.5,}} />
          
          <ScrollView style={{ backgroundColor: '#fff' }}>
            
            <View style={{flexDirection:'row'}}>
              <View>
                <Image source={require('../images/AirIndiaLogo.png')} style={{width: 100, height: 50, marginLeft: 20}}/>
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

            <Text style={{ fontSize: 25, color: 'grey', marginLeft: 20, marginBottom: 10, }}>Traveller Details</Text>

            <View>
              <TextInput
                placeholder="First Name"
                value = {props.firstName}
                onChangeText = {props.firstName1}
                style={{ marginLeft: 20, fontSize: 18, marginRight: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.middleName}
                onChangeText = {props.middleName1}
                placeholder="Middle Name (Optional)"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.lastName}
                onChangeText = {props.lastName1}
                placeholder="Last Name"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />

              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <View>
                  <Text style={{fontSize: 20,color: 'grey',marginTop: 2,marginLeft: 5}}>Gender -</Text>
                  <Picker selectedValue={props.gender} style={{ width: Platform.OS === 'ios' ? 0 : 150, height: Platform.OS === 'ios' ? 0 : 30,}} 
                    onValueChange={props.picker}>
                      <Picker.Item label="Male" value="Male" /><Picker.Item label="Female" value="Female" /><Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10, marginTop: 10 }}>
                  <Input 
                    value = {props.age}
                    onChangeText = {props.age1}
                    placeholder="Age" 
                    keyboardType="number-pad" 
                  />
                </View>
              </View>

              <Text style={{marginLeft: 20, color:'blue', fontSize: 16, fontWeight:'bold', marginBottom: 5}}> + ADD MORE TRAVELLERS</Text>
              
            </View>

            <Divider style={{ marginBottom: 10, marginHorizontal: 5, height: 3 }} />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, color: 'grey' }}>Contact Information</Text>
              <Text style={{ color: 'grey' }}>Your ticket and flights information will be sent here</Text>

              <View style={{ marginRight: 20 }}>
                <Input
                  placeholder="Email"
                  leftIcon={<FontAwesome size={20} name="user-o" />}
                  keyboardType="email-address"
                  value = {props.email}
                  onChangeText = {props.email1}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>  
                <View style={{width: 150,borderRightWidth: 1,borderColor: 'grey'}}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Country Code</Text>
                  <Picker selectedValue={props.countryCode} style={{ width: Platform.OS === 'ios' ? 0 : 190,height: Platform.OS === 'ios' ? 0 : 18,marginLeft: 2,marginTop: 13,}} 
                    onValueChange={props.picker1}>
                      <Picker.Item label="India (+ 91)" value="+91" /><Picker.Item label="Usa (+ 1)" value="+1" /><Picker.Item label="Russia (+ 44)" value="+44" /><Picker.Item label="Honkong (+ 852)" value="+852" /><Picker.Item label="Bhutan (+ 975)" value="+975" /><Picker.Item label="China (+ 86)" value="+86" /><Picker.Item label="Switzerland (+ 41)" value="+41" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Mobile No.</Text>
                  <Input
                    value = {props.phone}
                    onChangeText = {props.phone1}
                    placeholder={props.countryCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

            </View>

            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft: 17}}>
               <CheckBox 
                  value={isSelected1}
                  onValueChange={setSelection1}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6, marginTop: 5}}>
                <Text style={{fontSize: 17}}>GST Number for Business travel (Optional)</Text>
              </View>
            </View>

            <View style={{height: (isSelected1 ? 100 : 0 ), opacity:(isSelected1 ? 1: 0), }} >
              <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 5}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor: 'blue'}}>
                  <TextInput 
                    placeholder="Company Name" 
                    value = {props.companyName}
                    onChangeText = {props.companyName1} />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor:'blue'}}>
                  <TextInput 
                    placeholder="Registration No." keyboardType='number-pad' 
                    onChangeText = {props.registrationNo1} 
                    value = {props.registrationNo}
                  />
                </View>
              </View>
            </View>

            <Divider style={{height: 2, marginHorizontal: 20, marginVertical: 10}} />
            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft:17}}>
                <CheckBox 
                  value={isSelected}
                  onValueChange={setSelection}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6}}>
                <Text>I understand and agree with the Fare Rules , the Privacy Policy , the User Agreement and Terms of Service of Make Your Trip</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 110,}}>
                <TouchableOpacity onPress={props.onshowmodal2} disabled={props.FormValidity}>
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
            
          </View>
        </Modal>

        {/*Payment Page */}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible2}>
          
          <View style={{ flexDirection: 'row', backgroundColor:'#fff' }}>
            <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal2}  />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Select Payment Mode</Text>
          </View>
          <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1,}} />

        <ScrollView style={{backgroundColor:'#fff'}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
              <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
            </View>
          </View>
          <View style={{marginLeft: 15, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
          </View>
          <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

          <View style={{flexDirection:'row', paddingLeft: 15, paddingVertical: 15, backgroundColor:'lightgrey', marginHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>Payment Options</Text>
              <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 50, justifyContent:'flex-end'}}>
                <Icon name="lock" color="green" size={18} />
                <Text style={{color:'grey', marginLeft: 2}}>Safe and Secure</Text>
              </View>
          </View>

          <View>
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/bhimLogo.png') }} 
                title="UPI BHIM" titleStyle={{color:'grey', fontSize: 16}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="ios-card" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Credit/Debit/ATM Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-calculator" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="EMI" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<FontAwesome name="bank" size={19} style={{marginLeft: 7}} color="grey"/>}
                title="Net Banking" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-gift" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Gift Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-wallet" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Mobile Wallet" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/paypalLogo.png') }} 
                title="Paypal" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/amazonLogo.jpg') }} 
                title="Amazon Pay" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
            </TouchableOpacity>
          
          </View>

          <View style={{flexDirection: 'row',backgroundColor: '#43464a', height: 40, paddingTop: 4 }}>       
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)}</Text>
              <Text style={{color:'grey', marginLeft: 5, paddingTop: 4}}>Due Now</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal3} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 4 }}/>
            </View>

        </ScrollView>
        
        </Modal>

        {/*Fare Brekaup Final Page */}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible3}>
          <View style={{ backgroundColor: '#fff', height: 500, marginTop: 400 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row', backgroundColor:'#4677d4', paddingVertical: 10, marginRight: 20}}>
              <TouchableOpacity onPress={props.onshowmodal3}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Total Fare</Text>
                <Text style={{ marginLeft: 190 }}>₹ {totalAmount}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, flexDirection: 'row'}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Fee & Surcharges</Text>
                <Text style={{ marginLeft: 150 }}>₹ {(tax).toFixed(0)}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Convenience Fee*</Text>
                <Text style={{ marginLeft: 150 }}>₹ {convinenceFee}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, marginBottom: 10}}/>
            </View>
            <View style={{marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ fontSize: 22, marginRight: 140, fontWeight: '900' }}>DUE NOW</Text>
                <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)} </Text>
              </View>
              <Text style={{color:'grey', fontSize: 13}}>Price of inclusive GST wherever indicated *</Text>
            </View>
          </View>
        </Modal>

        {/*Final Review Page for booking*/}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible4}>
          <View style={{ backgroundColor: '#fff', height: 450, marginTop: 400, borderColor:'grey', borderWidth: 4 }}>

            <View style={{flexDirection:'row', alignSelf:'center', backgroundColor:'lightblue', paddingHorizontal: 40, paddingVertical: 8, marginTop: 5}}>
              <Text style={{ fontSize: 20,justifyContent: 'center',fontWeight: 'bold', alignSelf:'center', alignContent:'center', alignItems:'center'}}>CONFIRM YOUR BOOKING</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4, marginBottom: 10 }}/>

            <View>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/AirIndiaLogo.png')} style={{width:100, height: 50, marginLeft: 20}}/>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight:'bold', fontSize: 18}}>{flight.name} | <Text style={{color:'grey', fontSize: 16}}>{flight.number}</Text></Text>
                  <Text style={{fontWeight:'bold', marginTop: 2, fontSize: 16, opacity:0.7}}>Departure - {props.departDate}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 20, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint} | <Text style={{color:'grey', fontSize: 15}}>{flight.category}</Text></Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>

            <View style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
              <Text style={{marginLeft: 20, color:'grey', fontSize: 16}}>{props.age} yrs | {props.gender}</Text>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>
             
            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 5, marginHorizontal: 10}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 90}}>
                <TouchableOpacity onPress={props.onshowmodal5} >
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONFIRM</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        {/*Booking Page*/ }
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible5}>
          <View style={{backgroundColor:'#fff', height: 1000,}}>
          <ScrollView style={{marginBottom: 0}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop: 7, marginBottom: 20, marginRight: 10, marginLeft:5}}>
              <TouchableOpacity onPress={props.onPress()}>
                <Icon name='close' size={28} onPress={props.navigation1}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 7, marginBottom: 20}}>Booking Confirmed !</Text>
            <View style={{marginTop: 9, marginBottom: 20, marginLeft: 60}}>
              <Icon name='share' onPress={() => shareBooking(flight.name)} />
            </View>
          </View>

          <View style={{marginLeft: 15, marginRight: 15}}>

            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 16, opacity:0.8, marginLeft: 2}}>Trip ID: {Id}</Text>
              <Image source={require('../images/logo.png')} style={{height: 20, width: 40, marginLeft: 57, marginRight: 2}}/>
              <Text style={{fontSize: 18, fontWeight:'bold'}}>Make Your Trip</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 18, opacity:0.8, marginLeft: 2}}>{props.originPoint} to {props.destinationPoint}</Text>
              <Text style={{fontSize: 15, fontWeight:'bold', marginLeft: 10, opacity:0.8}}>{props.departDate}</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View><Image
                  source={require('../images/AirIndiaLogo.png')}
                  style={{ width: 100, height: 50, marginRight: 7 }}
                /></View>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>{flight.name} </Text>
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 3 }}>| {flight.number}</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize: 15}}>TICKET PNR - <Text style={{fontWeight:'normal'}}>Z71QW92</Text></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems:'center' }}>
                <View style={{ marginLeft: 50, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.originPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal}</Text>
                </View>

                <View style={{width: 70, marginRight: 20 }}>
                  <Ionicons name="ios-clock" size={25} style={{textAlign:'center'}} color="grey"/>
                  <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
                  <Text style={{ fontSize: 14, color: 'grey', textAlign: 'center', marginTop: 3 }}>{props.class}</Text>
                </View>

                <View style={{ marginRight: 10, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.destinationPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal1}</Text>
                </View>
              </View>
            </View>

            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 14}}>Baggage info – Check-in: 20 Kgs, Cabin: 7 Kgs</Text>

          </View>
          <Divider style={{height: 2, marginTop: 10, marginHorizontal: 15, marginBottom: 7}}/>
            
          <View style={{flexDirection:'row', marginLeft: 20}}>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 15}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>TRAVELLERS</Text>
              <View style={{flexDirection:'row', marginTop: 5}}>
                <FontAwesome size={20} name="user"/>
                <Text style={{marginLeft: 4, fontSize: 16}}>Mr. {props.firstName}{props.middleName} {props.lastName}</Text>
              </View>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingLeft: 10,paddingRight: 10,  alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Age</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.age} yrs</Text>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 10, paddingLeft: 10, alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Gender</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.gender}</Text>
            </View>
          </View>
          <Text style={{marginLeft: 20, marginTop: 15}}>Total Amount Paid - ₹ {paidAmount}</Text>
          <Text style={{marginLeft: 20}}>Email - {props.email}</Text>
          <Text style={{marginLeft: 20}}>Contact No. {props.countryCode} {props.phone}</Text>
          <Divider  style={{marginTop: 10, height: 2}}/>

          <View style={{marginTop: 15, marginLeft:12}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>IMPORTANT INFORMATION</Text>
            <Text style={{fontSize: 12}}>1) Use your Trip ID {Id} for all communication with Make Your Trip about this booking.</Text>
            <Text style={{fontSize: 12}}>2) Check-in counters at all airports close 45 minutes before departure</Text>
            <Text style={{fontSize: 12}}>3) A printed copy of this e-ticket or e-ticket display on laptop, tablet or phone must be presented at the time of check-in.</Text>
            <Text style={{fontSize: 12, marginRight:5}}>4) It is mandatory to carry government recognized photo identification (ID) with your e-ticket at the time of check-in. For infant passenger's, it is mandatory to carry the date of birth certificate</Text>
            <Text style={{fontSize: 12}}>5) For any further assistance, you can log on to makeyourtrip.com/support page or access all your trips in your account on Make your trip website or mobile app.</Text>
          </View>
          
          <Divider style={{marginTop: 10, height: 2, marginHorizontal: 10}}/>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{fontWeight:'bold', marginLeft: 10}}>Need Assistance with the Trip ?</Text>
            <Text style={{marginBottom: 10, marginLeft: 10}}>Go to www.makeyourtrip.com/support</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name="phone"/>
              <Text style={{fontWeight:'bold', marginLeft: 5}}>{flight.name} Helpline</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('1800222555', true)}>
                <Text style={{marginLeft: 5}}>1800 222 555</Text>
              </TouchableOpacity>
            </View>
          </View>

          </ScrollView>
          </View>
        </Modal>

      </ScrollView>

      </View>
    );
  } 
  if (flight != null && flight.name==="SpiceJet") {
    return (
      <View style={{marginBottom: 51.5}}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'navigate-before' : 'keyboard-backspace'}size={30} onPress={props.navigation} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Review your Flight</Text>
          <View style={{marginLeft: 120}}>
            <Icon name='share' onPress={() => shareFlight(flight.name)}/>
          </View>
        </View>
        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

      <ScrollView style={{ marginBottom: 51.5 }}>
      
        <View> 
          
        <View style={{ marginBottom: 5, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ backgroundColor: '#505459', width: 120, height: 50 }}>
            <Text style={{fontSize: 17,textAlign: 'center',paddingTop: 5,color: '#b8bbbf',}}>DEPART</Text>
            <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',opacity: 0.8,paddingHorizontal: 6,textAlign: 'center',}}>{props.departDate}</Text>
          </View>
          <View style={{ marginLeft: 13, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{flight.category} | {flight.duration} | {props.class}</Text>
          </View>
        </View>

        <Divider style={{ marginBottom: 10, marginTop: 7, marginHorizontal: 15 }}/>

        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Image
              source={require('../images/spicejet.png')}
              style={{ width: 45, height: 45, marginRight: 7 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{flight.name} </Text>
            <Text style={{ color: 'grey', fontSize: 17, marginTop: 13 }}>| {flight.number}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start', width: 140 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.originPoint}</Text>
              <Text style={{ color: 'black', opacity: 0.8 }}>{flight.originAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
              <Divider />
            </View>

            <View style={{ alignItems: 'flex-end', width: 140, marginRight: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.destinationPoint}</Text>
              <Text style={{ textAlign: 'right' }}>  {flight.destinationAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal1}</Text>
            </View>
          </View>
        </View>

        <Card>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Fare Type</Text>
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Cabin Baggage 7 Kgs, Check-in baggage included
            </Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Cancellation Fees Apply</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Date Change Chargeable</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Free seats available in Business lounge
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'lightgreen',
              padding: 4,
              marginVertical: 5,
            }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Upgrade your fares to enjoy Additional benifits
            </Text>
          </View>
        </Card>

        <Divider style={{ marginTop: 7, marginHorizontal: 15 }} />

        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 23 }}>
              <FontAwesome
                name="briefcase"
                size={20}
                style={{ opacity: 0.7 }}
              />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Cabin Bag - 7 Kgs
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginLeft: 23, marginTop: 5 }}>
              <FontAwesome name="suitcase" size={20} style={{ opacity: 0.7 }} />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Check-in bag - 20 Kgs{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: '#dfff',marginVertical: 10,marginLeft: 15,marginRight: 20,}}>
          <View style={{flexDirection: 'row',marginLeft: 10,marginTop: 10,marginBottom: 10,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fly Faster with Fast Forward</Text>
            <FontAwesome name="suitcase" style={{ color: 'blue', alignSelf: 'center', marginLeft: 10 }} size={17} />
          </View>
          <View style={{ marginLeft: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16.5, marginRight: 15, color: 'grey' }}>Check-in at dedicated priority counters at {props.originPoint} andget your bags out before anyone else at the Destination .</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 1, fontSize: 16, color: 'black' }}>₹ 400</Text>
              <TouchableOpacity>
                <Text style={{color: 'blue',marginLeft: 210,fontWeight: 'bold',fontSize: 16.5,}}>+ ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

        <View
          style={{
            marginHorizontal: 15,
            borderColor: 'grey',
            borderWidth: 1,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
            backgroundColor: '#e0ba94',
            borderRadius: 20,
          }}>
          <LinearGradient
            colors={['#f56c42', '#e66c25']}
            style={{
              height: 16,
              width: 175,
              borderRadius: Platform.OS === 'ios' ? 12 : 50,
              marginLeft: 0,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 0,
                color: 'white',
                fontWeight: 'bold',
              }}>
              IMPORTANT INFORMATION
            </Text>
          </LinearGradient>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Mandatory check-list for passengers:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>1.</Text>{' '}
                Certify your health status through the Aarogya Setu app or the
                self-declaration form at the airport.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>2.</Text>{' '}
                Remember to do web check-in before arriving at the airport.
                Please do carry a printed or soft copy of the boarding pass.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>3.</Text>{' '}
                Please reach at least 2 hours prior to flight departure.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>4.</Text>{' '}
                No meal service will be available on-board.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>5.</Text>{' '}
                Face masks are compulsory. We urge you to carry your own.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>6.</Text>{' '}
                Remember to download the baggage tag(s) and affix it on your
                bag(s).
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Baggage Information:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                Carry no more than 1 check-in baggage and 1 hand baggage per
                passenger. The free check-in baggage allowance is 20 kgs, extra
                baggage can be availed at an additional cost.
              </Text>
            </View>
          </View>
        </View>

        <Divider style={{
            marginTop: 7,
            marginHorizontal: 5,
            marginBottom: 10,
            height: 3,
          }}/>

        <View>
          <Text style={{ fontSize: 21, opacity: 0.6, marginLeft: 15 }}>
            Cancellation & Date change charges
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <View style={{ width: 230 }}>
              <Text
                style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
                Cancellation Fees Apply
              </Text>
              <Text>
                A penalty of upto ₹{' '}
                {(totalAmount + tax - (totalAmount + tax) / 3).toFixed(0)} will
                be charged by the airline & by Make Your Trip based on how close
                to the departure date you cancel.
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  marginTop: 18,
                  fontSize: 19,
                  color: 'grey',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                ₹ {((totalAmount + tax) / 3).toFixed(0)}
              </Text>
              <Text style={{ fontSize: 13, textAlign: 'center' }}>
                Approx Refund
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 15,
              color: 'blue',
              fontSize: 16,
              fontWeight: 'bold',
              opacity: 0.7,
            }}>
            VIEW POLICY
          </Text>
        </View>

        <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
            </View>
            <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 110 }}>
            <TouchableOpacity onPress={props.onshowmodal1}>
              <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/*Fare Brekup page 1*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
          <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row',}}>
              <TouchableOpacity onPress={props.onshowmodal}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Base Fare</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Travellers ( {props.travellers} X ₹ {flight.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {totalAmount}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {(tax).toFixed(0)}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        </View>
        
        {/*Travellers Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible1}>
          <View style={{ backgroundColor: '#fff', marginBottom: 51.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal1} /></View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Travellers Details</Text>
            </View>
            <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1.5,}} />
          
          <ScrollView style={{ backgroundColor: '#fff' }}>
            
            <View style={{flexDirection:'row'}}>
              <View>
                <Image source={require('../images/spicejet.png')} style={{width: 100, height: 50, marginLeft: 20}}/>
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

            <Text style={{ fontSize: 25, color: 'grey', marginLeft: 20, marginBottom: 10, }}>Traveller Details</Text>

            <View>
              <TextInput
                placeholder="First Name"
                value = {props.firstName}
                onChangeText = {props.firstName1}
                style={{ marginLeft: 20, fontSize: 18, marginRight: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.middleName}
                onChangeText = {props.middleName1}
                placeholder="Middle Name (Optional)"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.lastName}
                onChangeText = {props.lastName1}
                placeholder="Last Name"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />

              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <View>
                  <Text style={{fontSize: 20,color: 'grey',marginTop: 2,marginLeft: 5}}>Gender -</Text>
                  <Picker selectedValue={props.gender} style={{ width: Platform.OS === 'ios' ? 0 : 150, height: Platform.OS === 'ios' ? 0 : 30,}} 
                    onValueChange={props.picker}>
                      <Picker.Item label="Male" value="Male" /><Picker.Item label="Female" value="Female" /><Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10, marginTop: 10 }}>
                  <Input 
                    value = {props.age}
                    onChangeText = {props.age1}
                    placeholder="Age" 
                    keyboardType="number-pad" 
                  />
                </View>
              </View>

              <Text style={{marginLeft: 20, color:'blue', fontSize: 16, fontWeight:'bold', marginBottom: 5}}> + ADD MORE TRAVELLERS</Text>
              
            </View>

            <Divider style={{ marginBottom: 10, marginHorizontal: 5, height: 3 }} />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, color: 'grey' }}>Contact Information</Text>
              <Text style={{ color: 'grey' }}>Your ticket and flights information will be sent here</Text>

              <View style={{ marginRight: 20 }}>
                <Input
                  placeholder="Email"
                  leftIcon={<FontAwesome size={20} name="user-o" />}
                  keyboardType="email-address"
                  value = {props.email}
                  onChangeText = {props.email1}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>  
                <View style={{width: 150,borderRightWidth: 1,borderColor: 'grey'}}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Country Code</Text>
                  <Picker selectedValue={props.countryCode} style={{ width: Platform.OS === 'ios' ? 0 : 190,height: Platform.OS === 'ios' ? 0 : 18,marginLeft: 2,marginTop: 13,}} 
                    onValueChange={props.picker1}>
                      <Picker.Item label="India (+ 91)" value="+91" /><Picker.Item label="Usa (+ 1)" value="+1" /><Picker.Item label="Russia (+ 44)" value="+44" /><Picker.Item label="Honkong (+ 852)" value="+852" /><Picker.Item label="Bhutan (+ 975)" value="+975" /><Picker.Item label="China (+ 86)" value="+86" /><Picker.Item label="Switzerland (+ 41)" value="+41" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Mobile No.</Text>
                  <Input
                    value = {props.phone}
                    onChangeText = {props.phone1}
                    placeholder={props.countryCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

            </View>

            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft: 17}}>
               <CheckBox 
                  value={isSelected1}
                  onValueChange={setSelection1}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6, marginTop: 5}}>
                <Text style={{fontSize: 17}}>GST Number for Business travel (Optional)</Text>
              </View>
            </View>

            <View style={{height: (isSelected1 ? 100 : 0 ), opacity:(isSelected1 ? 1: 0), }} >
              <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 5}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor: 'blue'}}>
                  <TextInput 
                    placeholder="Company Name" 
                    value = {props.companyName}
                    onChangeText = {props.companyName1} />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor:'blue'}}>
                  <TextInput 
                    placeholder="Registration No." keyboardType='number-pad' 
                    onChangeText = {props.registrationNo1} 
                    value = {props.registrationNo}
                  />
                </View>
              </View>
            </View>

            <Divider style={{height: 2, marginHorizontal: 20, marginVertical: 10}} />
            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft:17}}>
                <CheckBox 
                  value={isSelected}
                  onValueChange={setSelection}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6}}>
                <Text>I understand and agree with the Fare Rules , the Privacy Policy , the User Agreement and Terms of Service of Make Your Trip</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 110,}}>
                <TouchableOpacity onPress={props.onshowmodal2} disabled={props.FormValidity}>
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
            
          </View>
        </Modal>

        {/*Payment Page */}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible2}>
          
          <View style={{ flexDirection: 'row', backgroundColor:'#fff' }}>
            <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal2}  />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Select Payment Mode</Text>
          </View>
          <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1,}} />

        <ScrollView style={{backgroundColor:'#fff'}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
              <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
            </View>
          </View>
          <View style={{marginLeft: 15, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
          </View>
          <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

          <View style={{flexDirection:'row', paddingLeft: 15, paddingVertical: 15, backgroundColor:'lightgrey', marginHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>Payment Options</Text>
              <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 50, justifyContent:'flex-end'}}>
                <Icon name="lock" color="green" size={18} />
                <Text style={{color:'grey', marginLeft: 2}}>Safe and Secure</Text>
              </View>
          </View>

          <View>
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/bhimLogo.png') }} 
                title="UPI BHIM" titleStyle={{color:'grey', fontSize: 16}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="ios-card" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Credit/Debit/ATM Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-calculator" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="EMI" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<FontAwesome name="bank" size={19} style={{marginLeft: 7}} color="grey"/>}
                title="Net Banking" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-gift" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Gift Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-wallet" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Mobile Wallet" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/paypalLogo.png') }} 
                title="Paypal" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/amazonLogo.jpg') }} 
                title="Amazon Pay" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
            </TouchableOpacity>
          
          </View>

          <View style={{flexDirection: 'row',backgroundColor: '#43464a', height: 40, paddingTop: 4 }}>       
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)}</Text>
              <Text style={{color:'grey', marginLeft: 5, paddingTop: 4}}>Due Now</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal3} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 4 }}/>
            </View>

        </ScrollView>
        
        </Modal>

        {/*Fare Brekaup Final Page */}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible3}>
          <View style={{ backgroundColor: '#fff', height: 500, marginTop: 400 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row', backgroundColor:'#4677d4', paddingVertical: 10, marginRight: 20}}>
              <TouchableOpacity onPress={props.onshowmodal3}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Total Fare</Text>
                <Text style={{ marginLeft: 190 }}>₹ {totalAmount}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, flexDirection: 'row'}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Fee & Surcharges</Text>
                <Text style={{ marginLeft: 150 }}>₹ {(tax).toFixed(0)}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Convenience Fee*</Text>
                <Text style={{ marginLeft: 150 }}>₹ {convinenceFee}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, marginBottom: 10}}/>
            </View>
            <View style={{marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ fontSize: 22, marginRight: 140, fontWeight: '900' }}>DUE NOW</Text>
                <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)} </Text>
              </View>
              <Text style={{color:'grey', fontSize: 13}}>Price of inclusive GST wherever indicated *</Text>
            </View>
          </View>
        </Modal>

        {/*Final Review Page for booking*/}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible4}>
          <View style={{ backgroundColor: '#fff', height: 450, marginTop: 400, borderColor:'grey', borderWidth: 4 }}>

            <View style={{flexDirection:'row', alignSelf:'center', backgroundColor:'lightblue', paddingHorizontal: 40, paddingVertical: 8, marginTop: 5}}>
              <Text style={{ fontSize: 20,justifyContent: 'center',fontWeight: 'bold', alignSelf:'center', alignContent:'center', alignItems:'center'}}>CONFIRM YOUR BOOKING</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4, marginBottom: 10 }}/>

            <View>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/spicejet.png')} style={{width:100, height: 50, marginLeft: 20}}/>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight:'bold', fontSize: 18}}>{flight.name} | <Text style={{color:'grey', fontSize: 16}}>{flight.number}</Text></Text>
                  <Text style={{fontWeight:'bold', marginTop: 2, fontSize: 16, opacity:0.7}}>Departure - {props.departDate}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 20, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint} | <Text style={{color:'grey', fontSize: 15}}>{flight.category}</Text></Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>

            <View style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
              <Text style={{marginLeft: 20, color:'grey', fontSize: 16}}>{props.age} yrs | {props.gender}</Text>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>
             
            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 5, marginHorizontal: 10}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 90}}>
                <TouchableOpacity onPress={props.onshowmodal5} >
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONFIRM</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        {/*Booking Page*/ }
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible5}>
          <View style={{backgroundColor:'#fff', height: 1000,}}>
          <ScrollView style={{marginBottom: 0}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop: 7, marginBottom: 20, marginRight: 10, marginLeft:5}}>
              <TouchableOpacity onPress={props.onPress()}>
                <Icon name='close' size={28} onPress={props.navigation1}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 7, marginBottom: 20}}>Booking Confirmed !</Text>
            <View style={{marginTop: 9, marginBottom: 20, marginLeft: 60}}>
              <Icon name='share' onPress={() => shareBooking(flight.name)} />
            </View>
          </View>

          <View style={{marginLeft: 15, marginRight: 15}}>

            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 16, opacity:0.8, marginLeft: 2}}>Trip ID: {Id}</Text>
              <Image source={require('../images/logo.png')} style={{height: 20, width: 40, marginLeft: 57, marginRight: 2}}/>
              <Text style={{fontSize: 18, fontWeight:'bold'}}>Make Your Trip</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 18, opacity:0.8, marginLeft: 2}}>{props.originPoint} to {props.destinationPoint}</Text>
              <Text style={{fontSize: 15, fontWeight:'bold', marginLeft: 10, opacity:0.8}}>{props.departDate}</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View><Image
                  source={require('../images/spicejet.png')}
                  style={{ width: 100, height: 50, marginRight: 7 }}
                /></View>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>{flight.name} </Text>
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 3 }}>| {flight.number}</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize: 15}}>TICKET PNR - <Text style={{fontWeight:'normal'}}>Z71QW92</Text></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems:'center' }}>
                <View style={{ marginLeft: 50, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.originPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal}</Text>
                </View>

                <View style={{width: 70, marginRight: 20 }}>
                  <Ionicons name="ios-clock" size={25} style={{textAlign:'center'}} color="grey"/>
                  <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
                  <Text style={{ fontSize: 14, color: 'grey', textAlign: 'center', marginTop: 3 }}>{props.class}</Text>
                </View>

                <View style={{ marginRight: 10, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.destinationPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal1}</Text>
                </View>
              </View>
            </View>

            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 14}}>Baggage info – Check-in: 20 Kgs, Cabin: 7 Kgs</Text>

          </View>
          <Divider style={{height: 2, marginTop: 10, marginHorizontal: 15, marginBottom: 7}}/>
            
          <View style={{flexDirection:'row', marginLeft: 20}}>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 15}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>TRAVELLERS</Text>
              <View style={{flexDirection:'row', marginTop: 5}}>
                <FontAwesome size={20} name="user"/>
                <Text style={{marginLeft: 4, fontSize: 16}}>Mr. {props.firstName}{props.middleName} {props.lastName}</Text>
              </View>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingLeft: 10,paddingRight: 10,  alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Age</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.age} yrs</Text>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 10, paddingLeft: 10, alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Gender</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.gender}</Text>
            </View>
          </View>
          <Text style={{marginLeft: 20, marginTop: 15}}>Total Amount Paid - ₹ {paidAmount}</Text>
          <Text style={{marginLeft: 20}}>Email - {props.email}</Text>
          <Text style={{marginLeft: 20}}>Contact No. {props.countryCode} {props.phone}</Text>
          <Divider  style={{marginTop: 10, height: 2}}/>

          <View style={{marginTop: 15, marginLeft:12}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>IMPORTANT INFORMATION</Text>
            <Text style={{fontSize: 12}}>1) Use your Trip ID {Id} for all communication with Make Your Trip about this booking.</Text>
            <Text style={{fontSize: 12}}>2) Check-in counters at all airports close 45 minutes before departure</Text>
            <Text style={{fontSize: 12}}>3) A printed copy of this e-ticket or e-ticket display on laptop, tablet or phone must be presented at the time of check-in.</Text>
            <Text style={{fontSize: 12, marginRight:5}}>4) It is mandatory to carry government recognized photo identification (ID) with your e-ticket at the time of check-in. For infant passenger's, it is mandatory to carry the date of birth certificate</Text>
            <Text style={{fontSize: 12}}>5) For any further assistance, you can log on to makeyourtrip.com/support page or access all your trips in your account on Make your trip website or mobile app.</Text>
          </View>
          
          <Divider style={{marginTop: 10, height: 2, marginHorizontal: 10}}/>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{fontWeight:'bold', marginLeft: 10}}>Need Assistance with the Trip ?</Text>
            <Text style={{marginBottom: 10, marginLeft: 10}}>Go to www.makeyourtrip.com/support</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name="phone"/>
              <Text style={{fontWeight:'bold', marginLeft: 5}}>{flight.name} Helpline</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('1800222555', true)}>
                <Text style={{marginLeft: 5}}>1800 222 555</Text>
              </TouchableOpacity>
            </View>
          </View>

          </ScrollView>
          </View>
        </Modal>

      </ScrollView>

      </View>
    );
  }
  if (flight != null && flight.name==="Go Air") {
    return (
      <View style={{marginBottom: 51.5}}>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'navigate-before' : 'keyboard-backspace'}size={30} onPress={props.navigation} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Review your Flight</Text>
          <View style={{marginLeft: 120}}>
            <Icon name='share' onPress={() => shareFlight(flight.name)}/>
          </View>
        </View>
        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

      <ScrollView style={{ marginBottom: 51.5 }}>
      
        <View> 
          
        <View style={{ marginBottom: 5, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ backgroundColor: '#505459', width: 120, height: 50 }}>
            <Text style={{fontSize: 17,textAlign: 'center',paddingTop: 5,color: '#b8bbbf',}}>DEPART</Text>
            <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',opacity: 0.8,paddingHorizontal: 6,textAlign: 'center',}}>{props.departDate}</Text>
          </View>
          <View style={{ marginLeft: 13, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>{flight.category} | {flight.duration} | {props.class}</Text>
          </View>
        </View>

        <Divider style={{ marginBottom: 10, marginTop: 7, marginHorizontal: 15 }}/>

        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Image
              source={require('../images/goAir.png')}
              style={{ width: 45, height: 45, marginRight: 7 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{flight.name} </Text>
            <Text style={{ color: 'grey', fontSize: 17, marginTop: 13 }}>| {flight.number}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-start', width: 140 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.originPoint}</Text>
              <Text style={{ color: 'black', opacity: 0.8 }}>{flight.originAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
              <Divider />
            </View>

            <View style={{ alignItems: 'flex-end', width: 140, marginRight: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
              <Text style={{ fontSize: 12, color: 'grey', opacity: 0.7 }}>{props.departDate}</Text>
              <Text style={{ fontSize: 14, color: 'grey' }}>{props.destinationPoint}</Text>
              <Text style={{ textAlign: 'right' }}>  {flight.destinationAirport}</Text>
              <Text style={{ fontSize: 13, color: 'grey', opacity: 0.7 }}>Terminal {flight.terminal1}</Text>
            </View>
          </View>
        </View>

        <Card>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Fare Type</Text>
          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Cabin Baggage 7 Kgs, Check-in baggage included
            </Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Cancellation Fees Apply</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>Date Change Chargeable</Text>
          </View>
          <View style={{ marginTop: 7, flexDirection: 'row' }}>
            <Icon
              name="check-circle"
              color="green"
              size={17}
              style={{ opacity: 0.6, alignSelf: 'flex-start', marginRight: 5 }}
            />
            <Text style={{ fontSize: 14 }}>
              Free seats available in Business lounge
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'lightgreen',
              padding: 4,
              marginVertical: 5,
            }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Upgrade your fares to enjoy Additional benifits
            </Text>
          </View>
        </Card>

        <Divider style={{ marginTop: 7, marginHorizontal: 15 }} />

        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 23 }}>
              <FontAwesome
                name="briefcase"
                size={20}
                style={{ opacity: 0.7 }}
              />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Cabin Bag - 7 Kgs
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginLeft: 23, marginTop: 5 }}>
              <FontAwesome name="suitcase" size={20} style={{ opacity: 0.7 }} />
              <Text style={{ color: 'grey', marginLeft: 10 }}>
                Check-in bag - 20 Kgs{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: '#dfff',marginVertical: 10,marginLeft: 15,marginRight: 20,}}>
          <View style={{flexDirection: 'row',marginLeft: 10,marginTop: 10,marginBottom: 10,}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fly Faster with Fast Forward</Text>
            <FontAwesome name="suitcase" style={{ color: 'blue', alignSelf: 'center', marginLeft: 10 }} size={17} />
          </View>
          <View style={{ marginLeft: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16.5, marginRight: 15, color: 'grey' }}>Check-in at dedicated priority counters at {props.originPoint} andget your bags out before anyone else at the Destination .</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 1, fontSize: 16, color: 'black' }}>₹ 400</Text>
              <TouchableOpacity>
                <Text style={{color: 'blue',marginLeft: 210,fontWeight: 'bold',fontSize: 16.5,}}>+ ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider style={{marginTop: 7,marginHorizontal: 5,marginBottom: 10,height: 3,}}/>

        <View
          style={{
            marginHorizontal: 15,
            borderColor: 'grey',
            borderWidth: 1,
            paddingTop: 10,
            paddingLeft: 5,
            paddingBottom: 10,
            backgroundColor: '#e0ba94',
            borderRadius: 20,
          }}>
          <LinearGradient
            colors={['#f56c42', '#e66c25']}
            style={{
              height: 16,
              width: 175,
              borderRadius: Platform.OS === 'ios' ? 12 : 50,
              marginLeft: 0,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginTop: 0,
                color: 'white',
                fontWeight: 'bold',
              }}>
              IMPORTANT INFORMATION
            </Text>
          </LinearGradient>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Mandatory check-list for passengers:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>1.</Text>{' '}
                Certify your health status through the Aarogya Setu app or the
                self-declaration form at the airport.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>2.</Text>{' '}
                Remember to do web check-in before arriving at the airport.
                Please do carry a printed or soft copy of the boarding pass.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>3.</Text>{' '}
                Please reach at least 2 hours prior to flight departure.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>4.</Text>{' '}
                No meal service will be available on-board.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>5.</Text>{' '}
                Face masks are compulsory. We urge you to carry your own.
              </Text>
              <Text style={{ fontSize: 12.5 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 15 }}>6.</Text>{' '}
                Remember to download the baggage tag(s) and affix it on your
                bag(s).
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 1,
                marginBottom: 2,
              }}>
              Baggage Information:
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 12.5 }}>
                Carry no more than 1 check-in baggage and 1 hand baggage per
                passenger. The free check-in baggage allowance is 20 kgs, extra
                baggage can be availed at an additional cost.
              </Text>
            </View>
          </View>
        </View>

        <Divider style={{
            marginTop: 7,
            marginHorizontal: 5,
            marginBottom: 10,
            height: 3,
          }}/>

        <View>
          <Text style={{ fontSize: 21, opacity: 0.6, marginLeft: 15 }}>
            Cancellation & Date change charges
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 15,
            }}>
            <View style={{ width: 230 }}>
              <Text
                style={{ color: 'green', fontWeight: 'bold', fontSize: 18 }}>
                Cancellation Fees Apply
              </Text>
              <Text>
                A penalty of upto ₹{' '}
                {(totalAmount + tax - (totalAmount + tax) / 3).toFixed(0)} will
                be charged by the airline & by Make Your Trip based on how close
                to the departure date you cancel.
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  marginTop: 18,
                  fontSize: 19,
                  color: 'grey',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                ₹ {((totalAmount + tax) / 3).toFixed(0)}
              </Text>
              <Text style={{ fontSize: 13, textAlign: 'center' }}>
                Approx Refund
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 15,
              color: 'blue',
              fontSize: 16,
              fontWeight: 'bold',
              opacity: 0.7,
            }}>
            VIEW POLICY
          </Text>
        </View>

        <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
            </View>
            <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 110 }}>
            <TouchableOpacity onPress={props.onshowmodal1}>
              <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/*Fare Brekup page 1*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible}>
          <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row',}}>
              <TouchableOpacity onPress={props.onshowmodal}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Base Fare</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Travellers ( {props.travellers} X ₹ {flight.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {totalAmount}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {(tax).toFixed(0)}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        </View>
        
        {/*Travellers Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible1}>
          <View style={{ backgroundColor: '#fff', marginBottom: 51.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal1} /></View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Travellers Details</Text>
            </View>
            <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1.5,}} />
          
          <ScrollView style={{ backgroundColor: '#fff' }}>
            
            <View style={{flexDirection:'row'}}>
              <View>
                <Image source={require('../images/goAir.png')} style={{width: 60, height: 50, marginLeft: 20}}/>
              </View>
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

            <Text style={{ fontSize: 25, color: 'grey', marginLeft: 20, marginBottom: 10, }}>Traveller Details</Text>

            <View>
              <TextInput
                placeholder="First Name"
                value = {props.firstName}
                onChangeText = {props.firstName1}
                style={{ marginLeft: 20, fontSize: 18, marginRight: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.middleName}
                onChangeText = {props.middleName1}
                placeholder="Middle Name (Optional)"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />
              <TextInput
                value = {props.lastName}
                onChangeText = {props.lastName1}
                placeholder="Last Name"
                style={{ marginLeft: 20, fontSize: 18, marginHorizontal: 20 }}
              />
              <Divider style={{marginLeft: 20, marginRight:  30,marginBottom: 15, height: 0.5,  }} />

              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <View>
                  <Text style={{fontSize: 20,color: 'grey',marginTop: 2,marginLeft: 5}}>Gender -</Text>
                  <Picker selectedValue={props.gender} style={{ width: Platform.OS === 'ios' ? 0 : 150, height: Platform.OS === 'ios' ? 0 : 30,}} 
                    onValueChange={props.picker}>
                      <Picker.Item label="Male" value="Male" /><Picker.Item label="Female" value="Female" /><Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10, marginTop: 10 }}>
                  <Input 
                    value = {props.age}
                    onChangeText = {props.age1}
                    placeholder="Age" 
                    keyboardType="number-pad" 
                  />
                </View>
              </View>

              <Text style={{marginLeft: 20, color:'blue', fontSize: 16, fontWeight:'bold', marginBottom: 5}}> + ADD MORE TRAVELLERS</Text>
              
            </View>

            <Divider style={{ marginBottom: 10, marginHorizontal: 5, height: 3 }} />

            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 25, color: 'grey' }}>Contact Information</Text>
              <Text style={{ color: 'grey' }}>Your ticket and flights information will be sent here</Text>

              <View style={{ marginRight: 20 }}>
                <Input
                  placeholder="Email"
                  leftIcon={<FontAwesome size={20} name="user-o" />}
                  keyboardType="email-address"
                  value = {props.email}
                  onChangeText = {props.email1}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>  
                <View style={{width: 150,borderRightWidth: 1,borderColor: 'grey'}}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Country Code</Text>
                  <Picker selectedValue={props.countryCode} style={{ width: Platform.OS === 'ios' ? 0 : 190,height: Platform.OS === 'ios' ? 0 : 18,marginLeft: 2,marginTop: 13,}} 
                    onValueChange={props.picker1}>
                      <Picker.Item label="India (+ 91)" value="+91" /><Picker.Item label="Usa (+ 1)" value="+1" /><Picker.Item label="Russia (+ 44)" value="+44" /><Picker.Item label="Honkong (+ 852)" value="+852" /><Picker.Item label="Bhutan (+ 975)" value="+975" /><Picker.Item label="China (+ 86)" value="+86" /><Picker.Item label="Switzerland (+ 41)" value="+41" />
                  </Picker>
                </View>
                <View style={{ width: 150, marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, color: 'grey', marginLeft: 10 }}>Mobile No.</Text>
                  <Input
                    value = {props.phone}
                    onChangeText = {props.phone1}
                    placeholder={props.countryCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

            </View>

            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft: 17}}>
               <CheckBox 
                  value={isSelected1}
                  onValueChange={setSelection1}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6, marginTop: 5}}>
                <Text style={{fontSize: 17}}>GST Number for Business travel (Optional)</Text>
              </View>
            </View>

            <View style={{height: (isSelected1 ? 100 : 0 ), opacity:(isSelected1 ? 1: 0), }} >
              <View style={{marginHorizontal: 20, marginBottom: 10, marginTop: 5}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor: 'blue'}}>
                  <TextInput 
                    placeholder="Company Name" 
                    value = {props.companyName}
                    onChangeText = {props.companyName1} />
                </View>
              </View>
              <View style={{marginHorizontal: 20}}>
                <View style={{borderWidth: 0.5, padding: 7, borderColor:'blue'}}>
                  <TextInput 
                    placeholder="Registration No." keyboardType='number-pad' 
                    onChangeText = {props.registrationNo1} 
                    value = {props.registrationNo}
                  />
                </View>
              </View>
            </View>

            <Divider style={{height: 2, marginHorizontal: 20, marginVertical: 10}} />
            <View style={{flexDirection:'row', marginRight: 20}}>
              <View style={{marginLeft:17}}>
                <CheckBox 
                  value={isSelected}
                  onValueChange={setSelection}
                />
              </View>
              <View style={{marginRight: 25, marginLeft: 6}}>
                <Text>I understand and agree with the Fare Rules , the Privacy Policy , the User Agreement and Terms of Service of Make Your Trip</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 110,}}>
                <TouchableOpacity onPress={props.onshowmodal2} disabled={props.FormValidity}>
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
            
          </View>
        </Modal>

        {/*Payment Page */}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible2}>
          
          <View style={{ flexDirection: 'row', backgroundColor:'#fff' }}>
            <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal2}  />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Select Payment Mode</Text>
          </View>
          <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1,}} />

        <ScrollView style={{backgroundColor:'#fff'}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint}</Text>
              <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
            </View>
          </View>
          <View style={{marginLeft: 15, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
          </View>
          <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

          <View style={{flexDirection:'row', paddingLeft: 15, paddingVertical: 15, backgroundColor:'lightgrey', marginHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>Payment Options</Text>
              <View style={{flexDirection:'row', alignSelf:'flex-end', marginLeft: 50, justifyContent:'flex-end'}}>
                <Icon name="lock" color="green" size={18} />
                <Text style={{color:'grey', marginLeft: 2}}>Safe and Secure</Text>
              </View>
          </View>

          <View>
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/bhimLogo.png') }} 
                title="UPI BHIM" titleStyle={{color:'grey', fontSize: 16}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="ios-card" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Credit/Debit/ATM Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-calculator" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="EMI" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<FontAwesome name="bank" size={19} style={{marginLeft: 7}} color="grey"/>}
                title="Net Banking" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-gift" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Gift Card" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftIcon={<Ionicons name="md-wallet" size={24} style={{marginLeft: 7}} color="grey"/>}
                title="Mobile Wallet" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/paypalLogo.png') }} 
                title="Paypal" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
              <Divider style={{marginHorizontal: 15}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onshowmodal4}>
              <ListItem 
                leftAvatar={{ source: require('../images/amazonLogo.jpg') }} 
                title="Amazon Pay" titleStyle={{color:'grey', fontSize: 18, marginLeft: 9}}
                rightIcon={<Icon name="navigate-next" style={{marginRight: 6}} />}
              />
            </TouchableOpacity>
          
          </View>

          <View style={{flexDirection: 'row',backgroundColor: '#43464a', height: 40, paddingTop: 4 }}>       
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)}</Text>
              <Text style={{color:'grey', marginLeft: 5, paddingTop: 4}}>Due Now</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal3} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 4 }}/>
            </View>

        </ScrollView>
        
        </Modal>

        {/*Fare Brekaup Final Page */}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible3}>
          <View style={{ backgroundColor: '#fff', height: 500, marginTop: 400 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row', backgroundColor:'#4677d4', paddingVertical: 10, marginRight: 20}}>
              <TouchableOpacity onPress={props.onshowmodal3}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Total Fare</Text>
                <Text style={{ marginLeft: 190 }}>₹ {totalAmount}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, flexDirection: 'row'}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Fee & Surcharges</Text>
                <Text style={{ marginLeft: 150 }}>₹ {(tax).toFixed(0)}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginTop: 10, marginLeft: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Convenience Fee*</Text>
                <Text style={{ marginLeft: 150 }}>₹ {convinenceFee}</Text>
              </View>
              <Divider style={{marginHorizontal: 15,marginTop: 10, marginBottom: 10}}/>
            </View>
            <View style={{marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{ fontSize: 22, marginRight: 140, fontWeight: '900' }}>DUE NOW</Text>
                <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right',}}>₹ {(totalAmount + tax + convinenceFee).toFixed(0)} </Text>
              </View>
              <Text style={{color:'grey', fontSize: 13}}>Price of inclusive GST wherever indicated *</Text>
            </View>
          </View>
        </Modal>

        {/*Final Review Page for booking*/}
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible4}>
          <View style={{ backgroundColor: '#fff', height: 450, marginTop: 400, borderColor:'grey', borderWidth: 4 }}>

            <View style={{flexDirection:'row', alignSelf:'center', backgroundColor:'lightblue', paddingHorizontal: 40, paddingVertical: 8, marginTop: 5}}>
              <Text style={{ fontSize: 20,justifyContent: 'center',fontWeight: 'bold', alignSelf:'center', alignContent:'center', alignItems:'center'}}>CONFIRM YOUR BOOKING</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4, marginBottom: 10 }}/>

            <View>
              <View style={{flexDirection:'row'}}>
                <Image source={require('../images/goAir.png')} style={{width:60, height: 50, marginLeft: 20}}/>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight:'bold', fontSize: 18}}>{flight.name} | <Text style={{color:'grey', fontSize: 16}}>{flight.number}</Text></Text>
                  <Text style={{fontWeight:'bold', marginTop: 2, fontSize: 16, opacity:0.7}}>Departure - {props.departDate}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 20, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.originPoint} - {props.destinationPoint} | <Text style={{color:'grey', fontSize: 15}}>{flight.category}</Text></Text>
                <Text style={{ color: 'grey', fontSize: 16 }}><Text style={{fontWeight:'bold'}}>{flight.departTime} - {flight.reachTime}</Text> | {flight.duration} | {props.class}</Text>
              </View>
            </View>

            <View style={{marginLeft: 15, marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight:'900'}}>1) {props.firstName} {props.lastName}</Text>
              <Text style={{marginLeft: 20, color:'grey', fontSize: 16}}>{props.age} yrs | {props.gender}</Text>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>
             
            <View style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 5, marginHorizontal: 10}}>       
              <View style={{ justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {(totalAmount + tax).toFixed(0)}</Text>
                <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
              </View>
               <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>FOR {props.travellers} TRAVELLERS</Text>
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 90}}>
                <TouchableOpacity onPress={props.onshowmodal5} >
                <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}} >
                  <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONFIRM</Text>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>

        {/*Booking Page*/ }
        <Modal animationType={'slide'} transparent={true} visible={props.modalVisible5}>
          <View style={{backgroundColor:'#fff', height: 1000,}}>
          <ScrollView style={{marginBottom: 0}}>
          
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop: 7, marginBottom: 20, marginRight: 10, marginLeft:5}}>
              <TouchableOpacity onPress={props.onPress()}>
                <Icon name='close' size={28} onPress={props.navigation1}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 7, marginBottom: 20}}>Booking Confirmed !</Text>
            <View style={{marginTop: 9, marginBottom: 20, marginLeft: 60}}>
              <Icon name='share' onPress={() => shareBooking(flight.name)} />
            </View>
          </View>

          <View style={{marginLeft: 15, marginRight: 15}}>

            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 16, opacity:0.8, marginLeft: 2}}>Trip ID: {Id}</Text>
              <Image source={require('../images/logo.png')} style={{height: 20, width: 40, marginLeft: 57, marginRight: 2}}/>
              <Text style={{fontSize: 18, fontWeight:'bold'}}>Make Your Trip</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize: 18, opacity:0.8, marginLeft: 2}}>{props.originPoint} to {props.destinationPoint}</Text>
              <Text style={{fontSize: 15, fontWeight:'bold', marginLeft: 10, opacity:0.8}}>{props.departDate}</Text>
            </View>
            <Divider style={{marginHorizontal: 2, marginTop: 10, height: 2, marginBottom: 6}} />
            
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View><Image
                  source={require('../images/goAir.png')}
                  style={{ width: 45, height: 45, marginRight: 7 }}
                /></View>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>{flight.name} </Text>
                    <Text style={{ color: 'grey', fontSize: 17, marginTop: 3 }}>| {flight.number}</Text>
                  </View>
                  <Text style={{fontWeight:'bold',fontSize: 15}}>TICKET PNR - <Text style={{fontWeight:'normal'}}>Z71QW92</Text></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems:'center' }}>
                <View style={{ marginLeft: 50, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.departTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.originPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal}</Text>
                </View>

                <View style={{width: 70, marginRight: 20 }}>
                  <Ionicons name="ios-clock" size={25} style={{textAlign:'center'}} color="grey"/>
                  <Text style={{ fontSize: 16, color: 'grey', textAlign: 'center' }}>{flight.duration}</Text>
                  <Text style={{ fontSize: 14, color: 'grey', textAlign: 'center', marginTop: 3 }}>{props.class}</Text>
                </View>

                <View style={{ marginRight: 10, width: 80 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{flight.reachTime}</Text>
                  <Text style={{ fontSize: 16, color: 'black', fontWeight:'bold' }}>{props.destinationPoint}</Text>
                  <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>Terminal {flight.terminal1}</Text>
                </View>
              </View>
            </View>

            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 14}}>Baggage info – Check-in: 20 Kgs, Cabin: 7 Kgs</Text>

          </View>
          <Divider style={{height: 2, marginTop: 10, marginHorizontal: 15, marginBottom: 7}}/>
            
          <View style={{flexDirection:'row', marginLeft: 20}}>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 15}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>TRAVELLERS</Text>
              <View style={{flexDirection:'row', marginTop: 5}}>
                <FontAwesome size={20} name="user"/>
                <Text style={{marginLeft: 4, fontSize: 16}}>Mr. {props.firstName}{props.middleName} {props.lastName}</Text>
              </View>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingLeft: 10,paddingRight: 10,  alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Age</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.age} yrs</Text>
            </View>
            <View style={{borderColor:'grey', borderRightWidth: 0.8, paddingRight: 10, paddingLeft: 10, alignItems:'center'}}>
              <Text style={{color:'grey', fontWeight:'bold', fontSize: 17}}>Gender</Text>
              <Text style={{fontSize: 16, marginTop: 5}}>{props.gender}</Text>
            </View>
          </View>
          <Text style={{marginLeft: 20, marginTop: 15}}>Total Amount Paid - ₹ {paidAmount}</Text>
          <Text style={{marginLeft: 20}}>Email - {props.email}</Text>
          <Text style={{marginLeft: 20}}>Contact No. {props.countryCode} {props.phone}</Text>
          <Divider  style={{marginTop: 10, height: 2}}/>

          <View style={{marginTop: 15, marginLeft:12}}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>IMPORTANT INFORMATION</Text>
            <Text style={{fontSize: 12}}>1) Use your Trip ID {Id} for all communication with Make Your Trip about this booking.</Text>
            <Text style={{fontSize: 12}}>2) Check-in counters at all airports close 45 minutes before departure</Text>
            <Text style={{fontSize: 12}}>3) A printed copy of this e-ticket or e-ticket display on laptop, tablet or phone must be presented at the time of check-in.</Text>
            <Text style={{fontSize: 12, marginRight:5}}>4) It is mandatory to carry government recognized photo identification (ID) with your e-ticket at the time of check-in. For infant passenger's, it is mandatory to carry the date of birth certificate</Text>
            <Text style={{fontSize: 12}}>5) For any further assistance, you can log on to makeyourtrip.com/support page or access all your trips in your account on Make your trip website or mobile app.</Text>
          </View>
          
          <Divider style={{marginTop: 10, height: 2, marginHorizontal: 10}}/>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text style={{fontWeight:'bold', marginLeft: 10}}>Need Assistance with the Trip ?</Text>
            <Text style={{marginBottom: 10, marginLeft: 10}}>Go to www.makeyourtrip.com/support</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name="phone"/>
              <Text style={{fontWeight:'bold', marginLeft: 5}}>{flight.name} Helpline</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('1800222555', true)}>
                <Text style={{marginLeft: 5}}>1800 222 555</Text>
              </TouchableOpacity>
            </View>
          </View>

          </ScrollView>
          </View>
        </Modal>

      </ScrollView>

      </View>
    );
  }    
  else {
    return <View></View>;
  }
}

class FlightReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: FLIGHTS,
      showModal: false, showModal1: false, showModal2: false, showModal3: false, showModal4: false, showModal5: false,
      countryCode: '+91',
      age: '15',  
      gender: 'Male', 
      email: 'kartikeybihani05@gmail.com',
      firstName: 'Kartikey',  
      lastName: 'Bihani', 
      phone: '9461072147',
      middleName: '', 
      companyName: '',   
      registrationNo: '',
      boookings: []
    };
  }

  // onBook(flightId) {
  //   this.setState({boookings: this.state.boookings.concat(flightId)});
  // }

  onBook(flightId) { this.props.postBooking(flightId)}

  // alert = () => {
  //   Alert.alert(
  //     'YOUR BOOKING IS ALMOST DONE',
  //     "We won't be able to hold this price if you go back. The prices for this flight might increse.",
  //     [{ text: 'RESUME BOOKING'},
  //      { text: 'BACK', onPress: () => {this.toggleModal1} }],
  //      { cancelable: false }
  // )}

  toggleModal = () => { this.setState({ showModal: !this.state.showModal })}; toggleModal1 = () => { this.setState({ showModal1: !this.state.showModal1 })}; toggleModal2 = () => { this.setState({ showModal2: !this.state.showModal2 })}; toggleModal3 = () => { this.setState({ showModal3: !this.state.showModal3 })}; toggleModal4 = () => { this.setState({ showModal4: !this.state.showModal4 })}; toggleModal5 = () => { this.setState({ showModal5: !this.state.showModal5 }) };
  
  handleMidName = middleName => { this.setState({middleName}) }
  handleLastName = lastName => { this.setState({lastName}, this.validateForm) }
  handlefirstName = firstName => { this.setState({firstName}, this.validateForm) }
  handleEmail = email => { this.setState({email}, this.validateForm) }
  handlePhone = phone => { if(+phone >= 0 && phone.length <= 10 ) { this.setState({phone} , this.validateForm)} }
  handleCompanyName = companyName => { this.setState({companyName},) }
  handleRegistrationNo = registrationNo => { this.setState({registrationNo},) }
  handleAge = age => { if(+age >= 0 && age.length <= 2 ) { this.setState({age} , this.validateForm)} }

  validateForm = () => {
    if ( +this.state.age >= 0 && this.state.age.length === 2 && +this.state.phone >= 0 && this.state.phone.length === 10 && this.state.firstName.length >= 1 &&  this.state.lastName.length >= 1 &&  this.state.email.length >= 4 ) {
      return this.setState({ isFormValid: true });
    } else {
      return this.setState({ isFormValid: false });
    }
  }

  navigation = () => { this.props.navigation.navigate('FlightSearch')}
  navigation1 = () => { this.props.navigation.navigate('Home',{booking: Id})}

  picker = (itemIndex) => { this.setState({ gender: itemIndex })}
  picker1 = (itemValue) => {this.setState({ countryCode: itemValue })}

  render() {
    const flightId = this.props.navigation.getParam('flightId', '');

    return (
      <SafeAreaView style={{marginTop: 30}}>
        <Text style={{fontSize: 1, opacity: 0.1}}>{Id}</Text>
        <RenderFlight
          booking={this.props.bookings.some(el => el === flightId)}
          onPress={() => this.onBook(flightId)} 
          flight = {this.state.flights[+flightId]} navigation = {this.navigation}
          destinationPoint = {this.props.navigation.state.params.destinationPlace}
          originPoint = {this.props.navigation.state.params.originPlace}
          departDate = {this.props.navigation.state.params.departingDate}
          class = {this.props.navigation.state.params.cabinClassing}
          travellers = {this.props.navigation.state.params.travellers}
          modalVisible = {this.state.showModal} onshowmodal = {this.toggleModal}
          modalVisible1 = {this.state.showModal1} onshowmodal1 = {this.toggleModal1}
          modalVisible2 = {this.state.showModal2} onshowmodal2 = {this.toggleModal2}
          modalVisible3 = {this.state.showModal3} onshowmodal3 = {this.toggleModal3}
          modalVisible4 = {this.state.showModal4} onshowmodal4 = {this.toggleModal4}
          modalVisible5 = {this.state.showModal5} onshowmodal5 = {this.toggleModal5}
          countryCode = {this.state.countryCode}
          picker = {this.picker} picker1 = {this.picker1}
          age = {this.state.age} age1 = {this.handleAge}
          gender = {this.state.gender}   alert = {this.alert}
          email = {this.state.email} email1 = {this.handleEmail}
          phone = {this.state.phone} phone1 = {this.handlePhone}
          firstName = {this.state.firstName} firstName1 = {this.handlefirstName}
          lastName = {this.state.lastName} lastName1 = {this.handleLastName}
          middleName = {this.state.middleName} middleName1 = {this.handleMidName}
          companyName = {this.state.companyName} companyName1 = {this.handleCompanyName}
          registrationNo = {this.state.registrationNo} registrationNo1 = {this.handleRegistrationNo}
          FormValidity = {this.state.isFormValid} navigation = {this.navigation} navigation1 = {this.navigation1}
          gender1 = {this.gender1}
        />
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightReview);
