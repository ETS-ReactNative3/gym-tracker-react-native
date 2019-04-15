import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, AsyncStorage, Image } from 'react-native';
import { Card, Title, Button  } from 'react-native-paper'
import Reps from './reps'
import Timer from '../timer/timer'
import NoImage from '../../images/noimage.jpg'

export default class ExercisePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfRepsComponents: [1, 2, 3],
            height: 250,
            repRecord: [],
            repRecordTemp: {},
            repRow: {},
            modalVisible: false,
            deleteIcon: null
        }
        this.addExtraReps = this.addExtraReps.bind(this)
        this.removeReps = this.removeReps.bind(this)
        this.saveReps = this.saveReps.bind(this)
        this.saveRepRow = this.saveRepRow.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        
        
        
    }

    componentDidMount(){
        const { navigation } = this.props;
        const exerciseName = navigation.getParam('exerciseName', 'No Name Provided');
        this.setState({
            exerciseName: exerciseName
        })
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
            alert("You can't have more than 8 sets")
        }
        
    }


    // Removes the last rep component line if there are more than 3
    removeReps() {
        if (this.state.numberOfRepsComponents.length <= 3) {
            
            return 
        } else {
            
            const newState = this.state.numberOfRepsComponents
            newState.pop()

            this.setState({
                numberOfRepsComponents: newState,
                height: this.state.height - 65
            })
            
        }
    }

     

    // Tracks the number of rep row instances in order to safely add and delete them as components. 
    saveRepRow(repRow, id) {
        repRow.date = Date.now()
        this.setState({
            repRecordTemp: { [id]: repRow },
            repRow: repRow
        })

    
    }

    // Persist all ex record data to Async storage:
    saveReps() {

        const key = this.state.exerciseName
      
        
        // check if async contains exercise log obj
        AsyncStorage.getAllKeys().then(res => {
         
            if (res.includes(key)) {
                // if yes - append new rep record to end of workout obj
                AsyncStorage.getItem(key).then(doc => {

                    const prevWoObj = JSON.parse(doc)

                    // Dynamically increasing key number - used as set ID
                    
                    const idVal = Object.keys(prevWoObj[key]).length
                    
                    


                    // adding new set to the exercise log object
                    prevWoObj[key][idVal] = this.state.repRow
                    
                    

                    // saving exercise log object to local storage
                    AsyncStorage.setItem(key, JSON.stringify(prevWoObj), err => console.log("error in final set item: ", err))
                        
                        .catch(err => console.log("Error: ", err))
                   
                })
                    .catch(err => console.log("Error: ", err))


            } else {
                //  if no - create new obj and save reprow to it
                const woObj = {
                    [key]: {
                        0: this.state.repRow
                    }
                }
                AsyncStorage.setItem(key, JSON.stringify(woObj))
               
                    .catch(err => console.log("Error: ", err))
                
            }
        })
        .catch(err=>console.log("Error: ", err))
         
        this.setState({
            repRecord: [...this.state.repRecord, this.state.repRecordTemp],
            
        })
        
        
        // Launch timer component
        this.setModalVisible()
    }

   

    render() {
        const { navigation } = this.props;
        const exerciseNameProp = navigation.getParam('exerciseName', 'No Name Provided');
        const exerciseImage = navigation.getParam('exerciseImage', NoImage);
        
        const repsContainerStyling = {            
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
                    
                    <Image source={{uri: exerciseImage}} style={styles.imageBox} />
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
                    <Button mode="contained" disabled={true}>Notes</Button>
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