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
        const constant = 37.0 / 36.0

        const total = (weight / (constant - (1.0 / 36.0 * reps)))

        this.setState({
            oneRepMax: Math.floor(total)
        }, () => { this.props.addRepRow(this.state) })

    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Reps:</Text><TextInput style={styles.input} keyboardType='numeric' name="reps" onChangeText={(e) => {
                    this.setState({ reps: e }, () => { this.calculateOneRepMax() })
                }} value={this.state.reps} />

                <Text>Weight (kg)</Text><TextInput style={styles.input} keyboardType='numeric' name="weight" onChangeText={(e) => {
                    this.setState({ weight: e }, () => { this.calculateOneRepMax() })

                }} value={this.state.weight} />
                <Text style={styles.oneRepMaxText}>{this.state.oneRepMax}kg 1RM</Text>

                <TouchableNativeFeedback onPress={this.props.removeReps}>
                    <Image source={this.props.delImgUrl} style={styles.removeButton} />
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
        marginTop: 0,
        marginBottom: 0,
        padding: 0,

    },
    input: {
       
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
