
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

// exercises: [

//   { id: 1, name: "Benchpress", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/benchpress.jpg" },
//   { id: 2, name: "Lateral extensions", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/lateralextensions.jpg" },
//   { id: 3, name: "Bicep curls", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/dumbellcurls.jpg" },
//   { id: 4, name: "Tricep extensions", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/tricepextensions.jpg" },
//   { id: 5, name: "Shrugs", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/shrugs.jpg" },
//   { id: 6, name: "Leg Extensions", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/legextension.jpg" },
//   { id: 7, name: "Dips", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/dips.jpg" },
//   { id: 8, name: "Cable Flyes", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/cableflyes.jpg" },
//   { id: 9, name: "Decline Crunch", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/declinecrunch.png" },
//   { id: 10, name: "Squat", imageUrl: "https://s3.eu-central-1.amazonaws.com/gym-tracker-node/squat.jpg" },

// ]
// }

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