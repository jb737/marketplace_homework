import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Address from "../../models/Address";
import classes from "./SignUpPage.module.css";


//TODO: set min DOB to be 18 years old
//TODO: password match

const SignUpPage = (): JSX.Element => {
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

    const onSubmitHandler = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <Form onSubmit = {onSubmitHandler}>
            <fieldset>
            <Row>
                <Col>
            <Form.Label htmlFor = "firstName">First Name: </Form.Label>
                <Form.Control
                    type = "text"
                    id = "firstName"
                    required
                    value = {firstName}
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                </Col>
                <Col>
            <Form.Label htmlFor = "lastName">Last Name: </Form.Label>
                <Form.Control
                    type = "text"
                    id = "lastName"
                    required
                    value = {lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                />
                </Col>
                <Col>
            <Form.Label htmlFor = "dateOfBirth">Date of Birth: </Form.Label>
                <Form.Control
                    type = "date"
                    id = "dateOfBirth"
                    required
                    value = {dateOfBirth?.toISOString().split("T")[0] ?? ""}
                    onChange = {(e) => setDateOfBirth(new Date(e.target.value))}
                />
                </Col>
            </Row>
            </fieldset>

            <fieldset>
            <Row>
                <Col>
                    <Form.Label htmlFor = "streetNumber">Street Number: </Form.Label>
                    <Form.Control
                        type = "text"
                        id = "streetNumber"
                        required
                        value = {address.number}
                        onChange = {(e) => setAddress((prevState) => ({
                            ...prevState,
                            number: e.target.value,
                        }))
                    }
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor = "streetName">Street Name: </Form.Label>
                    <Form.Control
                        type = "text"
                        id = "streetName"
                        required
                        value = {address.street}
                        onChange = {(e) => setAddress((prevState) => ({
                            ...prevState,
                            street: e.target.value,
                        }))
                    }
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor = "city">City: </Form.Label>
                    <Form.Control
                        type = "text"
                        id = "city"
                        required
                        value = {address.city}
                        onChange = {(e) => setAddress((prevState) => ({
                            ...prevState,
                            city: e.target.value,
                        }))
                    }
                    />
                </Col>
                </Row>
                </fieldset>

                <fieldset>
                <Row>
                <Col>
                    <Form.Label htmlFor = "state">State/Province: </Form.Label>
                    <Form.Control
                        type = "text"
                        id = "state"
                        required
                        value = {address.state}
                        onChange = {(e) => setAddress((prevState) => ({
                            ...prevState,
                            state: e.target.value,
                        }))
                    }
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor = "zip">Zip/Postal Code: </Form.Label>
                    <Form.Control
                        type = "text"
                        id = "zip"
                        required
                        value = {address.zip}
                        onChange = {(e) => setAddress((prevState) => ({
                            ...prevState,
                            zip: e.target.value,
                        }))
                    }
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor = "country">Country: </Form.Label>
                    <Form.Control
                        type = "text"
                        id = "country"
                        required
                        value = {address.country}
                        onChange = {(e) => setAddress((prevState) => ({
                            ...prevState,
                            country: e.target.value,
                        }))
                    }
                    />
                </Col>
            </Row>
            </fieldset>

            <fieldset>
            <Row>
                <Col>
                    <Form.Label htmlFor = "password">Password: </Form.Label>
                    <Form.Control
                        type = "password"
                        id = "password"
                        required
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor = "confirmPassword">Confirm Password: </Form.Label>
                    <Form.Control
                        type = "confirmPassword"
                        id = "confirmPassword"
                        required
                        value = {confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor = "email">e-mail: </Form.Label>
                    <Form.Control
                        type = "email"
                        id = "email"
                        required
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
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