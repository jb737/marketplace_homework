import { Form } from "react-bootstrap";

interface FormInputProps {
    id?: string;
    title: string;
    type: "text" | "email" | "password" | "date";
    required?: boolean;
    value?: string | number | Date;
    placeholder?: string;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({title, type, required, id, value, placeholder, errorMessage, onChange,}:FormInputProps):JSX.Element {
    id = id ? id : title;

    const valueString = value instanceof Date ? value.toISOString().split("T")[0] : value;


    return (
        <>
            <Form.Label htmlFor = {id}>{title}</Form.Label>
                <Form.Control
                    type = {type}
                    id = {id}
                    required = {required}
                    value = {valueString}
                    placeholder = {placeholder}
                    onChange = {onChange}
                />
                 <Form.Control.Feedback type="invalid">
                    {required && !errorMessage ? "Required Field" : errorMessage}
                 </Form.Control.Feedback>
        </>
    )
}