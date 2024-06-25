// // In src/v1/swagger.js
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// // Basic Meta Informations about our API
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: { title: "Crossfit WOD API", version: "1.0.0" },
//   },
//   apis: ["./src/v1/routes/workoutRoutes.js", "./src/database/Workout.js"],
// };

// // Docs in JSON format
// const swaggerSpec = swaggerJSDoc(options);

// // Function to setup our docs
// const swaggerDocs = (app, port) => {
//   // Route-Handler to visit our docs
//   app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   // Make our docs in JSON format available
//   app.get("/api/v1/docs.json", (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });
//   console.log(
//     `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
//   );
// };

// module.exports = { swaggerDocs };


import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
//import { Workout } from "../src/database/Workout"; // Adjust the path as necessary

const options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Crossfit WOD API", version: "1.0.0" },
    components: {
      schemas: {
        Workout: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            mode: { type: "string" },
            // Add other properties as per your Workout interface
          },
        },
      },
    },
  },
  apis: ["./src/v1/routes/workoutRoutes.ts", "./src/database/Workout.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: express.Application, port: number): void => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`);
};

export { swaggerDocs };



// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import express from "express";
// //import { Workout } from "../types";

// // Basic Meta Informations about our API
// const options: swaggerJSDoc.OAS3Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: { title: "Crossfit WOD API", version: "1.0.0" },
//   },
//   apis: ["./src/v1/routes/workoutRoutes.ts", "./src/database/Workout.ts"],
// };

// // Docs in JSON format
// const swaggerSpec = swaggerJSDoc(options);

// // Function to setup our docs
// const swaggerDocs = (app: express.Application, port: number): void => {
//   // Route-Handler to visit our docs
//   app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   // Make our docs in JSON format available
//   app.get("/api/v1/docs.json", (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });
//   console.log(
//     `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
//   );
// };

// export { swaggerDocs };