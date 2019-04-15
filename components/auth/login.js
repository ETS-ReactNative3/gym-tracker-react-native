import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBlankWorkout } from "../../actions/workout-actions";

import BackgroundImage from "../../images/login.jpg";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.signIn = this.signIn.bind(this);
    this.userRegistered = this.userRegistered.bind(this);
  }

  

  signIn() {
    if (this.state.email && this.state.password) {
      // Check mongo for match

      const body = {
        password: this.state.password
      };

      const stringBody = JSON.stringify(body);

      fetch(
        `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/user/login/${
          this.state.email
        }`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: stringBody
        }
      )
        .then(res => {
          const resBody = JSON.parse(res._bodyText);

          if (resBody.authenticated === true) {
            this.props.addBlankWorkout(resBody.userId);

            AsyncStorage.setItem("gym-tracker-userId", resBody.userId)
              .then(() => {
                this.userRegistered();
              })
              .catch(err => console.log("error: ", err));
          } else {
            alert("Incorrect email or password");
          }
        })
        .catch(err => console.log("Error", err));
    } else {
      alert("Please enter and email and password");
    }
  }

 
  userRegistered(id) {
    this.props.navigation.navigate("Home", {});
  }

  render() {
    return (
      <ImageBackground style={styles.image} source={BackgroundImage}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.h1}>Please Login: </Text>
            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Email"
              onChangeText={e => this.setState({ email: e.toLowerCase() })}
              value={this.state.email}
            />
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Password"
              onChangeText={e => this.setState({ password: e })}
              value={this.state.password}
              secureTextEntry={true}
            />
            <Button style={styles.button} mode="contained" onPress={() => this.signIn()}>
              Login
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                this.props.navigation.navigate("Register", {
                 
                  userRegistered: id => this.userRegistered(id)
                });
              }}
            >
              Register
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addBlankWorkout
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  image: {
    flex: 1,
    height: "100%",
    width: "auto",
    opacity: 0.7
  },
  h1: {
    color: "#8249E5",
    fontSize: 32
  },
  inputContainer: {
    width: "75%",
    height: "auto",
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 15,
    padding: 20
  },
  button: {
    marginTop: 10,
    opacity: 1
  }
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(LoginScreen)
);
