import React, { Component } from 'react'
import { View, ScrollView, Modal, AsyncStorage } from 'react-native'
import { Button, Title, TextInput, Searchbar } from 'react-native-paper'
import ExerciseListItem from './exerciseListItem';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addExercise } from '../../actions/exercise-actions'
import { addExerciseToWorkout } from '../../actions/workout-actions'

class AddExerciseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: [{ exerciseName: "Loading exercises...", id: 1 }],
            itemIdList: [],
            modalVisible: false,
            inputValue: "",
            searchText: "",
            filteredArray: [{ exerciseName: "Loading exercises...", id: 1 }],
            passToRedux: []
        };
        this.toggleHighlightItem = this.toggleHighlightItem.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.filterList = this.filterList.bind(this);
        this.saveToMongo = this.saveToMongo.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add new exercises"
        };
    };

    componentDidMount() {
        // fetch list of exercises from mongo
        // set list of exercises to filteredarray state.

        fetch(
            `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/exercise/`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
            .then(response => {
                return response.json();
            })
            .then(response => {

                this.setState({
                    exerciseList: response,
                    filteredArray: response
                })
            })
            .catch(err => console.log("Fetch error: ", err))
    }

    // toggle function adds/ removes exercise name to state
    toggleHighlightItem(exId) {
        if (!this.state.itemIdList.includes(exId)) {
            
            // Search for exercise id in exerciselist - return object
            const newItem = this.state.exerciseList.find(exObj => {
                if (exObj.id === exId) {
                    return exObj
                } else return
            })
            
            this.setState({
                itemIdList: [...this.state.itemIdList, exId],
                passToRedux: [...this.state.passToRedux, newItem]
            });
        } else {
            const removedElementArr = this.state.itemIdList.filter(el => {
                return el !== exId;
            });
            const removedPassToReduxArr = this.state.passToRedux.filter(el => {
                return el.id !== exId;
            });
            this.setState({
                itemIdList: removedElementArr,
                passToRedux: removedPassToReduxArr
            });
        }
    }

    

    componentWillUnmount() {
        //   pass array of exercises to add to workout redux action
        const { navigation } = this.props;
        const workoutId = navigation.getParam("id", "no id found");

        const updateExInWorkout = {
            workoutId: workoutId,
            exercises: this.state.passToRedux
        };
      
        this.props.addExercise(this.state.passToRedux);
        this.props.addExerciseToWorkout(updateExInWorkout);

    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    filterList(e) {
        if (e) {
            const newArr = this.state.exerciseList.filter(ex => {
                return ex.exerciseName.match(e);
            });
            this.setState({
                searchText: e,
                filteredArray: newArr
            });
        } else {
            this.setState({
                searchText: e,
                filteredArray: this.state.exerciseList
            });
        }
    }

    saveToMongo(newEx) {
        const newExercise = JSON.stringify(newEx)
        fetch(
            `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/exercise/`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: newExercise
            }
        )
            .catch(err => console.log("Error sending new exercise to MONGO: ", err))

    }

    render() {
        const style = {
            highlighted: {
                backgroundColor: "#32CD32"
            },
            unHighlighted: {
                backgroundColor: "white"
            },
            title: {
                fontSize: 20,
                alignSelf: "center"
            },
            button: {
                width: 100,
                alignSelf: "center",
                margin: 10
            },
            buttonContainer: {
                flexDirection: "row",
                margin: 10
            },
            searchInput: {
                margin: 10
            },
            modalContainer: {
                backgroundColor: "white",
                width: 300,
                height: 300,
                alignSelf: "center",
                padding: 20,
                borderRadius: 10
            },
            outerModalContainer: {
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00000080"
            },
            innerModalContainer: {
                width: 300,
                height: 200,
                backgroundColor: "#fff",
                padding: 20
            }
        };

        return (
            <View>
                <Modal
                    transparent={true}
                    autoFocus={true}
                    visible={this.state.modalVisible}
                    onRequestClose={this.toggleModal}
                    onDismiss={this.toggleModal}
                >
                    <View style={style.outerModalContainer}>
                        <View style={style.innerModalContainer}>
                            <TextInput
                                label={"Enter exercise name: "}
                                mode={"outlined"}
                                maxLength={10}
                                onChangeText={e => this.setState({ inputValue: e })}
                                value={this.state.inputValue}
                            />

                            <Button
                                style={style.button}
                                mode="contained"
                                onPress={() => {
                                    if (this.state.inputValue) {
                                        const newExObj = {
                                            id: this.state.exerciseList.length + 1,
                                            exerciseName: this.state.inputValue,
                                            imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/noimage.jpg"

                                        };
                                        const oldstate = this.state.exerciseList;
                                        oldstate.unshift(newExObj);
                                        this.setState({
                                            modalVisible: !this.state.modalVisible,
                                            exerciseList: oldstate,
                                            inputValue: ""
                                        });
                                        this.saveToMongo(newExObj)
                                    } else this.toggleModal();
                                }}
                            >
                                Add
              </Button>
                        </View>
                    </View>
                </Modal>

                <ScrollView>
                    <Title style={style.title}>Add an Exercise:</Title>
                    <View style={style.buttonContainer}>
                        <Button
                            style={style.button}
                            icon="done"
                            mode="contained"
                            onPress={() => this.props.navigation.goBack()}
                        >
                            Finish
            </Button>
                        <Button
                            style={style.button}
                            icon="add"
                            mode="contained"
                            onPress={() =>
                                this.setState({
                                    modalVisible: !this.state.modalVisible
                                })
                            }
                        >
                            New
            </Button>
                    </View>
                    <Searchbar
                        autoFocus={true}
                        placeholder={"Search..."}
                        style={style.searchInput}
                        value={this.state.searchText}
                        onChangeText={this.filterList}
                    />
                    <View>
                        {this.state.filteredArray.map(exercise => {

                            return (
                                <ExerciseListItem
                                    id={exercise.id}
                                    key={Math.random()}
                                    exerciseName={exercise.exerciseName}
                                    onPress={() => this.toggleHighlightItem(exercise.id)}
                                    buttonSelected={
                                        this.state.itemIdList.includes(exercise.id)
                                            ? style.highlighted
                                            : style.unHighlighted
                                    }
                                />
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {

    const { exercises } = state.exerciseReducer
    return { exercises }

};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ addExercise, addExerciseToWorkout }, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddExerciseList);