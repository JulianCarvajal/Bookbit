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
    id_book: number;
    finishDate: string;
    coins: number;
    id_status: number;
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