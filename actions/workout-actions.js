export const addWorkout = (newWorkout) => (
    {
      type: 'ADD_WORKOUT',
      payload: newWorkout,
    }
  ) 

export const addExerciseToWorkout = (newExercises) => (
    {
      type: 'ADD_EXERCISE_TO_WORKOUT',
      payload: newExercises,
    }
  ) 
  