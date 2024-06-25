// // In src/index.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
// // *** ADD ***
// const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use("/api/v1/workouts", v1WorkoutRouter);

// app.listen(PORT, () => {
//   console.log(`API is listening on port ${PORT}`);
//   /// *** ADD ***
//   V1SwaggerDocs(app, PORT);
// });


import express from "express";
import bodyParser from "body-parser";
import v1WorkoutRouter from "./v1/routes/workoutRoutes";
import { swaggerDocs as V1SwaggerDocs } from "./v1/swagger";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10); // Ensure PORT is a number

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT); // Now PORT is guaranteed to be a number
});