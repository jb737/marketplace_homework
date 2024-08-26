export default interface Product {
    id: number;
    name: string;
    price: number;
    ownerId: number ;
    ownerEmail: string;
    postedOn: Date;
    images: string[];
    soldOn?: Date;
    description?: string;
    isSold?: boolean;
}