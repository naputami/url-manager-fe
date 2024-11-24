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

export interface Link {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    summary: string;
    link: string;
    title: string;
    category: Partial<Category>;
}