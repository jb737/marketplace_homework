import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RiSearchLine } from "react-icons/ri";

import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import classes from "./ProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import productsService from "../../services/productsService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";


const PRODUCTS_PER_PAGE = 3;//usually all caps means configuration, should never change

export default function ProductsPage() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [activePage, setActivePage] = useState<number>(1);
    const [hasError, setHasError] = useState<boolean>(false);

    const totalPages = useMemo(
        () => Math.ceil(products.length / PRODUCTS_PER_PAGE),
        [products.length]
    );

    const firstProductInPageIndex = useMemo(
        () => (activePage - 1) * PRODUCTS_PER_PAGE,
        [activePage]
    );
    const lastProductInPageIndex = useMemo(
        () => firstProductInPageIndex + PRODUCTS_PER_PAGE,
        [firstProductInPageIndex]
    );

    useEffect(() => {
        const getProducts = async() => {
            try {
                const response = await productsService.getAllProducts();
                setProducts(response);
            } catch (error) {
                setHasError(true)
            } finally {
                setIsLoading(false);
            }
           
            setIsLoading(false);
        };
        getProducts();
    }, []);

    const pageContent = <> 
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
        {isLoading ? (
            <LoadingSpinner />
        ) : (
        <>
            <ProductsGrid products = {products.slice(firstProductInPageIndex, lastProductInPageIndex)} />
            {products.length > PRODUCTS_PER_PAGE &&
              <CustomPagination 
              activePage = {activePage} 
              totalPages = {totalPages} 
              onPageChange = {pageNumber => setActivePage(pageNumber)}
              />
             }
           
        </>
       )
     }

    </Container>
    </>
 
    return  ( 
        <Container>
            <PageTitle title = "Welcome to the MERN Shop" />
                {hasError ? (
                <ErrorMessageAlert />
                    ) : pageContent}
        </Container>
     );
}