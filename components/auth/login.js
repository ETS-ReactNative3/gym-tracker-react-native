import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { withNavigation } from 'react-navigation';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    if (this.state.email && this.state.password) {
      console.log(
        "User clicked sign in",
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
        <View>
          <Text>Please Login: </Text>
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
          <Button mode="contained" onPress={() => this.signIn()}>
            Login
          </Button>
        </View>
          <Text onPress={() => {
              this.props.navigation.navigate("Register", {
                // pass props here
              })
          }}>Register</Text>
        <View />
      </View>
    );
  }
}

export default withNavigation(LoginScreen);