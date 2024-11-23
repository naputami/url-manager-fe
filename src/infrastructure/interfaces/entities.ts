export interface User {
    name: string;
    email: string;
    password: string;
    sessionId: string;
}

export interface Category {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}