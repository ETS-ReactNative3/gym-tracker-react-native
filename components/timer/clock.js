/*
1) set state = user input (default 60)
2) 
5) when state = 3 - play sound && change colour
X
*/

import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Clock extends Component {
    

   

   

    render() {        
        return (
            <View>
                <Text>{this.state.length} seconds remaining </Text>
            </View>
        )
    }
}