import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';


export default class RecordLine extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reps: "0",
            weight: "0",
            oneRepMax: "0"
        }
        this.calculateOneRepMax = this.calculateOneRepMax.bind(this)
    }

    // Fix calculation
    calculateOneRepMax() {
        const weight = parseInt(this.state.weight)
        const reps = parseInt(this.state.reps)
        const total = weight * 36 / (37 - reps) * 10
        this.setState({
            oneRepMax: Math.round(total)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Reps:</Text><TextInput keyboardType='numeric' name="reps" onChangeText={(e) => { this.setState({ reps: e }) }} value={this.state.reps} />
                <Text>Weight (kg)</Text><TextInput keyboardType='numeric' name="weight" onChangeText={(e) => {
                    this.setState({ weight: e })
                    this.calculateOneRepMax()
                }} value={this.state.weight} />
                <Text style={styles.oneRepMaxText}>{this.state.oneRepMax}kg 1RM</Text>

                <TouchableNativeFeedback onPress={this.props.removeReps}>
                    <Image source={require('../../images/btn-del.png')} style={styles.removeButton} />
                </TouchableNativeFeedback>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 0,
        marginBottom: 0,
        padding: 0,

    },
    oneRepMaxText: {
        color: 'grey'
    },
    removeButton: {
        height: 15,
        width: 15,
        marginLeft: 10
    }
});
