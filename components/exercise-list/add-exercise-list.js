import React, { Component } from 'react'
import { View, ScrollView, Modal, Text } from 'react-native'
import { Button, Title, TextInput, Searchbar } from 'react-native-paper'
import exercises from './exerciseDB'
import ExerciseListItem from './exerciseListItem';
import InputModal from './inputModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addExercise } from '../../actions/exercise-actions'
import { addExerciseToWorkout } from '../../actions/workout-actions'

class AddExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exerciseList: [],
            itemIdList: [],
            modalVisible: false,
            inputValue: '',
            searchText: '',
            filteredArray: [],
            passToRedux: []
        }
        this.toggleHighlightItem = this.toggleHighlightItem.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.filterList = this.filterList.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Add new exercises',
        };
      };


    componentDidMount() {
        this.setState({
            exerciseList: this.props.exercises,
            filteredArray: this.props.exercises
        })
    }

    // toggle function adds/ removes exercise name to state
    toggleHighlightItem(name) {
        if (!this.state.itemIdList.includes(name)) {
            const newItem = {id: this.props.exercises.length + 1, name: name}

            this.setState({
                itemIdList: [...this.state.itemIdList, name],
                passToRedux: [...this.state.passToRedux, newItem]

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
        const { navigation } = this.props;
        const workoutId = navigation.getParam('id', 'no id found')

        const updateExInWorkout = {workoutId: workoutId, exercises: this.state.passToRedux}
    
        this.props.addExercise(this.state.passToRedux)
        this.props.addExerciseToWorkout(updateExInWorkout)
        console.log("Action creator called")
    }

    toggleModal() {
        this.setState(
            {
                modalVisible: !this.state.modalVisible
            }
        )
    }



    filterList(e) {

        if (e) {
            const newArr = this.state.exerciseList.filter((ex) => {
                return ex.name.match(e)
            })
            this.setState({
                searchText: e,
                filteredArray: newArr
            })
        } else {
            this.setState({
                searchText: e,
                filteredArray: this.state.exerciseList
            })

        }
    }
    

    
    render() {
        const style = {
            highlighted: {
                backgroundColor: '#32CD32'
            },
            unHighlighted: {
                backgroundColor: 'white'
            },
            title: {
                fontSize: 20,
                alignSelf: 'center'
            },
            button: {
                width: 100,
                alignSelf: 'center',
                margin: 10
            },
            buttonContainer: {
                flexDirection: 'row',
                margin: 10
            },
            searchInput: {
                margin: 10
            },
            modalContainer: {
                backgroundColor: 'white',
                width: 300,
                height: 300,
                alignSelf: 'center',
                padding: 20,
                borderRadius: 10
            },
            outerModalContainer: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00000080'
            },
            innerModalContainer: {
                width: 300,
                height: 200,
                backgroundColor: '#fff',
                padding: 20
            }

        }

        return (
            <View>
                <Modal
                    transparent={true}
                    autoFocus={true}
                    visible={this.state.modalVisible}
                    onRequestClose={this.toggleModal}
                    onDismiss={this.toggleModal}>

                    <View style={style.outerModalContainer}>
                        <View style={style.innerModalContainer}>
                            <TextInput label={"Enter exercise name: "} mode={'outlined'} maxLength={10} onChangeText={(e) => this.setState({ inputValue: e })} value={this.state.inputValue}></TextInput>

                            <Button style={style.button} mode="contained" onPress={() => {
                                if (this.state.inputValue) {
                                    const newExObj = { id: this.state.exerciseList.length + 1, name: this.state.inputValue }
                                    const oldstate = this.state.exerciseList
                                    oldstate.unshift(newExObj)

                            

                                    this.setState(
                                        {
                                            modalVisible: !this.state.modalVisible,
                                            exerciseList: oldstate,
                                            inputValue: ''
                                        }
                                    )
                                } else this.toggleModal()


                            }}>Add</Button>
                        </View>
                    </View>
                </Modal>

                <ScrollView>
                    <Title style={style.title}>Add an Exercise:</Title>
                    <View style={style.buttonContainer}>
                        <Button style={style.button} icon="done" mode="contained" onPress={() => this.props.navigation.goBack()}>Finish</Button>
                        <Button style={style.button} icon="add" mode="contained" onPress={() => this.setState({
                            modalVisible: !this.state.modalVisible
                        })}>New</Button>
                    </View>
                    <Searchbar autoFocus={true} placeholder={"Search..."} style={style.searchInput} value={this.state.searchText} onChangeText={this.filterList}></Searchbar>
                    <View>
                        {this.state.filteredArray.map((exercise) => {
                            return <ExerciseListItem id={exercise.id} key={Math.random()} exerciseName={exercise.name} onPress={() => this.toggleHighlightItem(exercise.name)} buttonSelected={this.state.itemIdList.includes(exercise.name) ? style.highlighted : style.unHighlighted} />
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    console.log("Add exercise list", state)
    const { exercises } = state.exerciseReducer
    return { exercises }
    
  };

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({addExercise, addExerciseToWorkout}, dispatch)
    }
}


  
export default connect(mapStateToProps, mapDispatchToProps)(AddExerciseList);