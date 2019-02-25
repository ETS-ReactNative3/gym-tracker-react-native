import React from 'react';
import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../home'
import ExercisePage from '../exercises/exercise';
import ExerciseList from '../exercise-list/exercise-list'
import CreateExerciseList from '../exercise-list/createListPage';
import AddExerciseList from '../exercise-list/add-exercise-list'

// export const Tabs = createMaterialTopTabNavigator(
//     {
//         Home: Home
//     },
//     {
//         initialRouteName: 'Home'
//     }
// )

// export const Route = createStackNavigator(
//     {
//         Home: Home,
//         Exercises: ExercisePage,
//         CreateList: CreateExerciseList,
//         ExerciseList: ExerciseList
//     },
//     {
//         initialRouteName: 'Home'
//     }
// )

export const Route = createStackNavigator(
    {
        Home: { screen: Home },
        Exercises: { screen: ExercisePage },
        CreateList: { screen: CreateExerciseList },
        ExerciseList: { screen: ExerciseList },
        AddExerciseList: {screen: AddExerciseList }
    },
    {
        initialRouteName: 'Home'
    }

);

// export const Route = createStackNavigator(
//     {
//         Home: Home,
//         Exercises: ExercisePage,
//         CreateList: CreateExerciseList,
//         ExerciseList: ExerciseList
//     },
//     {
//         initialRouteName: 'Home'
//     }
// )

const AppContainer = createAppContainer(Route);

export default AppContainer;