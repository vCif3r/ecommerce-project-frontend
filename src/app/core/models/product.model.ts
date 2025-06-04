import { ICategory } from "./category.model";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    stock: number
    description: string;
    images: IProductImage[];
    category: ICategory;
    category_id?: number;
    created_at: string;
}

export interface IProductImage {
    id: number;
    imageUrl: string;
    product_id: number;
    isPrimary: boolean;
}