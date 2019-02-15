import React from 'react';
import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../home'
import ExercisePage from '../exercises/exercise';

// export const Tabs = createMaterialTopTabNavigator(
//     {
//         Home: Home
//     },
//     {
//         initialRouteName: 'Home'
//     }
// )

export const Route = createStackNavigator(
    {
        Home: Home,
        Exercises: ExercisePage
    },
    {
        initialRouteName: 'Home'
    }
)

const AppContainer = createAppContainer(Route);

export default AppContainer;