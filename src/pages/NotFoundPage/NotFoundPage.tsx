import { Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css"
import { useContext } from "react";
import { ColorThemeContext } from "../../contexts/ColorThemeContext";

export default function NotFoundPage() {
    const { theme } = useContext(ColorThemeContext);
    return (
        <div className={classes.page_container} data-theme = {theme}>
    <div data-theme = {theme} className = {classes.container + " center"}>
        <h2>404</h2>
        <img alt = "MERN Shop logo" title = "MERN Shop logo" src = "src/Assets/shopping-bag.png"/>
        <Row><h3>Sorry, your page could not be found</h3></Row>
        <Link alt = "return to dashboard" title = "Return to Dashboard" type = "btn btn-secondary" to = "/">Return to Dashboard</Link>
    </div>
    </div>
    )
}