export {};

declare global {
    namespace Express {
        interface Locals {
            params: {
                id: number
            }
        }
    }
}
