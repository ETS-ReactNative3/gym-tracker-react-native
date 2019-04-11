import React from "react";
import { Button, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import LoginScreen from './login/'
// import RegisterScreen from './register'

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      currentUserId: undefined,
      client: undefined
    };
  }

  //   Checking local storage if user id is stored
  componentDidMount() {
    AsyncStorage.getItem("gym-tracker-userId").then(user => {
      const retUser = JSON.parse(user);

      if (retUser.id) {
        this.setState({
          currentUserId: retUser.id,
          userSignedIn: true
        });
      } else {
        this.setState({
          currentUserId: undefined,
          userSignedIn: false
        });
      }
    });
  }

  render() {
    {
      if (this.state.userSignedIn) {
        return (
          <View>
            <Text>You're Signed In</Text>
          </View>
        );
      } else {
        return (
          <View>
            <LoginScreen />
          </View>
        );
      }
    }
  }
}
