// Products
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    hasVariant?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    itemList?: any[];
    variants?: Variants[];
    articleVariantsVariantValues?: any[];
    images?: Images[];
    tagsProducts?: any[];
    item?: any;
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    name?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}
