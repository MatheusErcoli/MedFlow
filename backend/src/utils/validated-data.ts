import { Response } from 'express';

export function getValidatedBody<T>(res: Response): T {
    return res.locals.body as T;
}

export function getValidatedQuery<T>(res: Response): T {
    return res.locals.query as T;
}

export function getValidatedParams<T>(res: Response): T {
    return res.locals.params as T;
}