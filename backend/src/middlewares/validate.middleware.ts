import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate<T>(
    schema: ZodSchema<T>,
    source: 'body' | 'query' | 'params' = 'body'
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[source];

        const dadosValidados = schema.parse(data);

        if (source === 'body') {
            res.locals.body = dadosValidados;
        }

        if (source === 'query') {
            res.locals.query = dadosValidados;
        }

        if (source === 'params') {
            res.locals.params = dadosValidados;
        }

        next();
    };
}