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
import {
  addWorkout,
  addInitialWorkout,
  addBlankWorkout
} from "../../actions/workout-actions";

import { withNavigation } from "react-navigation";
let userId
const workoutKey = "workoutList";

class WorkoutList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      inputVal: "",
     
    };

    this.openModal = this.openModal.bind(this);
    this.addNewWorkout = this.addNewWorkout.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.updateMongo = this.updateMongo.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
  }

  // Checking if workout array is saved to local storage.
  // if in local storage - update redux - redux will render the existing workouts.
  // if not in local storage - make fetch call to mongo and get the workouts object for the user - then update redux & local storage with returned obj.
  componentDidMount() {
    const workoutKey = "workoutList";
    // get user id from local storage
    AsyncStorage.getItem("gym-tracker-userId")
      .then(id => {
        userId = id
        
      })
      .catch(err =>
        console.log("Error getting user id from local storage: ", err)
      );

      

    // check local storage for workout obj
    // if exists - load it
    // if not - create get from mongo
    AsyncStorage.getItem("workoutList")
    .then(doc => {
        
      const savedWorkouts = JSON.parse(doc);
      
      console.log("savedWorkouts: ", savedWorkouts)

      if(savedWorkouts) {
       console.log("Value of user id: ", "let set userId => ", userId, "savedWorkouts.userid ==>", savedWorkouts.userid)
          if (savedWorkouts.userid === userId) {
           
              this.props.addInitialWorkout(savedWorkouts)
              
            } else {
              
              this.props.addBlankWorkout(this.state.userId)
              
            }
      } else {
        console.log("fetch Workouts called: ")

          fetch(
              `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/workout-list/${
                this.state.userId
              }`,
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
                if (res.length > 0) {
                    console.log("fetch GET workout in CDM - res: ", res)
                  this.props.addInitialWorkout(res[0]);
                  AsyncStorage.setItem(workoutKey, JSON.stringify(res[0]))
                  .catch(err => console.log("Error setting fetch response to local storage: ",err));
                } else {
                  alert("Please create a workout.");

                  const emptyWorkout = {
                    userid: userId,
                    workouts: []
                    }
                    AsyncStorage.setItem(workoutKey, JSON.stringify(emptyWorkout))
                  .catch(err => console.log("Error setting empty workout to local storage: ",err));
                  this.props.addInitialWorkout(emptyWorkout)
                }
              });
          }
        })
    .catch(err => console.log("Error:", err))
  

  }

  static navigationOptions = {
    title: "All Workouts"
  };

  openModal() {
    this.setState({
      modalVisible: true
    });
  }

  // save new redux emitted workout object to local storage - called from child - ex list
  async updateLocalStorage(name, newObj) {
    AsyncStorage.getItem(workoutKey)
      .then(doc => {
        const tempWorkout = JSON.parse(doc);
        tempWorkout.workouts = newObj;
        AsyncStorage.setItem(name, JSON.stringify(tempWorkout)).catch(err =>
          console.log(err)
        );
      })
      .catch(err => console.log(err));
  }

  updateWorkout(key, newObj) {
    this.updateLocalStorage(workoutKey, newObj).then(() => {
      AsyncStorage.getItem(workoutKey).then(doc => {
        this.updateMongo(JSON.parse(doc));
      });
    });
    //  PUT to mongo
  }

  
  updateMongo(body) {
    // take local storage object and PUT to mongo
        const recordID = body._id;
        console.log("Savign workout to MONGO: ", body, "recordID: ", recordID)
        const postBody = JSON.stringify(body);
    if(recordID) {
        console.log("workoutlist line 160 - PUT fetch")
        fetch(
        `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/workout-list/${recordID}`,
        {
            method: "PUT",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: postBody
        }
        ).catch(error => console.log("Error in fetch:", error));

    } else {
        console.log("workoutlist line 174 - POST fetch")
        fetch(
            `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/workout-list/`,
            {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                },
                body: postBody
            }
            )
            .then(res => {
                
                AsyncStorage.setItem(workoutKey, res._bodyText)
                .then(() => {
                    AsyncStorage.getItem(workoutKey)
                    .then(doc => console.log("Fetch post in local storage => ", doc))
                })
            })
            .catch(error => console.log("Error in fetch:", error));
    
    }
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
            console.log("Add new workout workoutlist line 190: ", doc)
          const res = JSON.parse(doc);
          console.log("ADDNEWWORKOUT workoutlist line 192 :", res);
          res.workouts.push(newWorkoutObj);

          this.updateLocalStorage(workoutKey, res);
          this.updateMongo(res);
        })
        .catch(err => console.log(err));

      // send to redux
      this.props.addWorkout(newWorkoutObj);

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
                  this.props.navigation.navigate("ExerciseList", {
                    id: workout.id,
                    userId: userId,
                    title: workout.name,
                    exercises: workout.exercises,
                    updateWorkout: (key, data) => this.updateWorkout(key, data)
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
  const workouts = state.workoutReducer;

  return workouts;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addWorkout,
      addInitialWorkout,
      addBlankWorkout
    },
    dispatch
  );

export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(WorkoutList))
