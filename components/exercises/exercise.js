import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import Reps from './reps'

export default class ExercisePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfRepsComponents: [1, 2, 3],
            containerHeight: 250
        }
        this.addExtraReps = this.addExtraReps.bind(this)
        this.repsContainerStyling = this.repsContainerStyling.bind(this)
        this.removeReps = this.removeReps.bind(this)
        this.saveReps = this.saveReps.bind(this)
    }

    addExtraReps() {
        if (this.state.numberOfRepsComponents.length <= 7) {
            this.setState({
                numberOfRepsComponents: [...this.state.numberOfRepsComponents, this.state.numberOfRepsComponents.length + 1],
                containerHeight: this.state.containerHeight + 30
            })
        } else {
            console.log("Can't have more than 8 reps")
        }
    }

    // Removes the last rep component line if there are more than 3
    removeReps() {
        if (this.state.numberOfRepsComponents.length <= 3) {
            return console.log("There aren't any reps components to remove")
        } else {
            console.log("Removing reps")
            const newState = this.state.numberOfRepsComponents
            newState.pop()

            this.setState({
                numberOfRepsComponents: newState,
                containerHeight: this.state.containerHeight - 30
            })
        }
    }

    repsContainerStyling = () => {
        const containerHeightStyle = this.state.containerHeight
        return {
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingTop: 20,
            paddingBottom: 20,
            margin: 0,
            height: containerHeightStyle,
        }
    }
    
    saveReps() {
        console.log("Saving reps")
    }

    render() {
        return (
            <View>
                <View style={styles.containerHeader}>
                    <Text style={styles.header}>Bench Press</Text>
                    {/* This will be replaced with a dynamically loading image of the exercise, passed as a prop */}
                    <View style={styles.imageBox} />
                </View>
                <View style={this.repsContainerStyling()}>
                    {this.state.numberOfRepsComponents.map((id) => {
                        return <Reps id={id} key={id} style={styles.reps} removeReps={this.removeReps} />
                    })}
                    <Button title="Save" onPress={this.saveReps} />
                    <View style={styles.buttonRow}>
                        <Button style={styles.buttonAdd} title="Add reps" onPress={this.addExtraReps} />
                        <Button title="Timer" />
                        <Button title="Notes" />
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        width: '100%',
        padding: 20
    },
    imageBox: {
        height: 200,
        width: 200,
        backgroundColor: 'black',
        marginTop: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black'
    },
    reps: {
        margin: 0,
        padding: 0,
        flexWrap: 'nowrap',
    },
    
    buttonRow: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-evenly'

    },

});