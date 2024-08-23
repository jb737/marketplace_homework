import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { IoSendOutline } from "react-icons/io5";
import FormInput from "../../components/FormInput/FormInput";
import classes from "./ProductFormPage.module.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { UserContext } from "../../contexts/UserContext";
import Product from "../../models/Product";
import PageTitle from "../../components/PageTitle/PageTitle";
import { CiCircleCheck } from "react-icons/ci";


export default function ProductFormPage() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { productId } = useParams();

    const product = undefined;

    const [isValidated, setIsValidated] = useState(false);
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || "");
    const [description, setDescription] = useState(product?.description || "");
    const [images, setImages] = useState<File[]>([]);


    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => { 
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setIsValidated(true);
            return;
        }

        const newProduct: Product = {
                id:"",
                name,
                price: Number(price),
                postedBy: user!.email,
                postedOn: new Date(),
                description,
                images: images.length > 0 ? images.map((file) => URL.createObjectURL(file)) : ["https://static.vecteezy.com/system/resources/previews/016/916/479/non_2x/placeholder-icon-design-free-vector.jpg"] ,
        };

        navigate(`/products/${newProduct.id}`);
    };

    const submitBtnContent = product ? (
    <>
        Save <span><CiCircleCheck /></span>
    </>
        ) : (
    <> Publish<span><IoSendOutline /></span>
    </>
    );

    return (
    <Container>
        <PageTitle title = "Add A Product:" />
        <Form 
            noValidate 
            validated = {isValidated} 
            onSubmit = {onSubmitHandler} 
            className = "mt-5 mb-5"
        >
             <div className = "mb-3 text-center">
                <Button 
                    className = {classes.submit_btn} 
                    type = "submit" 
                    variant = "btn btn-primary">
                        {submitBtnContent}
                </Button>
            </div>
            <Row>
                <Col>
                <FormInput
                    required
                    title = "Product Name"
                    type = "text"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                />
                </Col>
                <Col>
                <FormInput
                    required
                    title = "Price"
                    type = "text"
                    value = {price}
                    onChange = {(e) => setPrice(e.target.value)}
                />
                 </Col>
            </Row>
            <Row className = {classes.description + " mt-3"}>
                <FormInput
                    title = "Description"
                    type = "textarea"
                    value = {description}
                    onChange = {(e) => setDescription(e.target.value)}
                />
            </Row>
            <Row className = "mt-3">
                <ImageUpload onChange = {(files) => setImages(files)} onImageDelete = {(i) => setImages(prev => {
                    const newImages = [...prev];
                    newImages.splice(i, 1);
                    return newImages;
                })} />
            </Row>
        </Form>
    </Container>
    );
}