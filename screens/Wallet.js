import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Wallet extends React.Component{

    static navigationOptions = {
        title: 'Wallet',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-wallet" color={tintColor} size={28} iconStyle={{color: tintColor}} />
        ),
      };

    render() {
        return(
            <View style={{justifyContent:'center',alignItems:'center', paddingTop: 100}}>
                <Text>Wallet Screen</Text>
            </View>
        )
    }
}
