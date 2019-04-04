import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableNativeFeedback,
    ScrollView,
    AsyncStorage
} from "react-native";
import { Button, Card, Title, Avatar, Icon } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputModal from "./inputModal";
import { addWorkout, addInitialWorkout } from "../../actions/workout-actions";
let userID = 1;
const workoutKey = "workoutList";


class WorkoutList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            inputVal: ""
        };

        this.openModal = this.openModal.bind(this);
        this.addNewWorkout = this.addNewWorkout.bind(this);
        this.updateLocalStorage = this.updateLocalStorage.bind(this)
    }

    // Checking if workout array is saved to local storage.
    // if in local storage - update redux - redux will render the existing workouts.
    // if not in local storage - make fetch call to mongo and get the workouts object for the user - then update redux & local storage with returned obj.
    componentDidMount() {

        
        // get user id from local storage
        // AsyncStorage.getItem("gym-userID")
        //     .then(id => {
        //         userID = JSON.parse(id);

        //     })
        //     .catch(err =>
        //         console.log("Error getting user id from local storage: ", err)
        //     );

        // check local storage for workout obj
        AsyncStorage.getAllKeys((err, store) => {
            console.log("error", err);


            if (store.includes(workoutKey)) {
                // if yes - send to action creator - update redux state

                AsyncStorage.getItem(workoutKey)
                    .then(doc => {
                        console.log("Workouts object: ", JSON.parse(doc));
                        this.props.addInitialWorkout(JSON.parse(doc));
                    })
                    .catch(err =>
                        console.log(
                            "Error getting workouts object from local storage: ",
                            err
                        )
                    );
            } else {

                // if none - fetch list of workouts from mongo
                fetch(
                    `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/workout-list/${userID}`,
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
                    .then(res => {
                        // send to action creator - update redux state & save to local storage
                        this.props.addInitialWorkout(res[0]);
                        AsyncStorage.setItem(workoutKey, JSON.stringify(res[0]))
                            .catch(
                                err =>
                                    console.log(
                                        "Error setting fetch response to local storage: ",
                                        err
                                    )
                            );
                    })
            }
        }).catch(err =>
            console.log("Error getting ALL KEYS from local storage: ", err)
        );
    }

    static navigationOptions = {
        title: "All Workouts"
    };

    openModal() {
        this.setState({
            modalVisible: true
        });
    }

    updateLocalStorage(name, newObj) {
        AsyncStorage.setItem(name, JSON.stringify(newObj))
            .then(() => {
                AsyncStorage.getItem(name)
                    .then(doc => console.log("UPDATE LOCAL STORAGE :", JSON.parse(doc)))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
         
    }

    addNewWorkout() {
        if (this.state.inputVal) {
            const newWorkoutName = this.state.inputVal;

            let newWorkoutObj = {
                id: this.props.workouts.length,
                name: newWorkoutName,
                exercises: []
            };
            // save to local storage
            AsyncStorage.getItem(workoutKey)
            .then(doc => {
                const res = JSON.parse(doc)
                console.log("value of local storage: ", JSON.parse(doc))
                res.workouts.push(newWorkoutObj)
                this.updateLocalStorage(workoutKey, res)
            })
            .catch(err => console.log(err))
            
            // send to redux
            this.props.addWorkout(newWorkoutObj)

            this.setState({
                inputVal: ""
            });
        }
    }

    render() {
        return (
            <ScrollView>
                <InputModal
                    maxLength={10}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: !this.state.modalVisible
                        });
                    }}
                    styles={styles.modal}
                    header={"Enter new workout name:"}
                    buttonText={"OK"}
                    onChangeText={e => {
                        this.setState({
                            inputVal: e
                        });
                    }}
                    inputValue={this.state.inputVal}
                    closeModal={() =>
                        this.setState(
                            {
                                modalVisible: !this.state.modalVisible
                            },
                            () => this.addNewWorkout()
                        )
                    }
                />
                <View>
                    <Title style={styles.header}>Workouts:</Title>
                </View>
                <View>
                    <Button
                        icon="add"
                        style={styles.button}
                        mode="contained"
                        onPress={this.openModal}
                    >
                        Add
          </Button>
                </View>

                <View style={styles.listContainer}>
                    {this.props.workouts.map(workout => {
                        return (
                            <TouchableNativeFeedback
                                key={Math.random()}
                                onPress={() =>
                                    this.props.navigate.navigate("ExerciseList", {
                                        id: workout.id,
                                        title: workout.name,
                                        exercises: workout.exercises
                                    })
                                }
                            >
                                <Card style={styles.listItem}>
                                    <Card.Title
                                        title={workout.name}
                                        left={props => (
                                            <Avatar.Icon {...props} icon={"description"} />
                                        )}
                                    />
                                </Card>
                            </TouchableNativeFeedback>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        width: "100%",
        padding: 20
    },
    listItem: {
        margin: 5,
        width: 300,
        alignSelf: "center"
    },
    button: {
        alignSelf: "center"
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        color: "black",
        marginBottom: 20,
        marginTop: 20
    },
    buttonNew: {
        width: "90%",
        alignSelf: "center"
    },
    modal: {}
});

const mapStateToProps = state => {
    const { workouts } = state.workoutReducer;
    return { workouts };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addWorkout,
            addInitialWorkout
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutList);
