import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Record from './exercises/reps';
import ExercisePage from './exercises/exercise'
import ExerciseList from './exercise-list/exercise-list'
import ExerciseListItem from './exercise-list/exerciseListItem'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <ExercisePage /> */}
                <ExerciseList navigate={this.props.navigation.navigate}/>
                {/* <View>
                    
                    <ExerciseListItem exerciseName={"Squat"} pressMe={() => this.props.navigation.navigate('Exercises', {
                        exerciseName: "Squat baby!"
                    })}/>

                    <ExerciseListItem exerciseName={"Squat"} />
                    <ExerciseListItem exerciseName={"Lateral extensions"} />
                    
                </View> */}
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