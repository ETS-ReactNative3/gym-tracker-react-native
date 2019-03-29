import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView } from 'react-native'
import {Button, Card, Title, Avatar, Icon} from 'react-native-paper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InputModal from './inputModal'
import {addWorkout}  from '../../actions/workout-actions'

class WorkoutList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            inputVal: ""
        }

        this.openModal = this.openModal.bind(this)
        this.addNewWorkout = this.addNewWorkout.bind(this)
    }

    componentDidMount() {
       
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
           
            let newWorkoutObj = { id: this.props.workouts.length, "name": newWorkoutName, "exercises": [] }
            console.log('new workout name: ', newWorkoutObj)
            this.props.addWorkout(newWorkoutObj)

            this.setState({
                // workoutList: [...this.state.workoutList, newWorkoutObj],
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
                    {this.props.workouts.map((workout) => {
                        
                        return <TouchableNativeFeedback key={Math.random()} onPress={() => this.props.navigate.navigate('ExerciseList', {
                            id: workout.id,
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

const mapStateToProps = (state) => {
  
    const { workouts } = state.workoutReducer
    return { workouts }
  };

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addWorkout,
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);