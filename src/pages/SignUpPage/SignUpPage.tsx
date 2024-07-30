import { useMemo, useState } from "react";
import { Container, Form, Row, Col, Button, } from "react-bootstrap";
import Address from "../../models/Address";
import classes from "./SignUpPage.module.css";
import FormInput from "../../components/FormInput/FormInput";
import { Link, useNavigate } from "react-router-dom";


const SignUpPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
    const [address, setAddress] = useState<Address>({
        street: "",
        number: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });
//this is useCallback. It rerenders when a new date of birth is entered and returns a function
    //const getAgeDateLimit = useCallback (() => {
    //    const date = new Date();
   //     date.setFullYear(date.getFullYear() -18);
    //    return date;
    //}, []);

    //this is useMemo. Memoization to avoid recreating the date object on every render. It stores a value, aka cache
    const dateOfBirthLimit = useMemo(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() -18);
        return date;
    }, []);


    const onSubmitHandler = (event : React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

       navigate("/", {
        state: {
            user: {
                firstName,
                lastName,
                email,
                dateOfBirth,
                address,
            }//we are navigating across pages and sending the user object as a piece of state
        }
       })
    };


    return ( 
    <Container className = {classes.container + " center"}>
        <Row> 
           <h3 className={classes.title}>Sign Up</h3>
        </Row>

        <Row>
        <Form noValidate  validated={validated} onSubmit = {onSubmitHandler}>
            <fieldset>
                <Row>
                <Col>
                <FormInput
                    type = "text"
                    required 
                    title = "First Name"
                    value = {firstName}
                    onChange = {(e) => setFirstName(e.target.value.trim())}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Last Name"
                    value = {lastName}
                    onChange={(e) => setLastName(e.target.value.trim())}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "date"
                    required
                    title = "Date of Birth"
                    value = {dateOfBirth ?? ""}
                    onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                    max = {dateOfBirthLimit.toISOString().split("T")[0]}
                    />
                </Col>
                </Row>
            </fieldset>

            <fieldset>
                <Row>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Street Number"
                    value = {address.number}
                    onChange={(e) =>  setAddress((prevState) => ({
                        ...prevState,
                        number: e.target.value.trim(),
                    }))}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Street Name"
                    value = {address.street}
                    onChange={(e) =>  setAddress((prevState) => ({
                        ...prevState,
                        street: e.target.value.trim(),
                    }))}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "City / Town / Municipality"
                    value = {address.city}
                    onChange={(e) =>  setAddress((prevState) => ({
                        ...prevState,
                        city: e.target.value.trim(),
                    }))}
                    />
                </Col>
                </Row>
            </fieldset>

            <fieldset>
                <Row>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "State / Province / Territory"
                    value = {address.state}
                    onChange={(e) =>  setAddress((prevState) => ({
                        ...prevState,
                        state: e.target.value.trim(),
                    }))}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Zip / Postal Code"
                    value = {address.zip}
                    onChange={(e) =>  setAddress((prevState) => ({
                        ...prevState,
                        zip: e.target.value.trim(),
                    }))}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Country"
                    value = {address.country}
                    onChange={(e) =>  setAddress((prevState) => ({
                        ...prevState,
                        country: e.target.value.trim(),
                    }))}
                    />
                </Col>
                </Row>
            </fieldset>

            <fieldset>
                <Row>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "E-Mail"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "password"
                    required
                    title = "Password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "password"
                    required
                    title = "Confirm Password"
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value.trim())}
                    />
                </Col>
                </Row>
                {password !== confirmPassword && <Row className = {classes.error_message + " error_text"}>Passwords do not match</Row>}
            </fieldset>
            <div className = {classes.submit_btn_container}>
            <Button disabled = { (password !== confirmPassword) || !email } className = {classes.submit_btn} type = "submit">Submit Registration</Button>
            </div>
        </Form>
        </Row>
        <Row className = {classes.footer}>
            <p>Already have an account? </p><Link to = "/login">Log In here:</Link>
        </Row>
    </Container>
)};


export default SignUpPage;
