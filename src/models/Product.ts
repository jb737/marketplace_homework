export default interface Product {
    id: string;
    name: string;
    price: number;
    postedBy: string;
    postedOn: Date;
    imageUrl: string;
    soldOn?: Date;
    description?: string;
    isSold?: boolean;
}