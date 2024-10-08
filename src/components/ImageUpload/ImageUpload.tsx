import { Button, Form } from "react-bootstrap";
import classes from "./ImageUpload.module.css";
import { useState } from "react";

import { MdOutlineDelete } from "react-icons/md";

interface ImageUploadProps {
    onChange: (files: File[]) => void;
    onImageDelete: (index: number) => void;
}

export default function ImageUpload({
    onChange,
    onImageDelete,
}: ImageUploadProps): JSX.Element {

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(!files || files.length === 0) {
            return;
        }

        const filesArray = [...files];
        setIsLoading(true);
        setPreviewUrls(filesArray.map((file) => URL.createObjectURL(file)));//this creates a temp disposable url that holds the obj for preview. 
        onChange(filesArray)
    };

    const onDeleteClickHandler = (
        e:React.MouseEvent<HTMLButtonElement, MouseEvent>, 
        index: number
    ) => {
         e.preventDefault();
         setPreviewUrls((prev) => {
            const newPreviewUrls = [...prev];
            newPreviewUrls.splice(index, 1);
            return newPreviewUrls;
         });
         onImageDelete(index);
        };
       
    return ( 
        <div>
            <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Select Images</Form.Label>
            <Form.Control onChange = {onChangeHandler} type = "file" multiple accept = ".jpg, .png, .jpeg" />
            </Form.Group>
        
        <ul className = {classes.preview_list}>{previewUrls.map((url, i, arr) => (
            <li key = {i}>
                <img src = {url} alt = "Preview Image" onLoad = {() => {
                    if(i === arr.length - 1) {
                        setIsLoading(false);
                    }
                }} />
                {!isLoading && <Button 
                    onClick = {(e => onDeleteClickHandler(e, i))} 
                    type = "button" 
                    variant = "danger" 
                    size = "sm">
                        <MdOutlineDelete />
                </Button>}
            </li>
        ))}</ul>
        </div>
    );
}