export interface User {
    name: string;
    email: string;
    image: string;
    coins: number;
    challenges?: Challenge[];  
    avatar?: string;  
    pet?: string;  
    inventory?: Item[];  
    books: Book[];  
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface Challenge {
    id: number;
    title: string;
    book: Book;
    pages: number;
    deathLine: number;
    coins: number;
    status: Status;
}

export interface Item {
    id: number;
    name: string;
    image: string;
    category: string;
    price: number;
}

export interface Book {
    id: number;
    name: string;
    author: string;
    editorial: string;
    pages: number;
    chapters: number;
    publication_date: string;
}

export interface Status {
    id: number;
    name: string;
    category: string;
}