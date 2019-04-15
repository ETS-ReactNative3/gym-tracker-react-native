import React from 'react';
import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createStackNavigator} from 'react-navigation';

import Auth from '../auth/index'
import Register from '../auth/register'
import Home from '../home'
import ExercisePage from '../exercises/exercise';
import ExerciseList from '../exercise-list/exercise-list'
import WorkoutList from '../exercise-list/workoutList';
import AddExerciseList from '../exercise-list/add-exercise-list'

export const Route = createStackNavigator(
    {   
        Auth: { screen: Auth },
        Register: { screen: Register},
        Home: { screen: Home },
        Exercises: { screen: ExercisePage },
        CreateList: { screen: WorkoutList },
        ExerciseList: { screen: ExerciseList },
        AddExerciseList: {screen: AddExerciseList }
    },
    {
        initialRouteName: 'Home'
    }

);

const AppContainer = createAppContainer(Route);

export default AppContainer;