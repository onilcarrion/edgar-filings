// // In src/controllers/workoutController.js
// const workoutService = require("../services/workoutService");

// const getAllWorkouts = (req, res) => {
//     // *** ADD ***
//     const { mode } = req.query;
//     try {
//       // *** ADD ***
//       const allWorkouts = workoutService.getAllWorkouts({ mode });
//       res.send({ status: "OK", data: allWorkouts });
//     } catch (error) {
//       res
//         .status(error?.status || 500)
//         .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
//   };

// const getOneWorkout = (req, res) => {
//   const {
//     params: { workoutId },
//   } = req;
//   if (!workoutId) {
//     res
//       .status(400)
//       .send({
//         status: "FAILED",
//         data: { error: "Parameter ':workoutId' can not be empty" },
//       });
//   }
//   try {
//     const workout = workoutService.getOneWorkout(workoutId);
//     res.send({ status: "OK", data: workout });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// const createNewWorkout = (req, res) => {
//   const { body } = req;
//   if (
//     !body.name ||
//     !body.mode ||
//     !body.equipment ||
//     !body.exercises ||
//     !body.trainerTips
//   ) {
//     res
//       .status(400)
//       .send({
//         status: "FAILED",
//         data: {
//           error:
//             "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
//         },
//       });
//     return;
//   }
//   const newWorkout = {
//     name: body.name,
//     mode: body.mode,
//     equipment: body.equipment,
//     exercises: body.exercises,
//     trainerTips: body.trainerTips,
//   };
//   try {
//     const createdWorkout = workoutService.createNewWorkout(newWorkout);
//     res.status(201).send({ status: "OK", data: createdWorkout });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// const updateOneWorkout = (req, res) => {
//   const {
//     body,
//     params: { workoutId },
//   } = req;
//   if (!workoutId) {
//     res
//       .status(400)
//       .send({
//         status: "FAILED",
//         data: { error: "Parameter ':workoutId' can not be empty" },
//       });
//   }
//   try {
//     const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
//     res.send({ status: "OK", data: updatedWorkout });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// const deleteOneWorkout = (req, res) => {
//   const {
//     params: { workoutId },
//   } = req;
//   if (!workoutId) {
//     res
//       .status(400)
//       .send({
//         status: "FAILED",
//         data: { error: "Parameter ':workoutId' can not be empty" },
//       });
//   }
//   try {
//     workoutService.deleteOneWorkout(workoutId);
//     res.status(204).send({ status: "OK" });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };
// //added my own implementation
// const getRecordsForWorkout = (req, res) => {
//     const { workoutId } = req.params;
//     if (!workoutId) {
//         res.status(400).send({
//             status: "FAILED",
//             data: { error: "Parameter ':workoutId' can not be empty" },
//         });
//         return;
//     }
//     try {
//         const records = workoutService.getRecordsForWorkout(workoutId);
//         res.send({ status: "OK", data: records });
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "FAILED", data: { error: error?.message || error } });
//     }
// };

// module.exports = {
//   getAllWorkouts,
//   getOneWorkout,
//   createNewWorkout,
//   updateOneWorkout,
//   deleteOneWorkout,
//   getRecordsForWorkout,
// };


import { Request, Response } from 'express';
import { handleErrorResponse } from '/Users/onilcarrion/edgar-filings/src/database/errorHandling'; // Adjust path as necessary
const workoutService: any = require('../services/workoutService'); // Used type assertion

interface ErrorResponse {
    status?: number;
    message: string;
}

const getAllWorkouts = (req: Request, res: Response): void => {
    const { mode } = req.query;
    try {
        const allWorkouts = workoutService.getAllWorkouts({ mode: mode as string });
        res.send({ status: "OK", data: allWorkouts });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getOneWorkout = (req: Request, res: Response): void => {
    const { workoutId } = req.params;
    if (!workoutId) {
        handleErrorResponse(res, { status: 400, message: "Parameter ':workoutId' can not be empty" });
        return;
    }
    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.send({ status: "OK", data: workout });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const createNewWorkout = (req: Request, res: Response): void => {
    const { body } = req;
    if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
        handleErrorResponse(res, {
            status: 400,
            message: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        });
        return;
    }
    const newWorkout = {
        id: body.id, //added
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
        createdAt: body.createdAt, //added
        updatedAt: body.updatedAt //added
    };
    try {
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const updateOneWorkout = (req: Request, res: Response): void => {
    const { body, params: { workoutId } } = req;
    if (!workoutId) {
        handleErrorResponse(res, { status: 400, message: "Parameter ':workoutId' can not be empty" });
        return;
    }
    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
        res.send({ status: "OK", data: updatedWorkout });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const deleteOneWorkout = (req: Request, res: Response): void => {
    const { workoutId } = req.params;
    if (!workoutId) {
        handleErrorResponse(res, { status: 400, message: "Parameter ':workoutId' can not be empty" });
        return;
    }
    try {
        workoutService.deleteOneWorkout(workoutId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const getRecordsForWorkout = (req: Request, res: Response): void => {
    const { workoutId } = req.params;
    if (!workoutId) {
        handleErrorResponse(res, { status: 400, message: "Parameter ':workoutId' can not be empty" });
        return;
    }
    try {
        const records = workoutService.getRecordsForWorkout(workoutId);
        res.send({ status: "OK", data: records });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
    getRecordsForWorkout,
};



//TYPESCRIPT
// import { Request, Response } from 'express';
// //import * as workoutService from '../services/workoutService'; // Assuming workoutService exports all functions needed
// const workoutService: any = require('../services/workoutService'); // Used type assertion

// // Retrieves all workouts, optionally filtered by a query parameter mode.
// const getAllWorkouts = (req: Request, res: Response): void => {
//   const { mode } = req.query;
//   try {
//     const allWorkouts = workoutService.getAllWorkouts({ mode: mode as string });
//     res.send({ status: "OK", data: allWorkouts });
//   } catch (error) {
//     res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// // Retrieves a single workout by its workoutId parameter.
// const getOneWorkout = (req: Request, res: Response): void => {
//   const { workoutId } = req.params;
//   if (!workoutId) {
//     res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter ':workoutId' can not be empty" },
//     });
//     return;
//   }
//   try {
//     const workout = workoutService.getOneWorkout(workoutId);
//     res.send({ status: "OK", data: workout });
//   } catch (error) {
//     res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// // Creates a new workout with the details provided in the request body.
// const createNewWorkout = (req: Request, res: Response): void => {
//   const { body } = req;
//   if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
//     res.status(400).send({
//       status: "FAILED",
//       data: {
//         error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
//       },
//     });
//     return;
//   }
//   const newWorkout = {
//     id: body.id, //added
//     name: body.name,
//     mode: body.mode,
//     equipment: body.equipment,
//     exercises: body.exercises,
//     trainerTips: body.trainerTips,
//     createdAt: body.createdAt, //added
//     updatedAt: body.updatedAt //added
//   };
//   try {
//     const createdWorkout = workoutService.createNewWorkout(newWorkout);
//     res.status(201).send({ status: "OK", data: createdWorkout });
//   } catch (error) {
//     res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// // Updates an existing workout identified by its workoutId with the details provided in the request body.
// const updateOneWorkout = (req: Request, res: Response): void => {
//   const { body, params: { workoutId } } = req;
//   if (!workoutId) {
//     res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter ':workoutId' can not be empty" },
//     });
//     return;
//   }
//   try {
//     const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
//     res.send({ status: "OK", data: updatedWorkout });
//   } catch (error) {
//     res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// // Deletes an existing workout identified by its workoutId.
// const deleteOneWorkout = (req: Request, res: Response): void => {
//   const { workoutId } = req.params;
//   if (!workoutId) {
//     res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter ':workoutId' can not be empty" },
//     });
//     return;
//   }
//   try {
//     workoutService.deleteOneWorkout(workoutId);
//     res.status(204).send({ status: "OK" });
//   } catch (error) {
//     res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// // Retrieves records for a specific workout identified by its workoutId.
// const getRecordsForWorkout = (req: Request, res: Response): void => {
//   const { workoutId } = req.params;
//   if (!workoutId) {
//     res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter ':workoutId' can not be empty" },
//     });
//     return;
//   }
//   try {
//     const records = workoutService.getRecordsForWorkout(workoutId);
//     res.send({ status: "OK", data: records });
//   } catch (error) {
//     res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

// // Exports all the defined controller functions so they can be used in the API route definitions.
// export {
//   getAllWorkouts,
//   getOneWorkout,
//   createNewWorkout,
//   updateOneWorkout,
//   deleteOneWorkout,
//   getRecordsForWorkout,
// };
