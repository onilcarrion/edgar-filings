//implemneted myself
// In src/controllers/recordController.js
const workoutService = require("../services/workoutService");

const getRecordsForWorkout = (req, res) => {
  const { workoutId } = req.params;
  if (!workoutId) {
    res.status(400).send({ status: "FAILED", data: { error: "Parameter ':workoutId' can not be empty" } });
    return;
  }
  try {
    const records = workoutService.getRecordsForWorkout(workoutId);
    res.send({ status: "OK", data: records });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getRecordsForWorkout,
};