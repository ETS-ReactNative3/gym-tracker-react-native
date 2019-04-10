import React, { Component } from "react";
import { View, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { Button, Title } from "react-native-paper";
import ExerciseListItem from "./exerciseListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addExercise } from "../../actions/exercise-actions";

class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      itemIdList: [],
      title: "Temp title"
    };

    this.toggleHighlightItem = this.toggleHighlightItem.bind(this);
    this.saveToMongo = this.saveToMongo.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Workout")
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "no title available");
    const exercises = navigation.getParam("exercises", "no exercises found");

    this.setState({
      title: title,
      exercises: exercises,
      modalVisible: false
    });
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
    let finalVal;
    // Get all values for keys in local storage in the current exercise list.
    console.log("this.props.workouts", this.props.workouts);
    // console.log("this.props.workouts[workoutId].exercises ==> ", this.props.workouts[workoutId])
    AsyncStorage.multiGet([], (err, store) => {
      //    Map over the return values array and return just the values.

      console.log("SAVETOMONGO get all keys returned ==> ", store);
      const workoutex = store.map(exercise => {
        if (exercise[1]) {
          return JSON.parse(exercise[1]);
        } else return;
      });
      // put the exercise logs array in an object with a date key
      finalVal = {
        userID: "01",
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
          .then(response => console.log("Success:", response))
          .catch(error => console.log("Error in fetch:", error));
      })
      // Remove all the exercise logs in this workout from local storage.
      .then(() => {
        AsyncStorage.multiRemove(this.state.exercises, error =>
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
                  style={styles.listItem}
                  exerciseName={ex.exerciseName}
                  key={Math.random()}
                  onPress={() =>
                    this.props.navigation.navigate("Exercises", {
                      exerciseName: ex.exerciseName,
                      exerciseImage: ex.imageUrl
                    })
                  }
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
      addExercise
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseList);
