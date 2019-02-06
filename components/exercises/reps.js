import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet} from 'react-native';


export default class Record extends Component {
    constructor(props){
        super(props)

        this.state={
            reps: "0",
            weight: "0",
            oneRepMax: "0"
        }
        this.calculateOneRepMax = this.calculateOneRepMax.bind(this)
    }

    calculateOneRepMax() {
        console.log("Reps: ", this.state.reps, "Weight: ", this.state.weight)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Reps:</Text><TextInput name="reps" onChangeText={(e)=>{this.setState({reps: e})}} value={this.state.reps}/>
                <Text>Weight (kg)</Text><TextInput name="weight" onChangeText={(e)=>{this.setState({weight: e})}} value={this.state.weight}/>
                
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
  });
  