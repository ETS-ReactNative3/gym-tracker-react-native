import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Record from './exercises/reps';
import ExerciseList from './exercise-list/exercise-list'
import ExerciseListItem from './exercise-list/exerciseListItem'
import CreateExerciseList from './exercise-list/createListPage';
import { Provider as PaperProvider } from 'react-native-paper';

export default class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentUserId: ''
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const currentUserId = navigation.getParam('currentUserId', undefined);

        this.setState({
            currentUserId: currentUserId
        })
    }

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