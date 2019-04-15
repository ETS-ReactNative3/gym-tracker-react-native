import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addBlankWorkout } from "../../actions/workout-actions";

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
  

  static navigationOptions = {
    title: "Sign In"
  };

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
            this.props.addBlankWorkout(resBody.userId)
          
            AsyncStorage.setItem("gym-tracker-userId", resBody.userId)
              .then(() => {
                
                this.userRegistered()

              })
              .catch(err => console.log("error: ", err));
          } else {
            
            alert("Incorrect email or password")
          }
        })
        .catch(err => console.log("Error", err));
    } else {
      alert("Please enter and email and password");
    }
  }

  // userRegistered = (id) => {
  userRegistered(id) {
   
    this.props.navigation.navigate("Home", {});
  }

  render() {
    return (
      <View>
        <View>
          <Text>Please Login: </Text>
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
          <Button mode="contained" onPress={() => this.signIn()}>
            Login
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              this.props.navigation.navigate("Register", {
                // pass props here
                userRegistered: id => this.userRegistered(id)
              });
            }}
          >
            Register
          </Button>
        </View>
      </View>
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

export default withNavigation(connect(null,mapDispatchToProps)(LoginScreen))
