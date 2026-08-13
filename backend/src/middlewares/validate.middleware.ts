import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(
    schema: ZodSchema,
    source: 'body' | 'query' | 'params' = 'body'
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[source];

        const dadosValidados = schema.parse(data);

        res.locals.dadosValidados = dadosValidados;

        next();
    };
}