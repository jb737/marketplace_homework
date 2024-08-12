import { Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css"
import { useState } from "react";

export default function NotFoundPage() {
    const [theme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "");
    return (
        <div className={classes.page_container} data-theme = {theme}>
    <div className = {classes.container + " center"}>
        <h2>404</h2>
        <img alt = "MERN Shop logo" title = "MERN Shop logo" src = "src/Assets/shopping-bag.png"/>
        <Row><h3>Sorry, your page could not be found</h3></Row>
        <Link type = "button" to = "/">Return to Dashboard</Link>
    </div>
    </div>
    )
}