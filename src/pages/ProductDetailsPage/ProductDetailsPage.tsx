import { useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Container, Row, Image } from "react-bootstrap";

import Product from "../../models/Product";
import classes from "./ProductDetailsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";


export default function ProductDetailsPage() {
    const { productId } = useParams();

    const [product] = useState<Product | undefined>();

    return product? (
        <Container>
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
                    <p>Posted On: <strong>{product.postedOn.toDateString()}</strong></p>
                    <p>E-Mail Seller: <a href={`mailto:${product.postedBy}`}>{product.postedBy}</a></p>
                </div>
            </Row>
        </Container>
    ) : (
        <div>
            <strong>Product Details Page for Item with Id of: {productId} was not found.</strong> 
        </div>
    );
}

