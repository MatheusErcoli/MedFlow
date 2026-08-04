import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';


export function errorMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: err.issues,
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    console.error(err);

    return res.status(500).json({
        message: 'Erro interno do servidor',
    });
}