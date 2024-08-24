import { Spinner } from "react-bootstrap";
import classes from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
    return(
        <div className = "center + mt-5">
            <Spinner className = {classes.spinner} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}