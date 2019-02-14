import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ExerciseListItem from './exerciseListItem'


export class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [
                { name: "Benchpress" },
                { name: "Squat" },
                { name: "Lateral extensions"}
            ]
        }
    }


    render() {
        return (
            <View>
                <View>
                    <Text style={styles.header}>List of Exercises</Text>
                </View>
                <View>
                    {/* {this.state.exercises.map((ex) => {
                        console.log(ex)
                        return <ExerciseListItem exerciseName={ex.name} key={Date.now()} />
                    })} */}

                </View>
                <View>
                    <ExerciseListItem exerciseName={"Benchpress"} />
                    <ExerciseListItem exerciseName={"Squat"} />
                    <ExerciseListItem exerciseName={"Lateral extensions"} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black',
        marginBottom: 20,
        marginTop: 20
    }

});


export default ExerciseList