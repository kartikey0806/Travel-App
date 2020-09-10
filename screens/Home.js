import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Platform,
  Button,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Home extends React.Component{

    static navigationOptions = {
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={34} iconStyle={{ color: tintColor }} />
        ),
      };

    render() {
        return(
            <View style={{marginTop: Platform.OS === 'ios' ? 10 : 0 }}>
              
            <ImageBackground source={require('../images/Hello.png')} style={{width: Platform.OS === 'ios' ? 420 : 370, height: Platform.OS === 'ios' ? 110 : 130 , opacity: 0.9 }} >
              <View style={styles.b}>
                <Icon name="menu" size={40} color="black" onPress={()=>{this.props.navigation.openDrawer()}}/>
                <Text style={styles.k}>Make your Trip</Text>
              </View>
              <View style={styles.i}>
                <Icon name="search" style={{paddingTop: 8}}/>
                <TextInput placeholder="Search Anything" style={{margin: 6, fontSize: 18 }}/>
                {/* <Image source={require('../images/logo.png')} style={{width: 50, height: 40}}/> */}
              </View>
            </ImageBackground>

            <View style={{ borderRadius: 20, borderColor: 'black', borderWidth: 0.4, marginVertical: 10, alignItems: 'center', marginHorizontal: 10 }}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: Platform.OS === 'ios' ? 20 : 10  }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Flights')}>
                <View style={{marginRight: 30 }}>
                <View style={{ backgroundColor: 'lightblue', borderRadius: 800}}><Icon name="flight" style={{alignItems: 'center', margin: 5, marginVertical:10}} size={25} color="blue"/></View>
                <Text style={styles.c}> Flights</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Hotels')}>
                <View style={{marginRight: 30 }}>
                <View style={{ backgroundColor: '#e8574d', borderRadius: 400}}><Icon name="hotel" style={{alignItems: 'center', margin: 5, marginVertical:10}} size={25} color="blue"/></View>
                <Text style={styles.c}> Hotels</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{marginRight: 30 }}>
                <View style={{ backgroundColor: '#e3e15f', borderRadius: 400}}><Icon name="train" style={{alignItems: 'center', margin: 5, marginVertical:10 }} size={25} color="blue"/></View>
                <Text style={styles.c}> Trains</Text>
                </View>
                </TouchableOpacity>
              <TouchableOpacity>
                <View>
                <Image source={require('../images/vacationIcon.jpg')} style={{width: Platform.OS==='ios'?55:40 , height: Platform.OS==='ios'?40:42, borderRadius: 30, marginLeft: Platform.OS==='ios'?10:5/*10*/ }}/>
                <Text style={styles.l}>Holidays</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>

            <View style={{ borderRadius: 10, borderColor: 'black', borderWidth: Platform.OS==='ios'?0.3:0.1, alignItems: 'flex-start', marginHorizontal: 10 }}>
            <View style={{flexDirection: 'row', marginLeft: Platform.OS === 'ios' ? 5: 20, marginVertical: 15, marginRight: Platform.OS==='ios'?5:10}}>

                <View style={styles.m}>
                  <View style={{flexDirection: 'row', marginRight: 8 }}>
                  <TouchableOpacity><Icon name="taxi" type="font-awesome" color="blue" style={{opacity:0.7, paddingTop: 5}} size={15} /></TouchableOpacity>
                  <View><Text style={{fontSize: 11, paddingLeft: 5}}>Airport</Text>
                  <Text style={{paddingLeft: 5, fontSize: 11}}>Cabs</Text></View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 12, marginRight: 8}}>
                  <TouchableOpacity><Icon name="book" color="blue" style={{opacity:0.7, paddingTop: 5}} size={15} /></TouchableOpacity>
                  <View><Text style={{fontSize: 11, paddingLeft: 7}}>Visa</Text>
                  <Text style={{paddingLeft: 7, fontSize: 11}}>Services</Text></View>
                  </View>
                </View>
                
                <View style={styles.m}>
                  <View style={{flexDirection: 'row', marginBottom: 15, marginRight: 8}}>
                    <TouchableOpacity><FontAwesome name='building' style={{paddingTop: 2, paddingLeft: 3}} size={16} color="red" /></TouchableOpacity>
                    <Text style={{fontSize: 11, paddingLeft: 5 }}>Villas</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 10, marginRight: 8}}>
                    <TouchableOpacity><Icon name="home" color="red" size={18} /></TouchableOpacity>
                    <View><Text style={{fontSize: 11, paddingLeft: 4}}>Apts.</Text>
                    <Text style={{paddingLeft: 2, fontSize: 11}}>& Homes</Text></View>
                  </View>
                </View>

                <View style={styles.m}>
                  <View style={{flexDirection: 'row', marginBottom: 8, marginRight: 8}}>
                    <TouchableOpacity><Icon name="bus" type="font-awesome" color="#e3e15f" style={{paddingTop: 2, paddingRight: 4}} size={17} /></TouchableOpacity>
                    <View><Text style={{fontSize: 11, paddingLeft: 4}}>Bus</Text>
                    <Text style={{paddingLeft: 5, fontSize: 11}}>Services</Text></View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 7, marginRight: 8}}>
                    <TouchableOpacity><Icon name="car" type="font-awesome" color="#e3e15f" size={16} /></TouchableOpacity>
                    <View><Text style={{fontSize: 11, paddingLeft: 4}}>Outstation</Text>
                    <Text style={{paddingLeft: 5, fontSize: 11}}>Cabs</Text></View>
                  </View>
                </View>

                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', marginBottom: 6}}>
                    <TouchableOpacity><Ionicons name='md-bicycle' color="green" style={{paddingTop: 2}} size={21}/></TouchableOpacity>
                    <View><Text style={{fontSize: 11, paddingLeft: 4}}>Activities</Text>
                    <Text style={{paddingLeft: 5, fontSize: 11}}>& Tours</Text></View>
                    {/* <FontAwesome name='building' /> */}
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <TouchableOpacity><Icon name="glass" type="font-awesome" color="green" size={16} /></TouchableOpacity>
                    <View><Text style={{fontSize: 11, paddingLeft: 4}}>Meals</Text>
                    <Text style={{paddingLeft: 5, fontSize: 11 }}>& Deals</Text></View>
                  </View>
                </View>
  
            </View>
            </View>

            <ScrollView horizontal={true}>
              
              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <Icon name="train" size={20}/>
                  <Text style={{fontSize: 15}}>Train PNR Status</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity>  
                <View style={{margin: 7, flexDirection:'row'}}>
                  <Icon name="local-pharmacy" size={20} style={{paddingRight: 5}}/>
                  <Text style={{fontSize: 15}}>Covid Insurance</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <Ionicons name="md-gift" size={20} style={{paddingRight: 5}}/>
                  <Text style={{fontSize: 15}}>Gift Cards</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <Text style={{fontSize: 17, paddingLeft: 3}}>#</Text>
                  <Text style={{fontSize: 15}}>Experience Live</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <FontAwesome name="money" size={20} style={{paddingRight: 5}}/>
                  <Text style={{fontSize: 15}}>Trip Money</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <FontAwesome name="barcode" size={20} style={{paddingRight: 5}}/>
                  <Text style={{fontSize: 15}}>Scan and Pay</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('TripIdeas')}>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <Ionicons name="ios-bulb" size={20} style={{paddingRight: 5}}/>
                  <Text style={{fontSize: 15}}>Trip Ideas</Text>
                </View>
                </TouchableOpacity>
              </View>

              {/* <View style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'grey', borderRadius: 10, marginTop: 10, marginRight: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyTrips')}>
                <View style={{margin: 7, flexDirection:'row'}}>
                  <FontAwesome name="briefcase" size={20} style={{paddingRight: 5}}/>
                  <Text style={{fontSize: 15}}>Upcoming Trips</Text>
                </View>
                </TouchableOpacity>
              </View>

              <Button title="Trips" onPress={() => this.props.navigation.navigate('MyTrips')} /> */}
            
            </ScrollView>

            <View style={{marginLeft: 15, marginTop: 18}}>
              <Text style={{color:'grey', fontSize: 22.5, fontWeight: 'bold'}}>Travel Safe</Text>
              <Text style={{color:'grey'}}>Your Safety: Our Priority</Text>
              <View style={{flexDirection:'row', alignItems:'flex-start', marginTop: 8, backgroundColor:'#dff',borderWidth: 1.5, borderRadius: 15,  borderColor:'black', marginRight: 15, paddingLeft: 5, paddingVertical: 10, paddingRight: 10}}>
                  <Icon name="check-circle" color="blue" style={{opacity:0.7}}/>
                  <Text style={{fontSize: 15, marginLeft: 5, marginRight: 15}}>{'Your Guide to help you make smart travel decisions during COVID-19 '}</Text>
              </View>
            </View>

          </View>
        )
    }
}

const styles = StyleSheet.create({
  b: { paddingTop: 25, flexDirection: 'row', paddingHorizontal: 15, fontWeight: 'bold', marginBottom: 5, },
  c: { paddingTop: 3, fontSize: 15, fontWeight: '700' },
  i: { borderWidth: 2, marginLeft: 20, backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', position: 'relative', marginRight: Platform.OS === 'ios' ? 30 : 30, },
  k: { fontWeight: 'bold', fontSize: 20, paddingLeft: 150, textDecorationLine: 'underline', paddingTop: 5 },
  l: { paddingTop: 4, fontSize: 15, fontWeight: 'bold', paddingRight: 10 },
  m: { flexDirection: 'column', borderRightWidth: 1, borderColor: '#919499', marginRight: 5 },
});
