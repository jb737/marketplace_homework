import { useCallback, useMemo, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RiSearchLine } from "react-icons/ri";

import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import dummyProducts from "../../dummyData/dummyProducts";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import classes from "./ProductsPage.module.css";


const PRODUCTS_PER_PAGE = 3;//usually all caps means configuration, should never change

export default function ProductsPage() {

    const [products] = useState<Product[]>([...dummyProducts]);
    const [productsOnPage, setProductsOnPage] = useState<Product[]>(dummyProducts.slice(0, PRODUCTS_PER_PAGE));
    const [activePage, setActivePage] = useState<number>(1);

    const totalPages = useMemo(() => Math.ceil(products.length / PRODUCTS_PER_PAGE),[products.length]);

    const onPageChangeHandler = useCallback((pageNumber: number) => {
        const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        setProductsOnPage(products.slice(start, end));
        setActivePage(pageNumber);
    },[products]);//this function will be redeclared only if my products change

 
    return  ( 
        <Container>
        <Row className = "title mt-4 mb-4">
            <h1>Welcome to the MERN Shop.</h1>
        </Row>
        <Row>
            <Col className = "mb-3">
                <Link className = {classes.add_product + " btn btn-light"} to = "/me/products">Add a Product</Link>
            </Col>
            <Col className = "mb-3">
                <InputGroup>
                    <Form.Control
                        placeholder = "Search"
                        aria-label = "Search"
                        aria-describedby = "Search"
                    />
                    <Button className = {classes.search_btn} variant ="light"><RiSearchLine /></Button>
                </InputGroup>
            </Col>
        </Row>
            <Container>
                <ProductsGrid products = {productsOnPage} />
                <CustomPagination 
                    activePage = {activePage} 
                    totalPages = {totalPages} 
                    onPageChange = {onPageChangeHandler}//in order to use CustomPagination remember to bring in and define these props 
                    />
            </Container>
        </Container>
     ) 
}