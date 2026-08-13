import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(
    schema: ZodSchema,
    source: 'body' | 'query' | 'params' = 'body'
) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const data = req[source];

        schema.parse(data);

        next();
    };
}