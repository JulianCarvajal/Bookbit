export interface User {
    name: string;
    image: string;
    coins: number;
    challenges?: Challenge[];  
    avatar?: string;  
    pet?: string;  
    inventory?: InventoryItem[];  
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

export interface InventoryItem {
    id: string;
    name: string;
    image: string;
    type: "weapon" | "armor" | "food" | "misc";
}

export interface Book {
    id: string;
    name: string;
    author: string;
    editorial: string;
    pages: number;
    chapters: number;
    publication_date: string;
}