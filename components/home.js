import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Record from './exercises/reps';
import ExerciseList from './exercise-list/exercise-list'
import ExerciseListItem from './exercise-list/exerciseListItem'
import CreateExerciseList from './exercise-list/createListPage';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                {/* <ExerciseList navigate={this.props.navigation.navigate}/> */}
                <CreateExerciseList navigate={this.props.navigation}/>
               
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