import { combineReducers } from 'redux'
import exerciseReducer from './exercise-reducer'
import workoutReducer from './workout-reducer'

export default combineReducers({
    exerciseReducer,
    workoutReducer
})