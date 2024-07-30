import { Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

import classes from "./LoginPage.module.css"
import FormInput from "../../components/FormInput/FormInput";


export default function LoginPage() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        event.preventDefault;
        event.stopPropagation();

        
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
    navigate("/", {
        state: {
            user: {
                email,
            },
        },
    });
};

    return (
        <div className = {classes.page_container}>
        <Container className = {classes.container + " center"}>
            <Row>
                <h3>Log - In:</h3>
            </Row>
            <Row>
                <Form noValidate validated = {validated} onSubmit = {onSubmitHandler}>
                    <FormInput 
                        title = "E-Mail"
                        type = "email"
                        onChange = {e => setEmail(e.target.value)}
                        value = {email}
                    />
                    <FormInput 
                        title = "Password"
                        type = "password"
                        onChange = {e => setPassword(e.target.value)}
                        value = {password}
                    />
                    <Button type = "submit" disabled = {!email || !password}>Log-In</Button>
                </Form>
            </Row>
            <Row>
                <p>Don't have an account? </p><Link to = "/register">Sign Up Here:</Link>
            </Row>
        </Container>
        </div>
    )
}