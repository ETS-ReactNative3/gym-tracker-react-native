import { combineReducers } from 'redux'

const INITIAL_STATE =
  [
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
    { id: 11, name: "Benchpress" },
    { id: 12, name: "Benchpress" },
    { id: 13, name: "Benchpress" },
    { id: 14, name: "Benchpress" }
  ]


const exerciseReducer = (state = INITIAL_STATE, action) => {
  console.log("reducer add_exercise ABOUT TO BE called", state, action)
  switch (action.type) {
    case 'ADD_EXERCISE':
      console.log("reducer add_exercise called")
      return [...INITIAL_STATE, action.payload]
    default:
      return state
  }
};

const exApp = combineReducers({
  exercises: exerciseReducer,
});

export default exApp