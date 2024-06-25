// // In src/services/recordService.js
// const Record = require("../database/Record");

// const getRecordForWorkout = (workoutId) => {
//   try {
//     const record = Record.getRecordForWorkout(workoutId);
//     return record;
//   } catch (error) {
//     throw error;
//   }
// };
// module.exports = { getRecordForWorkout };


import * as Record from "../database/Record"; // Adjust the import path as needed

const getRecordForWorkout = (workoutId: string): any => {
  try {
    const record = Record.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

export { getRecordForWorkout };