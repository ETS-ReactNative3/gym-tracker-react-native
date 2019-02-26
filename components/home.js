import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Record from './exercises/reps';
import ExerciseList from './exercise-list/exercise-list'
import ExerciseListItem from './exercise-list/exerciseListItem'
import CreateExerciseList from './exercise-list/createListPage';
import { Provider as PaperProvider } from 'react-native-paper';

export default class Home extends Component {
    render() {
        return (
            <PaperProvider>
                <View style={styles.container}>

                    <CreateExerciseList navigate={this.props.navigation} />

                </View>
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
    }
});