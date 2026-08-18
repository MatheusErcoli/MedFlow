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
        const errors: Record<string, string> = {};

        for (const issue of err.issues) {
            const field = issue.path.join('.');

            if (!errors[field]) {
                errors[field] = issue.message;
            }
        }

        return res.status(400).json({
            message: 'Erro de validação',
            errors,
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