// // In src/services/workoutService.js
// const { v4: uuid } = require("uuid");
// const Workout = require("../database/Workout");

// const getAllWorkouts = (filterParams) => {
//     try {
//       // *** ADD ***
//       const allWorkouts = Workout.getAllWorkouts(filterParams);
//       return allWorkouts;
//     } catch (error) {
//       throw error;
//     }
//   };

// const getOneWorkout = (workoutId) => {
//   try {
//     const workout = Workout.getOneWorkout(workoutId);
//     return workout;
//   } catch (error) {
//     throw error;
//   }
// };

// const createNewWorkout = (newWorkout) => {
//   const workoutToInsert = {
//     ...newWorkout,
//     id: uuid(),
//     createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
//     updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
//   };
//   try {
//     const createdWorkout = Workout.createNewWorkout(workoutToInsert);
//     return createdWorkout;
//   } catch (error) {
//     throw error;
//   }
// };

// const updateOneWorkout = (workoutId, changes) => {
//   try {
//     const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
//     return updatedWorkout;
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteOneWorkout = (workoutId) => {
//   try {
//     Workout.deleteOneWorkout(workoutId);
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   getAllWorkouts,
//   getOneWorkout,
//   createNewWorkout,
//   updateOneWorkout,
//   deleteOneWorkout,
// };


import { v4 as uuid } from 'uuid';
import * as Workout from '../database/Workout'; // Adjust the import path as needed

interface FilterParams {
  mode?: string;
  // Define other possible filter parameters here
}

interface NewWorkout {
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  trainerTips: string[];
}

const getAllWorkouts = (filterParams: FilterParams): any[] => {
  try {
    const allWorkouts = Workout.getAllWorkouts(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId: string): any => {
  try {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (newWorkout: NewWorkout): any => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  };
  try {
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId: string, changes: Partial<NewWorkout>): any => {
  try {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkout = (workoutId: string): void => {
  try {
    Workout.deleteOneWorkout(workoutId);
  } catch (error) {
    throw error;
  }
};

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};