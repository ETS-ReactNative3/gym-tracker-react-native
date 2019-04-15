import React, { Component } from "react";
import { View, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { Button, Title, IconButton } from "react-native-paper";
import ExerciseListItem from "./exerciseListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addExercise } from "../../actions/exercise-actions";
import { deleteExerciseFromWorkout } from "../../actions/workout-actions"


class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      itemIdList: [],
      title: "Temp title",
      exercisesToRemove: []
    };

    this.toggleHighlightItem = this.toggleHighlightItem.bind(this);
    this.saveToMongo = this.saveToMongo.bind(this);
   
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: navigation.getParam("title", "Workout"),
      headerRight: (<IconButton icon="delete" onPress={() => params.exercisesToRemove()} />)
    };
  };

  exercisesToRemove(){
    const payload = {
        exercisesToRemove: this.state.exercisesToRemove, 
        newWorkoutId: this.state.workoutId
    }
    this.props.deleteExerciseFromWorkout(payload)
    this.setState({
        exercisesToRemove: []
    })
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ exercisesToRemove: this.exercisesToRemove.bind(this) });
    const { navigation } = this.props;
    const title = navigation.getParam("title", "no title available");
    const exercises = navigation.getParam("exercises", "no exercises found");
    const workoutId = navigation.getParam("id", "no workout ID found");
    const userId = navigation.getParam("userId", "no user ID found");
    
    this.setState({
      title: title,
      exercises: exercises,
      modalVisible: false,
      workoutId: workoutId,
      userID: userId
    });
  }

//   Every time state is updated, updateworkout in parent workoutlist is called - which will save the new workouts object to local storage and update Mongo
  componentDidUpdate() {
    const { navigation } = this.props;
    const updateWorkout = navigation.getParam("updateWorkout");
    
    console.log("Ex List - comp did update = updateWorkout passed => ", this.props.workouts)
    updateWorkout(null, this.props.workouts);
    
    
  }

  toggleHighlightItem(name) {
    if (!this.state.itemIdList.includes(name)) {
      this.setState({
        itemIdList: [...this.state.itemIdList, name]
      });
      // show delete button in navbar
    } else {
      // if itemIdList is empty - remove navbar button

      let removedElementArr = this.state.itemIdList.filter(el => {
        return el !== name;
      });

      this.setState({
        itemIdList: removedElementArr
      });
    }
  }

  // Takes the record of workouts held in local storage and sends them to MongoDB.
  saveToMongo(workoutId) {
    console.log("exercise-list => Save to mongo fired", "workoutid: ", workoutId)
    let finalVal;
    // Get all values for keys in local storage in the current exercise list.


const exNames = this.state.exercises.map(exObj => {
  return exObj.exerciseName
})
console.log("EX LIST 97 - exNames => ", exNames)

    AsyncStorage.multiGet(exNames, (err, store) => {
      //    Map over the return values array and return just the values.
      console.log("EX LIST - 101 -Error in get store", err)
      console.log("exercise-list => Save to mongo fired", "store: ", store)

      const workoutex = store.map(exercise => {
        if (exercise[1]) {
          return JSON.parse(exercise[1]);
        } else return;
      });
      // put the exercise logs array in an object with a date key
      finalVal = {
        userID: this.state.userID,
        [Date.now()]: workoutex
      };
    })
      .catch(error => console.log("Error:", error))

      // Make a POST request to MONGO with the workout log
      .then(() => {
        // FETCH POST -->
        const postBody = JSON.stringify({
          workout: finalVal
        });
        
        console.log("Exercise list => line 118 - POST object - ", JSON.parse(postBody))
        
        fetch(
          "http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/workout/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: postBody
          }
        )
        .then(res => console.log("EXLIST 142 - res; ", JSON.parse(res._bodyInit)))
          .catch(error => console.log("Error in fetch:", error));
      })
      // Remove all the exercise logs in this workout from local storage.
      .then(() => {
        AsyncStorage.multiRemove(exNames, error =>
          console.log("error: ", error)
        ).catch(err => console.log("error: ", err));
      });
  }

  render() {
    const { navigation } = this.props;
    const workoutId = navigation.getParam("id", "no id found");

    const style = {
      highlighted: {
        backgroundColor: "red"
      },
      unHighlighted: {
        backgroundColor: "white"
      }
    };

    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <Title style={styles.header}>{this.state.title}</Title>
        </View>
        <Button
          icon="add"
          mode="contained"
          onPress={() =>
            this.props.navigation.navigate("AddExerciseList", {
              id: workoutId
            })
          }
        >
          Add exercise
        </Button>
        <Button mode="contained" onPress={() => this.saveToMongo(workoutId)}>
          Finish and save workout
        </Button>

        {this.props.workouts.map(workoutObject => {
          if (workoutObject.id === workoutId) {
            return workoutObject.exercises.map(ex => {
              return (
                <ExerciseListItem
                buttonSelected={
                    this.state.exercisesToRemove.includes(ex._id)
                        ? style.highlighted
                        : style.unHighlighted
                }
                  style={styles.listItem}
                  icon={this.state.exercisesToRemove.includes(ex._id) ? 'delete' : 'fitness-center'}
                  size={40}
                  exerciseName={ex.exerciseName}
                  key={Math.random()}
                  onPress={() =>
                    this.props.navigation.navigate("Exercises", {
                      exerciseName: ex.exerciseName,
                      exerciseImage: ex.imageUrl
                    })
                  }
                  onLongPress={() => {
                    if(!this.state.exercisesToRemove.includes(ex._id)){
                        this.setState({
                            exercisesToRemove: [...this.state.exercisesToRemove, ex._id]
                        }, () => console.log("Ex to delete: ", ex.exerciseName, ex._id, this.state.exercisesToRemove))
                    } else {
                        const removeExFromArr = this.state.exercisesToRemove.filter(exerciseId => {
                        
                            return ex._id !== exerciseId 
                        })
                       
                        this.setState({
                            exercisesToRemove: removeExFromArr
                        }, () => console.log("Ex to NO LONGER delete: ", ex.exerciseName, ex._id, this.state.exercisesToRemove))
                    }
                    
                  }}
                />
              );
            });
          }
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
    marginBottom: 20,
    marginTop: 20
  },
  scrollView: {
    flex: 1,
    width: "90%",
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  const { exercises } = state.exerciseReducer;
  const { workouts } = state.workoutReducer;

  return { exercises, workouts };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addExercise,
      deleteExerciseFromWorkout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseList);
