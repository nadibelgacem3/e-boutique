import { Product } from './product';

// Order
export interface Order {
    shippingDetails?: any;
    product?: Product;
    articles?: any[];
    orderId?: any;
    totalAmount?: any;
    shipping?: any;
    date?: any;
}
