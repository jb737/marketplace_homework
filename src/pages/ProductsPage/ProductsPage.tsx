import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RiSearchLine } from "react-icons/ri";

import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import classes from "./ProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import productsService from "../../services/productsService";


const PRODUCTS_PER_PAGE = 3;//usually all caps means configuration, should never change

export default function ProductsPage() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsOnPage, setProductsOnPage] = useState<Product[]>([]);
    const [activePage, setActivePage] = useState<number>(1);

    const totalPages = useMemo(() => Math.ceil(products.length / PRODUCTS_PER_PAGE),[products.length]);

    const onPageChangeHandler = useCallback((pageNumber: number) => {
        const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        setProductsOnPage(products.slice(start, end));
        setActivePage(pageNumber);
    },[products]);//this function will be redeclared only if my products change

    useEffect(() => {
        const getProducts = async() => {
            const response = await productsService.getAllProducts();
            setProducts(response);
            setIsLoading(false);
        };
        getProducts();
    }, []);//useEffect, async await and promise all go together. If I add products in the [] then it reloads every time and gets stuck in an infinite loop

    useEffect(() => {
        onPageChangeHandler(1)
    }, [onPageChangeHandler, products]);
 
    return  ( 
        <Container>
            <PageTitle title = "Welcome to the MERN Shop" />
        <Row>
            <Col className = "mb-3">
                <Link className = {classes.add_product + " btn btn-primary"} to = "/addProduct">Add a Product</Link>
            </Col>
            <Col className = "mb-3">
                <InputGroup>
                    <Form.Control
                        placeholder = "Search"
                        aria-label = "Search Products"
                        aria-describedby = "Search Products"
                    />
                    <Button className = {classes.search_btn} variant ="light"><RiSearchLine /></Button>
                </InputGroup>
            </Col>
        </Row>
            <Container>
                {isLoading ? <h5>Loading...</h5> : 
                <>
                    <ProductsGrid products = {productsOnPage} />
                    <CustomPagination 
                        activePage = {activePage} 
                        totalPages = {totalPages} 
                        onPageChange = {onPageChangeHandler}//in order to use CustomPagination remember to bring in and define these props 
                        />
                </>
                }
                
            </Container>
        </Container>
     ) 
}