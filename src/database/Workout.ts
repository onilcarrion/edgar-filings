// // In src/database/Workout.js
// const DB = require("./db.json");
// const { saveToDatabase } = require("./utils");

// const getAllWorkouts = (filterParams) => {
//     try {
//       let workouts = DB.workouts;
//       if (filterParams.mode) {
//         return DB.workouts.filter((workout) =>
//           workout.mode.toLowerCase().includes(filterParams.mode)
//         );
//       }
//       // Other if-statements will go here for different parameters
//       return workouts;
//     } catch (error) {
//       throw { status: 500, message: error };
//     }
//   };

// const getOneWorkout = (workoutId) => {
//   try {
//     const workout = DB.workouts.find((workout) => workout.id === workoutId);
//     if (!workout) {
//       throw {
//         status: 400,
//         message: `Can't find workout with the id '${workoutId}'`,
//       };
//     }
//     return workout;
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

// const createNewWorkout = (newWorkout) => {
//   try {
//     const isAlreadyAdded =
//       DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
//     if (isAlreadyAdded) {
//       throw {
//         status: 400,
//         message: `Workout with the name '${newWorkout.name}' already exists`,
//       };
//     }
//     DB.workouts.push(newWorkout);
//     saveToDatabase(DB);
//     return newWorkout;
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

// const updateOneWorkout = (workoutId, changes) => {
//   try {
//     const isAlreadyAdded =
//       DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
//     if (isAlreadyAdded) {
//       throw {
//         status: 400,
//         message: `Workout with the name '${changes.name}' already exists`,
//       };
//     }
//     const indexForUpdate = DB.workouts.findIndex(
//       (workout) => workout.id === workoutId
//     );
//     if (indexForUpdate === -1) {
//       throw {
//         status: 400,
//         message: `Can't find workout with the id '${workoutId}'`,
//       };
//     }
//     const updatedWorkout = {
//       ...DB.workouts[indexForUpdate],
//       ...changes,
//       updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
//     };
//     DB.workouts[indexForUpdate] = updatedWorkout;
//     saveToDatabase(DB);
//     return updatedWorkout;
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

// const deleteOneWorkout = (workoutId) => {
//   try {
//     const indexForDeletion = DB.workouts.findIndex(
//       (workout) => workout.id === workoutId
//     );
//     if (indexForDeletion === -1) {
//       throw {
//         status: 400,
//         message: `Can't find workout with the id '${workoutId}'`,
//       };
//     }
//     DB.workouts.splice(indexForDeletion, 1);
//     saveToDatabase(DB);
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

// /**
//  * @openapi
//  * components:
//  *   schemas:
//  *     Workout:
//  *       type: object
//  *       properties:
//  *         id: 
//  *           type: string
//  *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
//  *         name: 
//  *           type: string
//  *           example: Tommy V  
//  *         mode:
//  *           type: string
//  *           example: For Time
//  *         equipment:
//  *           type: array
//  *           items:
//  *             type: string
//  *           example: ["barbell", "rope"]
//  *         exercises:
//  *           type: array
//  *           items:
//  *             type: string
//  *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
//  *         createdAt:
//  *           type: string
//  *           example: 4/20/2022, 2:21:56 PM
//  *         updatedAt: 
//  *           type: string
//  *           example: 4/20/2022, 2:21:56 PM
//  *         trainerTips:
//  *           type: array
//  *           items:
//  *             type: string
//  *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
//  */

// module.exports = {
//   getAllWorkouts,
//   createNewWorkout,
//   getOneWorkout,
//   updateOneWorkout,
//   deleteOneWorkout,
// };


class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

import { saveToDatabase } from "./utils";
import DB from "./db.json"; // Assuming db.json exports DB as default

interface Workout {
  id: string;
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  createdAt: string;
  updatedAt: string;
  trainerTips: string[];
}

const getAllWorkouts = (filterParams: { mode?: string }): Workout[] => {
  try {
    let workouts: Workout[] = DB.workouts;
    if (filterParams.mode) {
      return DB.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode!)
      );
    }
    // Other if-statements will go here for different parameters
    return workouts;
  } catch (error) {
    throw new CustomError(error instanceof Error ? error.message : String(error), 500);
  }
};

const getOneWorkout = (workoutId: string): Workout => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw new CustomError(`Can't find workout with the id '${workoutId}'`, 400);
    }
    return workout;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new CustomError(error instanceof Error ? error.message : String(error), 500);
    }
  }
};

const createNewWorkout = (newWorkout: Workout): Workout => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
      throw new CustomError(`Workout with the name '${newWorkout.name}' already exists`, 400);
    }
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new CustomError(error instanceof Error ? error.message : String(error), 500);
    }
  }
};

const updateOneWorkout = (workoutId: string, changes: Partial<Workout>): Workout => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw new CustomError(`Workout with the name '${changes.name}' already exists`, 400);
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw new CustomError(`Can't find workout with the id '${workoutId}'`, 400);
    }
    const updatedWorkout: Workout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new CustomError(error instanceof Error ? error.message : String(error), 500);
    }
  }
};

const deleteOneWorkout = (workoutId: string): void => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw new CustomError(`Can't find workout with the id '${workoutId}'`, 400);
    }
    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new CustomError(error instanceof Error ? error.message : String(error), 500);
    }
  }
};

export {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};

