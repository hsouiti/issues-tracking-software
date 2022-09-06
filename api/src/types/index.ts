/* eslint-disable prettier/prettier */
export interface ErrorType {
    statusCode?: number;
    message?: string;
    name?: string;
    stack?: string;
}

export interface UserInput {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string
}


export interface TokenInput {
    userId: string;
    role: string
}