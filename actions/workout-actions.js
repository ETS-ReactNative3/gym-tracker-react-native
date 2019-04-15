export const addInitialWorkout = (initialWorkout) => (
  {
    type: 'ADD_INITIAL_WORKOUT',
    payload: initialWorkout,
  }
) 

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

  export const deleteExerciseFromWorkout = (exercisesToRemove) => (
    {
      type: 'DELETE_EXERCISE_FROM_WORKOUT',
      payload: exercisesToRemove,
    }
  ) 

  export const addBlankWorkout = (userId) => (
    {
      type: 'ADD_BLANK_WORKOUT',
      payload: userId,
    }
  ) 