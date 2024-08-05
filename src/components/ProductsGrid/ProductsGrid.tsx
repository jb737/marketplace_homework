import { Row, Col, Card, Container } from "react-bootstrap";
import { useCallback } from "react";

import Product from "../../models/Product";
import classes from "./ProductsGrid.module.css"
import { Link } from "react-router-dom";

interface ProductsGridProps {
    products: Product[];
    itemsPerRow?: number;
}

export default function ProductsGrid({ 
    products, 
    itemsPerRow = 3,
}: ProductsGridProps) {
    const totalRowsCount = Math.ceil(products.length / (itemsPerRow ?? 3));


    const createGrid = useCallback((): JSX.Element[] => {//this rerenders this element only if either of the dependancies below change
        const grid: JSX.Element[] = [];//this optimizes the code
        let rowNumber = 1;
        let sliceStartIndex = 0;

        while (rowNumber <= totalRowsCount) {
            const productsInRow = products.slice(
                sliceStartIndex, 
                sliceStartIndex + itemsPerRow
            );
            grid.push (
            <Row  key = {rowNumber}>
                {productsInRow.map((product, i) => 
                    <Col sm = {12} md = {4} className = "mb-3" key = {`${rowNumber}_${i}`}>
                        <Card className = {classes.card}>
                            <Card.Img variant="top" src = {product.imageUrl} />
                                <Card.Body className = {classes.card_body}>
                                    <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            <strong>${product.price}</strong>
                                        </Card.Text>
                                    <Link className = "btn btn-secondary" to = {`/products/${product.id}`}>Check It Out</Link>
                                </Card.Body>
                                <Card.Footer className = {classes.card_footer +" text-muted"}>Posted on: {product.postedOn.toDateString()}</Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>);

            rowNumber++;
            sliceStartIndex += itemsPerRow;
        }

        return grid;
    }, [totalRowsCount, products, itemsPerRow]);


    return  totalRowsCount ? (
    <Container>{createGrid()}</Container>
) :  (
    <Row><p>No Products Found.</p></Row>
);
    
}