


const INITIAL_STATE = {
    workouts:

        [
            {
                "id": 0,
                "name": "Leg Day",
                "exercises": [
                    "Benchpress",
                    "Squat",
                    "Lateral extensions",
                    "Bicep curls",
                    "Tricep extensions",
                    "Shrugs"
                ]
            },
            {
                "id": 1,
                "name": "Arm Day",
                "exercises": [
                    "Jumping Jacks",
                    "Hack squats",
                    "Tricep curls",
                    "Flying"
                ]
            },
            {
                "id": 2,
                "name": "Bum Day",
                "exercises": [
                    "Jumping Jacks",
                    "Hack squats",
                    "Tricep curls",
                    "Flying"
                ]
            }
        ]
}

export const workoutReducer = (state = INITIAL_STATE, action) => {
   
const perState = state

    switch (action.type) {
        case 'ADD_WORKOUT':
            return { workouts: [...state.workouts, action.payload] }
        case 'ADD_EXERCISE_TO_WORKOUT':
            const { workoutId, exercises } = action.payload
            const newState = state.workouts.filter((workout) => {
                
                return workout.id == workoutId
            })            
            const ex = exercises.map(i => i.name)
            newState[0].exercises = [...newState[0].exercises, ...ex]
            const finalState = state.workouts.filter((workout) => {
                return workout.id !== workoutId
            })
            finalState.push(newState[0]) 
            return {workouts: finalState}
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