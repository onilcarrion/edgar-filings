
//added for support
import { Response } from 'express';

interface ErrorResponse {
    status?: number;
    message: string;
}

export const handleErrorResponse = (res: Response, error: ErrorResponse | any): void => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';

    res.status(status).json({
        status: "FAILED",
        data: {
            error: message
        }
    });
};
