import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Title, Avatar, Icon } from 'react-native-paper'
import ExerciseListItem from './exerciseListItem'
import { withNavigation } from 'react-navigation'
import AddExerciseList from './add-exercise-list'

export class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [],
            itemIdList: [],
            title: "temp title"
        }
        this.updateExercise = this.updateExercise.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.toggleHighlightItem = this.toggleHighlightItem.bind(this)
    }

      static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', 'Workout'),
        };
      };

    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'no title available');
        const exercises = navigation.getParam('exercises', 'no exercises found');

       
        
        this.setState({
            title: title,
            exercises: exercises,
            modalVisible: false
        })
    }
    
    

    updateExercise(newExercise) {

        this.setState({
            exercises: [...this.state.exercises, ...newExercise]
        })
    }

    deleteItem(name) {

        // const newArray = this.state.exercises.filter(exercise => {
            
        //     return exercise !== name
        // })
        
        // this.setState({
        //     exercises: newArray
        // })
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


    render() {

        const style = {
            highlighted: {
                backgroundColor: 'red'
            },
            unHighlighted: {
                backgroundColor: 'white'
            }
        }

        return (
            <ScrollView style={styles.scrollView}>

                <View>
                    <Title style={styles.header}>{this.state.title}</Title>
                </View>
                <Button icon="add" mode="contained" onPress={() => this.props.navigation.navigate('AddExerciseList', { updateExercise: this.updateExercise.bind(this) })}>Add exercise</Button>


                {this.state.exercises.map((ex) => {

                    return <ExerciseListItem style={styles.listItem} exerciseName={ex} key={Math.random()} onPress={() => this.props.navigation.navigate('Exercises', { exerciseName: ex })} onLongPress={() => this.toggleHighlightItem(ex)} buttonSelected={this.state.itemIdList.includes(ex) ? style.highlighted : style.unHighlighted}/>
                })}

            </ScrollView>


        )
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


export default withNavigation(ExerciseList)