export {};

declare global {
    namespace Express {
        interface Locals {
            userId: number,
            params: {
                id: number
            }
        }
    }
}
