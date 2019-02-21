import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import ExerciseListItem from './exerciseListItem'
import { withNavigation } from 'react-navigation'

export class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []

        
        }
        
    }

    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'no title available');
        const exercises = navigation.getParam('exercises', 'no exercises found');

        this.setState({
            title: title,
            exercises: exercises,
            
        })

    }
    

    render() {
       
       

        return (
            <View style={styles.scrollView}>
                <View>
                    <Text style={styles.header}>{this.state.title}</Text>
                </View>
                <ScrollView style={styles.scrollView}>

                    {this.state.exercises.map((ex) => {
                       
                        return <ExerciseListItem style={styles.listItem} exerciseName={ex} key={Date.now()} pressMe={() => this.props.navigation.navigate('Exercises', {exerciseName: ex})} />
                    })}
                   
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: '20'
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