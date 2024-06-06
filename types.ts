export default interface Category {
    [x: string]: any;
    id: number;
    name: string;
    icon: any;
    color: string;
}

export default interface Product {
    id: number;
    name: string;
    description: string;
    mrp: string;
    sellingPrice: string;
    itemQuantityType: string;
    slug: string;
    images: string;
    categories: string;
}
