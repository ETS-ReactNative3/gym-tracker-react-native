import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Record from './exercises/reps';
import ExerciseList from './exercise-list/exercise-list'
import ExerciseListItem from './exercise-list/exerciseListItem'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                <ExerciseList navigate={this.props.navigation.navigate}/>
               
            </View>
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
    }
});