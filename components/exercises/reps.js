import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { Card, Title, Avatar, Icon, TextInput, Text, } from 'react-native-paper'

export default class RecordLine extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reps: "",
            weight: "",
            oneRepMax: "0",
            weightUnits: "kg"
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
            <Card elevation={1} style={styles.container}>


                <View style={styles.container}>
                    <TextInput mode={'outlined'} label={'Reps'} placeholder={'0'} style={styles.input} keyboardType='numeric' name="reps" onChangeText={(e) => {
                        this.setState({ reps: e }, () => { this.calculateOneRepMax() })
                    }} value={this.state.reps} />
    
    
    
                    <TextInput mode={'outlined'} label={this.state.weightUnits} placeholder={'0'} style={styles.input} keyboardType='numeric' name="weight" onChangeText={(e) => {
                        this.setState({ weight: e }, () => { this.calculateOneRepMax() })
    
                    }} value={this.state.weight} />
    
    
                    {/* <Text style={styles.oneRepMaxText}>{this.state.oneRepMax}kg 1RM</Text> */}
    
                    {/* <TouchableNativeFeedback onPress={this.props.removeReps}>
                        <Image source={this.props.delImgUrl} style={styles.removeButton} />
                    </TouchableNativeFeedback> */}
                </View>


            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        width: '90%',
        flexWrap: "nowrap",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 65,
    },
    input: {
        
        height: 60,
        width: 70
    },
    oneRepMaxText: {
        color: 'grey'
    },
    removeButton: {
        height: 15,
        width: 15,
        
    }
});
