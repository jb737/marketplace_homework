import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { UserContext } from "../../contexts/UserContext";
import Product from "../../models/Product";
import classes from "./MyProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import usersService from "../../services/userService";
import productsService from "../../services/productsService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";

export default function MyProductsPage() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [myProducts, setMyProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const getUsersProducts = async () => {
            try {
                const products = await usersService.getUserProducts(1);
                setMyProducts(products);
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
          
        };

        getUsersProducts();
    }, []);

    const onDeleteProductClickHandler = async (productId: number) => {
       await productsService.deleteProduct(productId);
       setMyProducts(prev => {
        return prev.filter(product => product.id != product.id);
       })
    };

    const pageContent = isLoading ? (
        <LoadingSpinner />
    ) : (
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
   )

    return(
        <Container>
           <PageTitle title = "My Products:" />
           {hasError ? (
               <ErrorMessageAlert />
              ) : (
                pageContent
            )}
            
        </Container>
    );
}