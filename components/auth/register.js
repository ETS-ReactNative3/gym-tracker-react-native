import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.signUp = this.signUp.bind(this)
  }

  signUp() {
    if (this.state.email && this.state.password) {
        console.log(
          "User clicked sign Up",
          this.state.email,
          this.state.password
        );
      } else {
        alert("Please enter and email and password");
      }
  }

  render() {
    return (
      <View>
        <Text> Register for Gym Tracker: </Text>
        <View>
          <TextInput
            mode="outlined"
            label="Email"
            placeholder="Email"
            onChangeText={e => this.setState({ email: e })}
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
          <Button mode="contained" onPress={() => this.signUp()}>
            Sign Up
          </Button>
        </View>
      </View>
    );
  }
}
