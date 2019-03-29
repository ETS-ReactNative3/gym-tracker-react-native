
const INITIAL_STATE = {
  exercises: [

    { id: 1, name: "Benchpress" },
    { id: 2, name: "Lateral extensions" },
    { id: 3, name: "Bicep curls" },
    { id: 4, name: "Tricep extensions" },
    { id: 5, name: "Shrugs" },
    { id: 6, name: "Active Sitting " },
    { id: 7, name: "ChairChest" },
    { id: 8, name: "FlyChest" },
    { id: 9, name: "PressCrunchesDecline" },
    { id: 10, name: "Chest" },

  ]
}

export const exerciseReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'ADD_EXERCISE':
      
      return {exercises: [...state.exercises, ...action.payload]}
    // //  ! UNTESTED !
    // case 'DELETE_EXERCICSE':
    //   const deletedItem = action.payload
    //   const newState = state.filter((item) => item != deletedItem)
    //   return [state, newState]
    // case 'EDIT_EXERCISE':
    //   const updatedItem = action.payload
    //   const newState = state.filter((item) => item != updatedItem)
    //   newState.push(updatedItem)
    //     return [...state, newState]
    default:
      return state
  }
}

export default exerciseReducer