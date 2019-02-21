import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TouchableNativeFeedback, ScrollView } from 'react-native'
import ExerciseListItem from './exerciseListItem';

export default class CreateExerciseList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workoutList: [
                {
                    "name": "Leg Day",
                    "exercises": [
                        "Benchpress",
                        "Squat",
                        "Lateral extensions",
                        "Bicep curls",
                        "Tricep extensions",
                        "Shrugs"
                    ]
                },
                {
                    "name": "Arm Day",
                    "exercises": [
                        "Jumping Jacks",
                        "Hack squats",
                        "Tricep curls",
                        "Flying"
                    ]
                }
            ]
        }
    }

    render() {
       

        return (
            <ScrollView>
                <View>
                    <Text style={styles.header}>Create new list:</Text>
                </View>
                <View >
                    <Button style={styles.buttonNew} title='Create new list +'></Button>
                </View>
                {/* {.map over array of existing days returning exercise list item with exercise name and link to the list} */}
                <View style={styles.listContainer}>
                    {this.state.workoutList.map((workout) => {

                        return <TouchableNativeFeedback key={Date.now()} onPress={() => this.props.navigate.navigate('ExerciseList', {
                           
                            title: workout.name,
                            exercises: workout.exercises,
                           
                        })}>
                            <View>
                                <Text style={styles.listItem}>{workout.name}</Text>
                            </View>
                        </TouchableNativeFeedback>

                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        width: '100%',
        padding: 20
    },
    listItem: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        padding: 20,
        fontSize: 50,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 10,
        textAlign: 'center',
        color: 'black'

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black'
    },
    buttonNew: {
        width: '90%',
        alignSelf: 'center'
    },



});