import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Auth from './auth/index'
import { Provider as PaperProvider } from 'react-native-paper';

export default class Home extends Component {
    

    render() {
        return (
            <PaperProvider>
                

                    <Auth navigate={this.props.navigation} />

               
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
        width: "100%"
    }
});