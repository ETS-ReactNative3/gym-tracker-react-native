import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import Reps from './reps'

export default class ExercisePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            numberOfRepsComponents: [1, 2, 3],
            containerHeight: 200
        }
        this.addExtraReps = this.addExtraReps.bind(this)
        this.repsContainerStyleing = this.repsContainerStyleing.bind(this)
    }

    addExtraReps() { 
        if(this.state.numberOfRepsComponents.length <= 7) {
            this.setState({
                numberOfRepsComponents: [...this.state.numberOfRepsComponents, this.state.numberOfRepsComponents.length + 1],
                containerHeight: this.state.containerHeight + 30
            })
           
        } else {
            console.log("Can't have more than 8 reps")
        }
    }

    repsContainerStyleing = () => {
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

    render() {
        return (
            <View>
                <View style={styles.containerHeader}>
                    <Text style={styles.header}>Bench Press</Text>
                </View>
                <View style={this.repsContainerStyleing()}>
                    {this.state.numberOfRepsComponents.map((id)=> {
                        return <Reps id={id} key={id} style={styles.reps}/>
                    })}
                    <Button style={styles.buttonAdd} title="Add reps" onPress={this.addExtraReps} />
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
        backgroundColor: 'green',
        padding: 20
    },
    // container: {
    //     flexDirection: 'column',
    //     justifyContent: 'space-around',
    //     paddingTop: 20,
    //     paddingBottom: 20,
    //     margin: 0,
    //     height: this.state.containerHeight,
    // },
   
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
    buttonAdd: {
        width: '10px'
    }
});