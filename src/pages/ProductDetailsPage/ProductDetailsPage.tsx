import { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../models/Product";
import dummyProducts from "../../dummyData/dummyProducts";

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | undefined>(dummyProducts.find((p) => p.id === productId));

    return product? (<div>{product.name}</div>) : (
    <div>
       <strong>Product Details Page for Item with Id of: {productId} was not found.</strong> 
    </div>
    );
}