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
    name: string;
    book: Book;
    pages: number;
    deathLine: number;
    reward: number;
    state: State;
    completion_date: Date
}

export interface Item {
    id: number;
    name: string;
    image: string;
    category: Category;
    value: number;
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

export interface State {
    id: number;
    name: string;
    category: string;
}

export interface Category {
    id: number;
    name: string;
}