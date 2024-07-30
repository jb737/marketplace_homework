import { Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css"

export default function NotFoundPage() {
    return <div className = {classes.container + " center"}>
        <h2>404</h2>
        <Row><h3>Sorry, your page could not be found</h3></Row>
        <Link type = "button" to = "/">Return to Dashboard</Link>
    </div>
}