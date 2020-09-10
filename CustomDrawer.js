import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, ListItem, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { FlatList, Card, Divider } from 'react-native-elements';

export default class CustomDrawer extends React.Component{
    render() {
        return(
            <SafeAreaView>
            <View style={{marginTop: 30}}>

                <View style={{flexDirection: 'column', marginRight: 15}}>
                  <View style={{flexDirection: 'row'}}>
                  <Icon name="user-circle" type="font-awesome" style={styles.b} size={50} />
                  <View><Text style={styles.c}>Hi Kartikey</Text>
                  <Text style={styles.a}>kartikeybihani05@gmail.com</Text>
                  <TouchableOpacity><Text style={{color: 'blue', paddingLeft: 10, fontSize: 13}}>View / Edit Profile</Text></TouchableOpacity></View>
                  </View>
                </View>

                <Divider style={styles.divider}/>

                
            
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    a: {paddingLeft: 10, fontSize: 9},
    b: {marginLeft: 15, marginTop: 5},
    c: {fontSize: 20, paddingLeft: 5, fontWeight: 'bold', marginLeft: 6, marginTop: 5},
    divider: {marginHorizontal: 10, marginTop: 10}
})
