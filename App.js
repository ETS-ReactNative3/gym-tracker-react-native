import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppContainer, { Tabs } from './components/config/router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'

const store = createStore(rootReducer)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider >
    );
  }
}
