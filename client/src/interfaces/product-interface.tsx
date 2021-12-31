import { ISchemeCategory } from './category-interface'

export interface ISchemeProduct {
    id:number;
    name: string;
    description: string;
    quantity: number;
    value: number;
    active: boolean;
    created_at: string;
    category_id: number;
    category: ISchemeCategory;
}