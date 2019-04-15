import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import Auth from './auth/index'


export default class Home extends Component {
    

    render() {
       
        return (
            
                

                    <Auth navigate={this.props.navigation} />

               
            
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