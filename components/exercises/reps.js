import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet} from 'react-native';


export default class RecordLine extends Component {
    constructor(props){
        super(props)

        this.state={
            reps: "0",
            weight: "0",
            oneRepMax: "0"
        }
        this.calculateOneRepMax = this.calculateOneRepMax.bind(this)
    }

    // Fix calculation
    calculateOneRepMax() {
        const weight = parseInt(this.state.weight, 10)
        const reps = parseInt(this.state.reps, 10)
        const var1 = 1.0278
        const var2 = 0.0278
        const calc1 = var2 * reps
        const calc2 = var1 - calc1
        const total = weight / calc2
        this.setState({
            oneRepMax: Math.round(total)
        })

    
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Reps:</Text><TextInput name="reps" onChangeText={(e)=>{this.setState({reps: e})}} value={this.state.reps}/>
                <Text>Weight (kg)</Text><TextInput name="weight" onChangeText={(e)=>{
                    this.setState({weight: e}) 
                    this.calculateOneRepMax()
                    }} value={this.state.weight}/>
                <Text style={styles.oneRepMaxText}>{this.state.oneRepMax}kg 1RM</Text> 
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
    }
  });
  