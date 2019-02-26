import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Avatar, Icon, Button  } from 'react-native-paper'
import Reps from './reps'
import Timer from '../timer/timer'



export default class ExercisePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfRepsComponents: [1, 2, 3],
            height: 250,
            repRecord: [],
            modalVisible: false,
            deleteIcon: null
        }
        this.addExtraReps = this.addExtraReps.bind(this)
        this.removeReps = this.removeReps.bind(this)
        this.saveReps = this.saveReps.bind(this)
        this.saveRepRow = this.saveRepRow.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('exerciseName', 'Workout'),
        };
      };

    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    addExtraReps() {
        if (this.state.numberOfRepsComponents.length <= 7) {
            this.setState({
                numberOfRepsComponents: [...this.state.numberOfRepsComponents, this.state.numberOfRepsComponents.length + 1],
                height: this.state.height + 65
                
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
                height: this.state.height - 65
            })
            
        }
    }


    saveRepRow(repRow, id) {
        repRow.date = Date.now()
        this.setState({
            repRecordTemp: { [id]: repRow }
        })
    }

    // Need to make sure each rep record line is unique (using id) overwriting the old value.
    saveReps() {
        this.setState({
            repRecord: [...this.state.repRecord, this.state.repRecordTemp]
        })
        console.log(this.state.repRecord)
        
        // LAUNCH TIMER COMPONENT
        this.setModalVisible()
    }

   

    render() {
        const { navigation } = this.props;
        const exerciseNameProp = navigation.getParam('exerciseName', 'No Name Provided');
       
        const repsContainerStyling = {
            // flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 5,
            margin: 10,
            height: this.state.height,
            alignSelf: 'center',
            width: '90%'
    }


        return (
            <ScrollView>
                <View style={styles.containerHeader}>
                    <Title style={styles.header}>{exerciseNameProp}</Title>
                    {/* This will be replaced with a dynamically loading image of the exercise, passed as a prop */}
                    <View style={styles.imageBox} />
                </View>
                <Card elevation={2} style={repsContainerStyling}>
                
                    {this.state.numberOfRepsComponents.map((id) => {
                        return <Reps id={id} key={id} removeReps={this.removeReps} delImgUrl={this.state.deleteIcon} addRepRow={(repRow) => this.saveRepRow(repRow, id)} deleteIcon={this.state.numberOfRepsComponents.length <= 3 ? {display: 'none'} : {display: null} }/>
                    })}



                </Card>
                <View style={styles.buttonSave}>
                    <Button mode="contained" onPress={this.saveReps} >Save</Button>
                </View>
                <View style={styles.buttonRow}>
                    <Button mode="contained" style={styles.buttonAdd} onPress={this.addExtraReps} >Add reps</Button>
                    <Button mode="contained" onPress={this.setModalVisible}>Timer</Button>
                    <Button mode="contained" >Notes</Button>
                </View>

                <Timer setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible} />
            </ScrollView>

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
        marginTop: 20,
        alignSelf: 'center'
    },
    
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black'
    },
    
    buttonSave: {
        width: '90%',
        alignSelf: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-evenly'

    },
    

});