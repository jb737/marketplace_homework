import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

import classes from "./LoginPage.module.css"
import FormInput from "../../components/FormInput/FormInput";
import CustomCard from "../../components/CustomCard/CustomCard";


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

const form =  <Form noValidate validated = {validated} onSubmit = {onSubmitHandler}>
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
                <div className = {classes.submit_btn_container}>
                <Button style = {{width: "33%"}} type = "submit" disabled = {!email || !password}>Log-In</Button>
                </div>
            </Form>

const footer = <p>Don't have an account? <Link to = "/register">Sign Up Here:</Link></p>

    return (
        <div className = {classes.page_container}>
        <CustomCard title = "Log In:" content = {form} footer = {footer} />
        </div>
    )
}