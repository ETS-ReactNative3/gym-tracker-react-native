import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { Button, Title, } from 'react-native-paper'
import ExerciseListItem from './exerciseListItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addExercise } from '../../actions/exercise-actions'


class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [],
            itemIdList: [],
            title: "temp title"
        }
       
        
        this.toggleHighlightItem = this.toggleHighlightItem.bind(this)
        this.saveToMongo = this.saveToMongo.bind(this)
    }

      static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', 'Workout'),
        };
      };

    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'no title available');
        const exercises = navigation.getParam('exercises', 'no exercises found')
        
        this.setState({
            title: title,
            exercises: exercises,
            modalVisible: false
        })

        
       
        

    }
    
    
    

    
   

    toggleHighlightItem(name) {
        if (!this.state.itemIdList.includes(name)) {

            this.setState({
                itemIdList: [...this.state.itemIdList, name]

            })
        // show delete button in navbar
        } else {
            // if itemIdList is empty - remove navbar button

            let removedElementArr = this.state.itemIdList.filter((el) => {

                return el !== name

            })

            this.setState({
                itemIdList: removedElementArr

            })
        }


    }

    // Takes the record of workouts held in local storage and sends them to MongoDB.
    saveToMongo() {
        // AsyncStorage
        
        
    }


    render() {
        const { navigation } = this.props;
        const workoutId = navigation.getParam('id', 'no id found')
     

        const style = {
            highlighted: {
                backgroundColor: 'red'
            },
            unHighlighted: {
                backgroundColor: 'white'
            }
        }
        
        if(this.props.workouts[workoutId].exercises){
            return (
                <ScrollView style={styles.scrollView}>
    
                    <View>
                        <Title style={styles.header}>{this.state.title}</Title>
                    </View>
                    <Button icon="add" mode="contained" onPress={() => this.props.navigation.navigate('AddExerciseList', {
                        id: workoutId
                    })}>Add exercise</Button>
                    <Button icon="add" mode="contained" onPress={() => this.saveToMongo() }>Save Workout</Button>
    
    
                    {
                        this.props.workouts[workoutId].exercises.map((ex) => {
    
                        return <ExerciseListItem style={styles.listItem} exerciseName={ex} key={Math.random()} onPress={() => this.props.navigation.navigate('Exercises', { exerciseName: ex })} /> 
                    })}
    
                </ScrollView>
    
    
            )
        } else {
            return (
                <ScrollView style={styles.scrollView}>
    
                    <View>
                        <Title style={styles.header}>{this.state.title}</Title>
                    </View>
                    <Button icon="add" mode="contained" onPress={() => this.props.navigation.navigate('AddExerciseList')}>Add exercise</Button>
    
    
                   
                    
    
                </ScrollView>
    
    
            )
        }

        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black',
        marginBottom: 20,
        marginTop: 20
    },
    scrollView: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',

    },


});

const mapStateToProps = (state) => {

    const { exercises } = state.exerciseReducer
    const { workouts } = state.workoutReducer
  
    return { exercises, workouts }
  };

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addExercise,
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
