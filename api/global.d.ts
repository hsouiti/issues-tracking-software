/* eslint-disable prettier/prettier */
import { UserInput } from "./src/interfaces";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: number;
            MONGODB_URI?: string;
            JWT_TOKEN_SECRET: string;
            JWT_TOKEN_TIME: string;
            PARSER_SECRET: string;
            STATIC_FOLDER: string;
        }
    }
    // Extend Express Request
    namespace Express {
        interface Request {
            user?: UserInput | undefined
        }
    }
}

export { }
