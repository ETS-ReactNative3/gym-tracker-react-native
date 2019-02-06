import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import Reps from './reps'

export default class ExercisePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            numberOfRepsComponents: [1, 2, 3]
        }
        this.addExtraReps = this.addExtraReps.bind(this)
    }

    addExtraReps() { 
        
        this.setState({
            numberOfRepsComponents: [...this.state.numberOfRepsComponents, this.state.numberOfRepsComponents.length + 1]
        })
        

    }

    render() {
        return (
            <View>
                <View style={styles.containerHeader}>
                    <Text style={styles.header}>Bench Press</Text>
                </View>
                <View style={styles.container}>
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
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 20,
        margin: 0,
        height: 200,
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
    buttonAdd: {
        width: '10px'
    }
});