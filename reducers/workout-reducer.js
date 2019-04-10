


// const INITIAL_STATE = {
//     userid: 0,
//     workouts:

//         [
//             {
//                 "id": 0,
//                 "name": "Leg Day",
//                 "exercises": [
//                     "Benchpress",
//                     "Squat",
//                     "Lateral extensions",
//                     "Bicep curls",
//                     "Tricep extensions",
//                     "Shrugs"
//                 ]
//             },
//             {
//                 "id": 1,
//                 "name": "Arm Day",
//                 "exercises": [
//                     "Jumping Jacks",
//                     "Hack squats",
//                     "Tricep curls",
//                     "Flying"
//                 ]
//             },
//             {
//                 "id": 2,
//                 "name": "Bum Day",
//                 "exercises": [
//                     "Jumping Jacks",
//                     "Hack squats",
//                     "Tricep curls",
//                     "Flying"
//                 ]
//             }
//         ]
// }
const INITIAL_STATE = {
    workouts: []
}

export const workoutReducer = (state = INITIAL_STATE, action) => {
   

    switch (action.type) {
        case 'ADD_INITIAL_WORKOUT':
            return action.payload
        case 'ADD_WORKOUT':
        // add userid to obj
            return { workouts: [...state.workouts, action.payload] }
        case 'ADD_EXERCISE_TO_WORKOUT':
        // There is no check for repeat exercises as some people may want to perform the same exercise more than once/ as a superset.
            const { workoutId, exercises } = action.payload
            // Extracts the workout object - to update the exercises inside it.
            const newState = state.workouts.filter((workout) => {
                return workout.id === workoutId
            })   
            newState[0].exercises = [...newState[0].exercises, ...exercises]
            
            // create a new array of workouts without the current workout object
            const workouts = state.workouts.filter(workout => {
                return workout.id !== workoutId
            })
            console.log("Returned from add-ex-to-wo reducer: ", {userid: state.userId, workouts: [...workouts, ...newState]})
            // create new state from old workouts appending the new workout object which has been updated with a new exercise.
            return {userid: state.userId, workouts: [...workouts, ...newState]}
        // //  ! UNTESTED !
        // case 'DELETE_WORKOUT':
        //     const deletedItem = action.payload
        //     const newState = state.filter((item) => item != deletedItem)
        //     return [state, newState]
        // case 'EDIT_WORKOUT':
        //     const updatedItem = action.payload
        //     const newState = state.filter((item) => item != updatedItem)
        //     newState.push(updatedItem)
        //     return [...state, newState]
        default:
            return state
    }
}

export default workoutReducer