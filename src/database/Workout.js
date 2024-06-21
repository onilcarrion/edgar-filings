// In src/database/Workout.js
const DB = require("./db.json");
// *** ADD ***
const { saveToDatabase } = require("./utils");


const getAllWorkouts = () => {
  return DB.workouts;
};

// *** ADD ***
const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    return;
  }
  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};

module.exports = {
  getAllWorkouts,
  // *** ADD ***
  createNewWorkout,
};