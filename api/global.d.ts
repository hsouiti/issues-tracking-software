/* eslint-disable prettier/prettier */
export { }
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: string;
            PORT: number;
            MONGO_URL: string;
            JWT_TOKEN_SECRET: string;
            JWT_TOKEN_TIME: string;
            PARSER_SECRET: string;
            STATIC_FOLDER: string;
        }
    }
}
