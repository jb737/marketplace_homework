import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Address from "../../models/Address";
import classes from "./SignUpPage.module.css";
import FormInput from "../../components/FormInput/FormInput";


//TODO: set min DOB to be 18 years old
//TODO: password match

const SignUpPage = (): JSX.Element => {
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

    const onSubmitHandler = (event : React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        

        if (form.checkValidity() === false) {
            alert("Please Fill All Required Fields");
            setValidated(true);
            return;
        }

    

        if (password !== confirmPassword) {
            alert("Passwords do not match. Passwords must match.");
            return;
        }

        alert(JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            dateOfBirth,
            address
        })
    );
    };

    return ( 
    <Container className = {classes.container}>
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
                    onChange = {(e) => setFirstName(e.target.value)}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Last Name"
                    value = {lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "date"
                    required
                    title = "Date of Birth"
                    value = {dateOfBirth}
                    onChange={(e) => setDateOfBirth(new Date(e.target.value))}
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
                        number: e.target.value,
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
                        street: e.target.value,
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
                        city: e.target.value,
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
                        state: e.target.value,
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
                        zip: e.target.value,
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
                        country: e.target.value,
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
                    title = "Password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "Confirm Password"
                    value = {confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Col>
                <Col>
                <FormInput
                    type = "text"
                    required
                    title = "E-Mail"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Col>
            </Row>
            </fieldset>
            <Row>
            <Button className = {classes.submit_btn} type = "submit">Submit Registration</Button>
            </Row>
        </Form>
        </Row>
    </Container>
)};


export default SignUpPage;