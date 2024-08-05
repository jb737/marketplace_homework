import { useCallback, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import User from "../../models/User";
import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import classes from "./ProductsPage.module.css";
import dummyProducts from "../../dummyData/dummyProducts";
import CustomPagination from "../../components/CustomPagination/CustomPagination";


const PRODUCTS_PER_PAGE = 3;//usually all caps means configuration, should never change

export default function ProductsPage() {
    const { state } = useLocation();

    const [user] = useState<User>(state?.user);
    const [products, setProducts] = useState<Product[]>([...dummyProducts]);
    const [productsOnPage, setProductsOnPage] = useState<Product[]>(dummyProducts.slice(0, PRODUCTS_PER_PAGE));
    const [activePage, setActivePage] = useState<number>(1);

    const totalPages = useMemo(() => Math.ceil(products.length / PRODUCTS_PER_PAGE),[products.length]);

    const onPageChangeHandler = useCallback((pageNumber: number) => {
        const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        setProductsOnPage(products.slice(start, end));
        setActivePage(pageNumber);
    },[products]);//this function will be redeclared only if my products change

 
    return user ? ( 
        <Container>
        <Row className = {classes.title + " mt-4 mb-4"}>
            <h1>Welcome to the MERN Shop.</h1>
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
     ) : (<Navigate to = "/account/register" />
    );
}