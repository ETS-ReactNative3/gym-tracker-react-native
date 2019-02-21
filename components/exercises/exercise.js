import React, { Component } from 'react'
import { View, TextInput, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Reps from './reps'
import Timer from '../timer/timer'



export default class ExercisePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfRepsComponents: [1, 2, 3],
            height: 200,
            repRecord: [],
            modalVisible: false,
            deleteIcon: null
        }
        this.addExtraReps = this.addExtraReps.bind(this)
        this.removeReps = this.removeReps.bind(this)
        this.saveReps = this.saveReps.bind(this)
        this.saveRepRow = this.saveRepRow.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.showDeleteIcon = this.showDeleteIcon.bind(this)
        this.hideDeleteIcon = this.hideDeleteIcon.bind(this)
    }

    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    addExtraReps() {
        if (this.state.numberOfRepsComponents.length <= 7) {
            this.setState({
                numberOfRepsComponents: [...this.state.numberOfRepsComponents, this.state.numberOfRepsComponents.length + 1],
                height: this.state.height + 30
                
            })
            this.showDeleteIcon()
        } else {
            console.log("Can't have more than 8 reps")
        }
        
    }

    showDeleteIcon() {
        this.setState({
            deleteIcon: require('../../images/btn-del.png')
        })
    }
    hideDeleteIcon() {
        this.setState({
            deleteIcon: null
        })
    }

    // Removes the last rep component line if there are more than 3
    removeReps() {
        if (this.state.numberOfRepsComponents.length <= 3) {
            this.hideDeleteIcon()
            return console.log("There aren't any reps components to remove")
        } else {
            console.log("Removing reps")
            const newState = this.state.numberOfRepsComponents
            newState.pop()

            this.setState({
                numberOfRepsComponents: newState,
                height: this.state.height - 30
            }, () => { if(this.state.numberOfRepsComponents.length <= 3) {
                this.hideDeleteIcon()
            }})
            
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
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingTop: 20,
            paddingBottom: 20,
            padding: 20,
            margin: 0,
            height: this.state.height,
            alignSelf: 'center'
    }


        return (
            <ScrollView>
                <View style={styles.containerHeader}>
                    <Text style={styles.header}>{exerciseNameProp}</Text>
                    {/* This will be replaced with a dynamically loading image of the exercise, passed as a prop */}
                    <View style={styles.imageBox} />
                </View>
                <View style={repsContainerStyling}>
                    {this.state.numberOfRepsComponents.map((id) => {
                        return <Reps id={id} key={id} style={styles.reps} removeReps={this.removeReps} delImgUrl={this.state.deleteIcon} addRepRow={(repRow) => this.saveRepRow(repRow, id)} />
                    })}

                </View>
                <View style={styles.buttonSave}>
                    <Button title="Save" onPress={this.saveReps} />
                </View>
                <View style={styles.buttonRow}>
                    <Button style={styles.buttonAdd} title="Add reps" onPress={this.addExtraReps} />
                    <Button title="Timer" onPress={this.setModalVisible} />
                    <Button title="Notes" />
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