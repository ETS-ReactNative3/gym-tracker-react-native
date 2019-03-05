import React from 'react';
import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Auth from '../auth'
import Home from '../home'
import ExercisePage from '../exercises/exercise';
import ExerciseList from '../exercise-list/exercise-list'
import CreateExerciseList from '../exercise-list/createListPage';
import AddExerciseList from '../exercise-list/add-exercise-list'

export const Route = createStackNavigator(
    {   
        Auth: { screen: Auth },
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

const AppContainer = createAppContainer(Route);

export default AppContainer;