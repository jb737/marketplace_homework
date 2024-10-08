import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Container, Row, Image } from "react-bootstrap";

import Product from "../../models/Product";
import classes from "./ProductDetailsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import productsService from "../../services/productsService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";
import AppError from "../../models/AppError";
import { AxiosError } from "axios";



export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product>({} as Product);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AppError | undefined>();

    useEffect(() => {
        const getProduct = async () => {
           try {
            const product = await productsService.getProductById(Number(productId));
           setProduct(product);
           } catch (error) {
            const e = error as AxiosError;
            setError({message: e.message});
           } finally {
            setIsLoading(false);
           }
        };

        if(productId){
            getProduct();
        }
    }, [productId]);

    const pageContent = isLoading? <LoadingSpinner /> : <>
     <PageTitle title = {product.name} />
        <Row>
            <Carousel slide = {false}>
                {product.images.map((imageUrl, i) => (
                <Carousel.Item key = {i} style = {{textAlign: "center"}}>
                    <Image className = {classes.image} src = {imageUrl} rounded />
                </Carousel.Item>
                ))}
            </Carousel>
            </Row>
            <Row className = {classes.details_section + " mt-5 mb-5"}>
                <h5>Price: ${product.price}</h5>
                <hr />
                {product.description && <p className = {classes.description}>{product.description}</p>}
                <div className = {classes.footer + " mt-4 text-center"}>
                    <p>Posted On: <strong>{new Date(product.postedOn).toDateString()}</strong></p>
                    <p>E-Mail Seller: {" "}
                         <a href={`mailto:${product.ownerEmail}`}>{product.ownerEmail}</a>
                    </p>
                </div>
            </Row>
    </>

    return <Container>
        {error ? <ErrorMessageAlert message = {error.message} /> : pageContent}
    </Container>;
}

