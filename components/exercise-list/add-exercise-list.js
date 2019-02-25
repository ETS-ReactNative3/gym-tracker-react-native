import React, { Component } from 'react'
import { View, Text, Button, ScrollView, TouchableHighlight } from 'react-native'
import exercises from './exerciseDB'
import ExerciseListItem from './exerciseListItem';

export default class AddExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exerciseList: [],
            itemIdList: []
        }
        this.toggleHighlightItem = this.toggleHighlightItem.bind(this)

    }

    componentDidMount() {
        this.setState({
            exerciseList: exercises
        })
    }

    // toggle function adds/ removes exercise name to state
    toggleHighlightItem(name) {
        if (!this.state.itemIdList.includes(name)) {

            this.setState({
                itemIdList: [...this.state.itemIdList, name]

            })

        } else {

            let removedElementArr = this.state.itemIdList.filter((el) => {

                return el !== name

            })

            this.setState({
                itemIdList: removedElementArr

            })
        }


    }

    componentWillUnmount() {
        this.props.navigation.state.params.updateExercise(this.state.itemIdList);
    }

    render() {
        const style = {
            highlighted: {
                backgroundColor: 'green'
            },
            unHighlighted: {
                backgroundColor: 'white'
            }
        }



        return (
            <View>
                <ScrollView>
                    <Text>Add an Exercise:</Text>
                    <Button title={"Add"} onPress={() => this.props.navigation.goBack()}/>
                    <View>
                        {this.state.exerciseList.map((exercise) => {
                            return <ExerciseListItem id={exercise.id} key={Math.random()} exerciseName={exercise.name} onPress={() => this.toggleHighlightItem(exercise.name)} buttonSelected={this.state.itemIdList.includes(exercise.name) ? style.highlighted : style.unHighlighted} />
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
