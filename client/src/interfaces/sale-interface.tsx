import { ISchemeProduct } from './product-interface'

export interface ISchemeSale {
    id:number;
    client: string;
    status: boolean;
    created_at: string;
    quantity: number;
    products: Array<ISchemeProduct>;
}