declare global {
    namespace Express {
        interface Locals {
            body: unknown;
            query: unknown;
            params: unknown;
        }
    }
}

export {};