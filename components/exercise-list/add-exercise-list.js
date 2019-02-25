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

    toggleHighlightItem(id) {
        const elId = id

        if (!this.state.itemIdList.includes(id)) {

            this.setState({
                itemIdList: [...this.state.itemIdList, id]

            })

        } else if (this.state.itemIdList.includes(id)) {

            let removedElementArr = this.state.itemIdList.filter((el) => {

                return el !== elId

            })

            this.setState({
                itemIdList: removedElementArr

            })
        } else return


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
                    <Button title={"Add"} />
                    <View>
                        {this.state.exerciseList.map((exercise) => {
                            return <ExerciseListItem id={exercise.id} key={Math.random()} exerciseName={exercise.name} onPress={() => this.toggleHighlightItem(exercise.id)} buttonSelected={this.state.itemIdList.includes(exercise.id) ? style.highlighted : style.unHighlighted}/>
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
