import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TouchableNativeFeedback, ScrollView } from 'react-native'
import ExerciseListItem from './exerciseListItem';
import InputModal from './inputModal';

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
            ],
            modalVisible: false,
            inputVal: ""
        }

        this.openModal = this.openModal.bind(this)
        this.addNewWorkout = this.addNewWorkout.bind(this)
    }

    openModal() {
        this.setState({
            modalVisible: true
        })

    }

    addNewWorkout() {

        if (this.state.inputVal) {
            const newWorkoutName = this.state.inputVal
            let newWorkoutObj = { "name": newWorkoutName, "exercises": [] }

            this.setState({
                workoutList: [...this.state.workoutList, newWorkoutObj],
                inputVal: ""
            })
        }

    }

    render() {
        return (
            <ScrollView>

                <InputModal
                    maxLength={10}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState(
                            {
                                modalVisible: !this.state.modalVisible
                            }
                        )
                    }}
                    styles={styles.modal}
                    header={"Enter new workout name (max 10 characters):"}
                    buttonText={"OK"}
                    onChangeText={(e) => {
                        this.setState({
                            inputVal: e
                        })
                    }}
                    inputValue={this.state.inputVal}
                    closeModal={(inputVal) => this.setState(
                        {
                            modalVisible: !this.state.modalVisible,

                        }, () => this.addNewWorkout())} />
                <View>
                    <Text style={styles.header}>Create new list:</Text>
                </View>
                <View >
                    <Button style={styles.buttonNew} onPress={this.openModal} title='Create new list +'></Button>
                </View>

                <View style={styles.listContainer}>
                    {this.state.workoutList.map((workout) => {
                        // find more random way to generate key
                        return <TouchableNativeFeedback key={Math.random()} onPress={() => this.props.navigate.navigate('ExerciseList', {

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
    modal: {

    }


});