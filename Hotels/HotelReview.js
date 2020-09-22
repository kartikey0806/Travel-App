import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Share,
  ScrollView,
  Modal,
  TextInput,
  Picker,
  Image,
  CheckBox
} from 'react-native';
import { Icon, Divider, Card, Input, ListItem, Rating  } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Communications from 'react-native-communications';
import { HOTELS } from '../informations/Hotels';
import { SliderBox } from 'react-native-image-slider-box';
import { Container, Header, Content, Accordion } from "native-base";

function Info() {
  return(
    <View>
      <Text>Hello</Text>
    </View>
  )
} 

function RenderHotel(props) {
  const hotel = props.hotel;
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const dataArray = [
    { title: "Hotel Policies", content: 'jnfqni' },
  ];

  const shareHotel = (title, message, url) => {
    Share.share(
    { title: title,
      message: 'Make Your Trip' + ': Checkout my ' + hotel.name + ' Hotel ' + props.destination + " at a great discount of 20% and just at the cost of ₹ " + hotel.price,
      url: url },
    { dialogTitle: 'Share this Hotel' })
  }

  const shareBooking = (title, message, url) => {
    Share.share(
    { title: title,
      message: 'Make Your Trip' + ': Hey!, Checkout my Booking of ' + hotel.name + ' in ' +  props.destination + " which I got at a great discount of 20% and just at the cost of ₹ " + hotel.price,
      url: url },
    { dialogTitle: 'Share your Booking' })
  }

  if ( hotel != null ) {
    return (
      <View style={{marginBottom: 50}}>

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

        <ScrollView style={{marginBottom: 51.5}}>
          
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

          <View style={{marginHorizontal: 10, borderColor:'grey', borderWidth: 0.7, marginTop: 10, paddingTop: 5, paddingBottom: 10, borderRadius: 10}}>
            <View style={{flexDirection:'row'}}>
              <View style={{marginLeft: 5}}><Icon name="check-circle"/></View>
              <View><Text style={{fontSize: 18, fontWeight:'bold', marginLeft:8, color:'blue'}}>My Safety - Safe and Hygienic Stays</Text><Text style={{marginLeft: 8, color:'grey'}}>This property is following safety & hygiene meausres</Text></View>
            </View>
            <Card>
              <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={15} color="green"/><Text style={{marginLeft: 4, color:'grey'}}>Sanitized Environment</Text></View>
                <View style={{flexDirection:'row', marginLeft: 20}}><Icon name="check-circle" style={{marginTop: 1.5}} size={15} color="green"/><Text style={{marginLeft: 4, color:'grey',}}>Trained Staff</Text></View>
              </View>
              <View style={{flexDirection:'row', marginTop: 7}}>
                <View style={{flexDirection:'row'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={15} color="green"/><Text style={{marginLeft: 4, color:'grey'}}>Safe Practices</Text></View>
                <View style={{flexDirection:'row', marginLeft: 66}}><Icon name="check-circle" style={{marginTop: 1.5}} size={15} color="green"/><Text style={{marginLeft: 4, color:'grey',}}>Safe Dining</Text></View>
              </View>
            </Card>
          </View>
          <Divider style={{height: 13, marginBottom: 10, marginTop: 15, opacity:0.7, marginHorizontal: 10}}/>

          <View>
            <Text style={{fontWeight:'bold', fontSize: 20, marginLeft: 20}}>About the Hotel</Text>
            <Text style={{marginLeft: 20, color:'grey', fontSize: 14, marginRight: 5}}>{hotel.about}</Text>
            <Text style={{marginLeft: 20, color:'blue', fontWeight:'bold'}}>KNOW MORE</Text>
          </View>

          <Divider style={{height: 13, marginBottom: 10, marginTop: 15, opacity:0.7, marginHorizontal: 10}}/>
          <View>
            <Text style={{fontWeight:'bold', fontSize: 20, marginLeft: 20}}>What Guests Said</Text>
            <Text style={{color:'grey', marginLeft: 20}}>Based on our reviews</Text>
            <View style={{flexDirection:'row', marginLeft: 20, marginTop: 7}}>
              <View style={{borderRadius: 5, padding: 8,marginRight: 5, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Clean Room</Text></View>
              <View style={{borderRadius: 5, padding: 8, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Clean Room</Text></View>
            </View>
            <View style={{flexDirection:'row', marginLeft: 20, marginTop: 7}}>
              <View style={{borderRadius: 5, padding: 8,marginRight: 5, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Courteous Staff</Text></View>
              <View style={{borderRadius: 5, padding: 8, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Good Room</Text></View>
            </View>
            <View style={{flexDirection:'row', marginLeft: 20, marginTop: 7}}>
              <View style={{borderRadius: 5, padding: 8,marginRight: 5, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Faboulous Food</Text></View>
              <View style={{borderRadius: 5, padding: 8, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Fast Services</Text></View>
            </View>
            <View style={{flexDirection:'row', marginLeft: 20, marginTop: 7}}>
              <View style={{borderRadius: 5, padding: 8,marginRight: 5, flexDirection:'row', borderWidth: 0.7, borderColor:'grey'}}><Icon style={{marginTop: 1.5}} name="check-circle" size={16} color="green"/><Text style={{marginLeft: 5, color:'grey', fontSize: 17}}>Value For Money</Text></View>
            </View>
          </View>
          <Divider style={{height: 13, marginBottom: 10, marginTop: 15, opacity:0.7, marginHorizontal: 10}}/>

          <View style={{marginTop: 7}}>
            <Text style={{fontWeight:'bold', fontSize: 20, marginLeft: 10, marginBottom: 4}}>Review your Room</Text>
            <SliderBox style={{height: 200, width: 340, marginLeft: 10 }} images={hotel.room} />
            <Text style={{marginTop: 3, marginLeft: 13, fontSize: 18}}>Suite Room</Text>
            <View style={{borderRadius: 10,marginLeft: 10, borderWidth: 1, borderColor:'grey', width: 270,paddingVertical: 3, backgroundColor:'#dfff', paddingLeft: 10}}>
              <Text style={{fontSize: 16}}>King Bed  |  250 sq.ft  |  Garden View</Text>
            </View>
            <Text style={{fontWeight:'bold', color:'grey', marginTop: 6, marginLeft: 15, fontSize: 16}}>WHY BOOK THIS ROOM ?</Text>
            <Text style={{marginLeft: 15, fontSize: 13, color:'black'}}>24-Hour Room Service | Air Conditioner | Free Wi-Fi | Heater | Charging Points | Jaccuzzi</Text>
            <Text style={{marginLeft: 15, fontWeight:'bold', color:'blue', marginBottom: 8}}>MORE</Text>
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 17}}>Price per night - <Text style={{fontWeight:'bold', fontSize: 18,color:'grey'}}>₹ {hotel.price}</Text>  </Text>
              <Text style={{color:'green'}}>Free Cancellation before 12 Hours of the Stay .</Text>
            </View>
          </View>

          <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 25,}}>       
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {((props.nights * hotel.price) + ((props.nights * hotel.price) * 13/100)).toFixed(0)}</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
            </View>
            <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>PRICE FOR {props.guests} GUESTS FOR {props.nights} NIGHT</Text>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 25 }}>
            <TouchableOpacity onPress={props.onshowmodal1}>
              <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        </ScrollView>

        {/*Travellers Details*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible1}>
          <View style={{ backgroundColor: '#fff', marginBottom: 50}}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal1} /></View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Guest Details</Text>
            </View>
            <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1.5,}} />
          
          <ScrollView style={{ backgroundColor: '#fff' }}>
            
            <View style={{flexDirection:'row'}}>
              
              <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{hotel.name}</Text>
                <Text>{props.room} Room | {props.guests} Guests </Text>
              </View>
            </View>
            <Divider style={{marginBottom: 10, marginHorizontal: 10, marginTop: 9}}/>
            <View style={{flexDirection:'row', marginLeft: 20}}>
              <View>
                <Text style={{color:'grey', fontWeight:'bold', opacity:0.85}}>CHECK IN</Text>
                <Text style={{fontSize: 18, fontWeight:'bold'}}>{props.checkinDate} Sept</Text>
                <Text>1 PM</Text>
              </View>
              <Icon name="navigate-next" style={{marginHorizontal:15, marginTop: 11}} size={30}/>
              <View>
                <Text style={{color:'grey', fontWeight:'bold', opacity:0.85}}>CHECK OUT</Text>
                <Text style={{fontSize: 18, fontWeight:'bold'}}>{props.checkoutDate} Sept</Text>
                <Text>11 AM</Text>
              </View>
            </View>
            <Divider style={{marginHorizontal: 15, marginVertical: 10}}/>

            <View style={{flexDirection:'row', paddingLeft: 15, paddingVertical: 15, backgroundColor:'lightgrey', marginHorizontal: 8}}>
              <Text style={{fontSize: 20, fontWeight:'bold'}}>Primary Guest Details</Text>
            </View>

            <Text style={{marginLeft: 15, fontSize: 16, marginTop: 10}}>Title</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{marginLeft: 10}}>
                <Picker selectedValue={props.title} style={{ width: Platform.OS === 'ios' ? 0 : 100, height: Platform.OS === 'ios' ? 0 : 30,}} 
                  onValueChange={props.picker}>
                  <Picker.Item label="Mr" value="Mr" /><Picker.Item label="Mrs" value="Mrs" /><Picker.Item label="Ms" value="Ms" />
                </Picker>
              </View>
              <View style={{marginRight: 15}}>
                <TextInput
                  placeholder="First Name"
                  value = {props.firstName}
                  onChangeText = {props.firstName1}
                  style={{ fontSize: 18, marginRight: 20 }}
                />
                <Divider style={{width: 100}}/>
              </View>
              <View>
                <TextInput
                  value = {props.lastName}
                  onChangeText = {props.lastName1}
                  placeholder="Last Name"
                  style={{  fontSize: 18, marginRight: 20 }}
                />
                <Divider />
              </View>
            </View>


          <View>
            <View style={{ marginRight: 20, marginLeft: 8 }}>
              <Input
                placeholder="Email"
                leftIcon={<FontAwesome size={20} name="user-o" />}
                keyboardType="email-address"
                value = {props.email}
                onChangeText = {props.email1}
              />
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>  
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

          <View>
          <View style={{paddingLeft: 15, paddingVertical: 5, backgroundColor:'lightgrey', marginHorizontal: 8, marginTop: 5}}>
            <Text style={{fontSize: 20, fontWeight:'bold'}}>Hotel Policies</Text>
          </View>
          <Text style={{marginLeft: 15, color:'grey', marginHorizontal: 10}}>According to government regulations, a valid Photo ID has to be carried by every person above the age of 18 staying at {hotel.name}. The identification proofs accepted are Drivers License, Voters Card, Passport, Ration Card. Without valid ID the guest will not be allowed to check in.</Text>
          <Divider  style={{marginTop: 10, marginBottom: 10}}/>
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
                <Text>By proceeding, I agree to MakeMyTrip's Hotel Booking Policy, Hotel Cancellation Policy, Privacy Policy, User Agreement & Terms of Service</Text>
              </View>
            </View>

            <View  style={{flexDirection: 'row',backgroundColor: '#43464a',position: 'relative',height: 50,paddingVertical: 20,marginTop: 8}}>       
              <View style={{ justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>₹ {((props.nights * hotel.price) + ((props.nights * hotel.price) * 13/100)).toFixed(0)}</Text>
                  <FontAwesome name="info-circle" onPress={props.onshowmodal} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 3 }}/>
                </View>
                <Text style={{ color: 'grey', fontSize: 13, marginLeft: 20, fontWeight: 'bold', }}>PRICE FOR {props.guests} GUESTS FOR {props.nights} NIGHT</Text>
                </View>
                  <View style={{ justifyContent: 'center', marginLeft: 25 }}>
                  <TouchableOpacity onPress={props.onshowmodal2} disabled={props.FormValidity}>
                  <LinearGradient colors={['#82a4d1', '#1970e3']} style={{ height: 40, width: 110, borderRadius: Platform.OS === 'ios' ? 12 : 50,}}>
                    <Text style={{ fontSize: 19.5, textAlign: 'center', fontWeight: 'bold', color: '#dfe4eb', marginTop: 7,}}>CONTINUE</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
            
          </View>
        </Modal>

        {/*Payment Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible2}>
        <View style={{ backgroundColor: '#fff', marginBottom: 50}}>

          <View style={{ flexDirection: 'row', backgroundColor:'#fff' }}>
            <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}><Icon name={ Platform.OS === 'ios'? 'navigate-before': 'keyboard-backspace' }size={30} onPress={props.onshowmodal2}  />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 7 }}>Select Payment Mode</Text>
          </View>
          <Divider style={{ marginTop: 7, marginHorizontal: 5, marginBottom: 10, height: 1,}} />
          
          <View>     
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{hotel.name}</Text>
              <Text>{props.room} Room | {props.guests} Guests | {props.checkinDate} - {props.checkoutDate} Sept </Text>
              <Text><Text style={{fontWeight:'bold'}}>Guest:</Text> {props.title} {props.firstName} {props.lastName} | <Text style={{fontWeight:'bold'}}>Contact:</Text> +91 9461072147</Text>
            </View>
          </View>
        
        <ScrollView style={{backgroundColor:'#fff'}}>

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

          <View style={{backgroundColor: '#43464a', height: 50, paddingTop: 4, marginTop: 5 }}>       
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontWeight:'bold',color: 'grey', fontSize: 20, marginLeft: 20 }}>₹ {((props.nights * hotel.price) + ((props.nights * hotel.price) * 13/100) + hotel.convenienceFee).toFixed(0)}</Text>
              <Text style={{color:'grey', marginLeft: 5, paddingTop: 4}}>Due Now</Text>
              <FontAwesome name="info-circle" onPress={props.onshowmodal3} size={20} style={{ color: 'grey', marginLeft: 5, marginTop: 4 }}/>
            </View>
            <Text style={{marginLeft: 20, color:'grey', fontSize: 14}}>PRICE INCLUDING TAXES</Text>
          </View>

        </ScrollView>
        
        </View>
        </Modal>

        {/*Final Fare Page*/}
        <Modal animationType="slide" transparent={true} visible={props.modalVisible3}>
          <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 15, marginTop: 10, flexDirection: 'row',}}>
              <TouchableOpacity onPress={props.onshowmodal3}><Icon name="close" size={30} /></TouchableOpacity>
              <Text style={{marginLeft: 3,fontSize: 20,justifyContent: 'center',fontWeight: 'bold',}}>Fare BreakUp</Text>
            </View>
            <Divider style={{ marginHorizontal: 15, marginTop: 10, height: 4 }}/>
            <View>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Base Fare</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>NIGHTS ( {props.nights} X ₹ {hotel.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {props.nights * hotel.price}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {((props.nights * hotel.price) * 13/100).toFixed(0)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Convenience Fee:</Text>
                  <Text style={{ marginLeft: 165 }}>₹ {hotel.convenienceFee}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right', color:'grey'}}>₹ {((props.nights * hotel.price) + ((props.nights * hotel.price) * 13/100) + hotel.convenienceFee).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        {/*Base Fare Page*/}
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
                  <Text style={{ opacity: 0.8 }}>NIGHTS ( {props.nights} X ₹ {hotel.price} )</Text>
                  <Text style={{ marginLeft: 135 }}>₹ {props.nights * hotel.price}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fee & Surcharges</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ opacity: 0.8 }}>Total Fee & Surcharges:</Text>
                  <Text style={{ marginLeft: 130 }}>₹ {((props.nights * hotel.price) * 13/100).toFixed(0)}</Text>
                </View>
              </View>
              <Divider style={{marginBottom: 10,marginHorizontal: 15,marginTop: 10,}}/>
            </View>
            <View style={{flexDirection: 'row',marginTop: 20,borderRadius: 15,borderWidth: 1,borderColor: 'grey',paddingTop: 10,marginHorizontal: 10,paddingLeft: 10,paddingRight: 5,paddingTop: 10,paddingBottom: 10,}}>
              <Text style={{ fontSize: 22, marginRight: 110, fontWeight: '900' }}>Total Amount</Text>
              <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'right', color:'grey'}}>₹ {((props.nights * hotel.price) + ((props.nights * hotel.price) * 13/100)).toFixed(0)} </Text>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={props.modalVisible4}>
          <View style={{ backgroundColor: '#e8edea', height: 1000 }}>

          <View style={{flexDirection:'row', backgroundColor:'#fff', marginBottom: 10}}>
            <View style={{marginTop: 7, marginBottom: 10, marginRight: 10, marginLeft:5}}>
              <TouchableOpacity>
                <Icon name='close' size={28} onPress={props.navigation1}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight:'bold', marginTop: 7, marginBottom: 10}}>Booking Confirmed !</Text>
            <View style={{marginTop: 9, marginBottom: 10, marginLeft: 60}}>
              <Icon name='share' onPress={() => shareBooking(hotel.name)} />
            </View>
          </View>

          <View style={{borderRadius:15,backgroundColor:'#fff',marginHorizontal: 8, borderColor:'grey', shadowRadius: 10, borderWidth: 0.8, height: 330}}>
           
            <View style={{flexDirection:'row', paddingTop: 5, paddingLeft: 7}}>
              <View style={{alignItems:'flex-start'}}>
                <Text style={{fontSize: 19, fontWeight:'bold'}}>{hotel.name}</Text>
                <Rating ratingCount={5} imageSize={10} startingValue={hotel.rating} readonly={true} />
                <Text style={{color:'grey', fontSize: 14}}>Udaipur, India</Text>
                <Text style={{fontWeight:'bold',}}>Trip Id: 26231752</Text>
              </View>
              <View style={{marginLeft: 74}}>
                <SliderBox style={{height: 74, width: 80, marginLeft: 10 }} images={hotel.image1} />
              </View>
            </View>

            <Divider style={{marginVertical: 10}}/>

            <View style={{flexDirection:'row', marginLeft: 20}}>
              <View>
                <Text style={{color:'grey', opacity:0.8}}>Check-in: <Text style={{fontWeight:'bold', color:'grey'}}>1 PM</Text></Text>
                <Text style={{fontWeight:'bold', fontSize: 18, marginTop: 3, textAlign:'center'}}>{props.checkinDate} Sep'20</Text>
              </View>
              <View style={{marginHorizontal: 20, justifyContent:'center', backgroundColor:'#e8edea', borderRadius: 10, width: 60, alignItems:'center', height: 30}}>
                <Text style={{fontWeight:'bold'}}>{props.nights} NIGHT</Text>
              </View>
              <View>
                <Text style={{color:'grey', opacity:0.8}}>Check-out: <Text style={{fontWeight:'bold', color:'grey'}}>11 AM</Text></Text>
                <Text style={{textAlign:'center',fontWeight:'bold', fontSize: 18, marginTop: 3}}>{props.checkoutDate} Sep'20</Text>
              </View>
            </View>

            <Divider style={{marginVertical: 10}}/>

            <View style={{marginLeft: 15, flexDirection:'row'}}>
              <Text style={{color:'grey', fontWeight:'bold', opacity:0.8}}>Guests & Rooms</Text>
              <Text style={{fontWeight:'bold', marginLeft: 100, fontSize: 14}}>{props.guests} Guests | {props.room} Room</Text>
            </View>

            <Divider style={{marginVertical: 10}}/>

            <View style={{marginLeft: 15}}>
              <Text style={{fontWeight:'bold', fontSize: 18}}>Classic Suite Room</Text>
              <Text style={{color:'grey'}}>Balcony | Gardern View</Text>
              <Text style={{color:'grey'}}>BreakFast Included</Text>
              <Text style={{color:'green'}}>Free Cancellation before 12 hrs of stay .</Text>
            </View>

            <Divider style={{marginVertical: 10}}/>

            <Text style={{color:'blue', fontWeight:'bold', marginLeft: 15, fontSize: 17}}>Room Inclusions & Cancellation Policy Details</Text>
            
            <Divider style={{marginTop: 10}}/>

          </View>

          <View style={{paddingTop: 3, paddingBottom: 8, marginTop: 8, paddingLeft:5, borderRadius:15,backgroundColor:'#fff', borderColor:'grey', borderWidth: 0.8, marginHorizontal: 8}}>
            <LinearGradient colors={['#f56c42', '#e66c25']} style={{ height: 18, width: 175, borderRadius: Platform.OS === 'ios' ? 12 : 50, marginLeft: 0, marginVertical: 3 }}>
            <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 0, color: 'white', fontWeight: 'bold', }}>
              IMPORTANT INFORMATION
            </Text>
          </LinearGradient>
            <Text style={{fontSize: 12}}><Text style={{fontWeight:'bold'}}>1)</Text> Use your Trip ID 26231752 for all communication with Make Your Trip about this booking.</Text>
            <Text style={{fontSize: 12}}><Text style={{fontWeight:'bold'}}>2)</Text> Please contact us before arrival if you would be late  or early for check-in .</Text>
            <Text style={{fontSize: 12}}><Text style={{fontWeight:'bold'}}>3)</Text> A printed copy of this e-ticket or e-ticket display on laptop, tablet or phone must be presented at the time of check-in.</Text>
            <Text style={{fontSize: 12, marginRight:5}}><Text style={{fontWeight:'bold'}}>4)</Text> It is mandatory to carry government recognized photo identification (ID) with your e-ticket at the time of check-in. For infant passenger's, it is mandatory to carry the date of birth certificate</Text>
            <Text style={{fontSize: 12}}><Text style={{fontWeight:'bold'}}>5)</Text> For any further assistance, you can log on to makeyourtrip.com/support page or access all your trips in your account on Make your trip website or mobile app.</Text>
          </View>

          <View style={{paddingTop: 3, paddingBottom: 8, marginTop: 8, paddingLeft:5, borderRadius:15,backgroundColor:'#fff', borderColor:'grey', borderWidth: 0.8, marginHorizontal: 8}}>
            <Text style={{opacity:0.8}}>Total Amount Paid - <Text style={{fontWeight:'bold'}}>₹ {((props.nights * hotel.price) + ((props.nights * hotel.price) * 13/100) + hotel.convenienceFee).toFixed(0)}</Text></Text>
            <Text style={{opacity:0.8}}>Email - <Text style={{fontWeight:'bold'}}>{props.email}</Text></Text>
            <Text style={{opacity:0.8}}>Contact No. - <Text style={{fontWeight:'bold'}}>{props.countryCode} {props.phone}</Text></Text>
            <View style={{marginTop: 5}}>
            <Text style={{fontWeight:'bold'}}>Need Assistance with the Trip ?</Text>
            <Text style={{marginBottom: 5}}>Go to www.makeyourtrip.com/support</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name="phone"/>
              <Text style={{fontWeight:'bold'}}>{hotel.name} Helpline</Text>
              <TouchableOpacity onPress={() => Communications.phonecall('1800222555', true)}>
                <Text>1800 222 555</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>

          </View>
        </Modal>

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
      showModal: false, showModal1: false, showModal2: false, showModal3: false, showModal4:false,
      firstName: 'Kartikey',
      lastName: 'Bihani',
      companyName: '',
      registrationNo: '',
      gender: 'Male',
      phone: '9461072147',
      countryCode: '+91',
      title: 'Mr.',
      email: 'kartikeybihani05@gmail.com'
    };
  }

  validateForm = () => {
    if ( +this.state.phone >= 0 && this.state.phone.length === 10 && this.state.firstName.length >= 1 &&  this.state.lastName.length >= 1 &&  this.state.email.length >= 4 ) {
      return this.setState({ isFormValid: true });
    } else {
      return this.setState({ isFormValid: false });
    }
  }

  toggleModal = () => { this.setState({ showModal: !this.state.showModal })};
  toggleModal1 = () => { this.setState({ showModal1: !this.state.showModal1 })};
  toggleModal2 = () => { this.setState({ showModal2: !this.state.showModal2 })};
  toggleModal3 = () => { this.setState({ showModal3: !this.state.showModal3 })};
  toggleModal4 = () => { this.setState({ showModal4: !this.state.showModal4 })};

  handleLastName = lastName => { this.setState({lastName}, this.validateForm) }
  handlefirstName = firstName => { this.setState({firstName}, this.validateForm) }
  handleEmail = email => { this.setState({email}, this.validateForm) }
  handlePhone = phone => { if(+phone >= 0 && phone.length <= 10 ) { this.setState({phone} , this.validateForm)} }
  handleCompanyName = companyName => { this.setState({companyName},) }
  handleRegistrationNo = registrationNo => { this.setState({registrationNo},) }
  picker = (itemIndex) => { this.setState({ title: itemIndex })}
  picker1 = (itemValue) => {this.setState({ countryCode: itemValue })}

  navigation = () => { this.props.navigation.navigate('HotelSearch')}
  navigation1 = () => { this.props.navigation.navigate('Home')}

  render() {
    const hotelId = this.props.navigation.getParam('hotelId', '');

    return (
      <SafeAreaView style={{marginTop: 30}}>
        <RenderHotel 
          age = {this.state.age} age1 = {this.handleAge} title = {this.state.title}
          gender = {this.state.gender} countryCode = {this.state.countryCode} picker = {this.picker}
          email = {this.state.email} email1 = {this.handleEmail} picker1 ={this.picker1}
          phone = {this.state.phone} phone1 = {this.handlePhone}
          companyName = {this.state.companyName} companyName1 = {this.handleCompanyName}
          registrationNo = {this.state.registrationNo} registrationNo1 = {this.handleRegistrationNo}
          firstName = {this.state.firstName} firstName1 = {this.handlefirstName}
          lastName = {this.state.lastName} lastName1 = {this.handleLastName}
          middleName = {this.state.middleName} middleName1 = {this.handleMidName}
          companyName = {this.state.companyName} companyName1 = {this.handleCompanyName}
          registrationNo = {this.state.registrationNo} registrationNo1 = {this.handleRegistrationNo}
          modalVisible = {this.state.showModal} onshowmodal = {this.toggleModal}
          modalVisible1 = {this.state.showModal1} onshowmodal1 = {this.toggleModal1}
          modalVisible2 = {this.state.showModal2} onshowmodal2 = {this.toggleModal2}
          modalVisible3 = {this.state.showModal3} onshowmodal3 = {this.toggleModal3}
          modalVisible4 = {this.state.showModal4} onshowmodal4 = {this.toggleModal4}
          value = {this.state.value} hotel = {this.state.hotels[+hotelId]} navigation = {this.navigation}
          nights = {this.props.navigation.state.params.nights} destination = {this.props.navigation.state.params.destination}
          checkinDate = {this.props.navigation.state.params.checkinDate} checkoutDate = {this.props.navigation.state.params.checkoutDate}
          room = {this.props.navigation.state.params.rooms} guests = {this.props.navigation.state.params.guests}
          FormValidity = {this.state.isFormValid} navigation1 = {this.navigation1}
        />
      </SafeAreaView>
    );
  }
}

export default HotelReview;
