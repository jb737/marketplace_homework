import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { UserContext } from "../../contexts/UserContext";
import Product from "../../models/Product";
import dummyProducts from "../../dummyData/dummyProducts";
import classes from "./MyProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function MyProductsPage() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [myProducts, setMyProducts] = useState<Product[]>(
        dummyProducts.filter(p => p.postedBy === user?.email)
    );

    const onDeleteProductClickHandler = (productId: string) => {
        const productIndex = dummyProducts.findIndex((p) => p.id === productId);

        if (productIndex === -1) {
            return;
        }

        dummyProducts.splice(productIndex, 1);

        setMyProducts(dummyProducts.filter((p) => p.postedBy === user?.email));
    }

    return(
        <Container>
           <PageTitle title = "My Products:" />
           <div>
            {myProducts.length > 0 ? (
                <>
                <div className = {classes.add_product_button_container}>
                <Link className = {classes.add_product + " btn btn-primary"} to = "/addProduct" title = "Add A Product">Add a Product</Link>
                </div>
                <ul className = {classes.list}>
                {myProducts.map((product) => (
                    <li key = {product.id}>
                        <div className = {classes.product_info}>
                        <img className = {classes.image} src = {product.images[0]} alt = {`Image for: ${product.name}`} />
                        <div className = {classes.product_info_text_container}>
                            <p>Product Name: <strong>{product.name}</strong> </p>
                            <p>Asking Price:<strong> {product.price}</strong></p>
                            <p >Posted On: <strong>{product.postedOn.toDateString()}</strong></p>
                        </div>
                        </div>
                        <div className = {classes.buttons_container}>
                            <Button onClick = {() => navigate(`/addProduct/${product.id}`)} variant = "info" title = "Edit"><FaEdit /></Button>
                            <Button onClick = {() => onDeleteProductClickHandler(product.id)} variant = "danger" title = "Delete"><MdOutlineDelete /></Button>
                        </div>
                    </li>
                ))}
            </ul>
            </>
            ) : (
                <div  className = {classes.noproduct_message_container}>
                    <p>You have not posted any products yet  </p>
                    <Link className = "btn btn-primary" to = "/addProduct" title = "Add a Product">Create a Product Post Now!</Link>
                   
                </div>
        )}
           </div>
        </Container>
    );
}