import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import ExerciseListItem from './exerciseListItem'


export class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [
                "Benchpress",
                "Squat",
                "Lateral extensions",
                "Bicep curls",
                "Tricep extensions",
                "Shrugs"
            ]


        }
    }


    render() {
        const navigate = this.props.navigate
        return (
            <View style={styles.scrollView}>
                <View>
                    <Text style={styles.header}>List of Exercises</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                
                    {this.state.exercises.map((ex) => {
                        console.log(ex)
                        return <ExerciseListItem style={styles.listItem} exerciseName={ex} key={Date.now()} pressMe={() => navigate('Exercises', {
                            exerciseName: ex
                        })} />
                    })}
                    {/* <View></View> */}
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: '20'
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


export default ExerciseList