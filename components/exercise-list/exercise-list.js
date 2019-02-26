import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Title, Avatar, Icon } from 'react-native-paper'
import ExerciseListItem from './exerciseListItem'
import { withNavigation } from 'react-navigation'
import AddExerciseList from './add-exercise-list'

export class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
        this.updateExercise = this.updateExercise.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'no title available');
        const exercises = navigation.getParam('exercises', 'no exercises found');

        this.setState({
            title: title,
            exercises: exercises,
            modalVisible: false
        })
    }
    updateExercise(newExercise) {

        this.setState({
            exercises: [...this.state.exercises, ...newExercise]
        })
    }
    
    deleteItem() {

        const newArray = this.state.exercises.filter(exercise => exercise.id !== ex.id)

        this.setState({
            ExerciseList: newArray
        })
    }
    render() {

        return (
            <ScrollView style={styles.scrollView}>

                <View>
                    <Title style={styles.header}>{this.state.title}</Title>
                </View>
                <Button icon="add" mode="contained" onPress={() => this.props.navigation.navigate('AddExerciseList', { updateExercise: this.updateExercise.bind(this) })}>Add exercise</Button>


                {this.state.exercises.map((ex) => {

                    return <ExerciseListItem style={styles.listItem} exerciseName={ex} key={Math.random()} onPress={() => this.props.navigation.navigate('Exercises', { exerciseName: ex })} />
                })}

            </ScrollView>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black',
        marginBottom: 20,
        marginTop: 20
    },
    scrollView: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',

    },


});


export default withNavigation(ExerciseList)