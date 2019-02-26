import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView } from 'react-native'
import {Button, Card, Title, Avatar, Icon} from 'react-native-paper'
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

    static navigationOptions = {
        title: 'All Workouts',
        
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
                    header={"Enter new workout name:"}
                    buttonText={"OK"}
                    onChangeText={(e) => {
                        this.setState({
                            inputVal: e
                        })
                    }}
                    inputValue={this.state.inputVal}
                    closeModal={() => this.setState(
                        {
                            modalVisible: !this.state.modalVisible,

                        }, () => this.addNewWorkout())} />
                <View>
                    <Title style={styles.header}>Workouts:</Title>
                </View>
                <View >
                    <Button icon="add" style={styles.button} mode="contained" onPress={this.openModal}>Add</Button>
                </View>

                <View style={styles.listContainer}>
                    {this.state.workoutList.map((workout) => {
                        
                        return <TouchableNativeFeedback key={Math.random()} onPress={() => this.props.navigate.navigate('ExerciseList', {

                            title: workout.name,
                            exercises: workout.exercises,

                        })}>
                            <Card style={styles.listItem}>
                                <Card.Title  title={workout.name} left={(props) => <Avatar.Icon {...props} icon={'description'} />}/>
                            </Card>
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
        margin: 5,
        width: 300,
        alignSelf: 'center'

    },
    button: {
       
        alignSelf: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black',
        marginBottom: 20,
        marginTop: 20
    },
    buttonNew: {
        width: '90%',
        alignSelf: 'center'
    },
    modal: {

    }


});