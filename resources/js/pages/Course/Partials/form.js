import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { FiUploadCloud } from "react-icons/fi";

import ToastMessage from "../../../components/ToastMessage";

export default function Formdatas({ datas, handleForm }) {
    const { errors, flash, csrf_token } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: datas ? datas.register.id : "",
        title: datas ? datas.register.title : "",
        level: datas ? datas.register.level : "",
        description: datas ? datas.register.description : "",
        image: datas ? datas.cover.cover : "",
        status: datas ? datas.register.status : 0
    });
    const [isSwitchOn, setIsSwitchOn] = useState(
        datas && datas.status != 0 ? true : false
    );
    const [showToast, setShowToast] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileUrl, setSelectedFileUrl] = useState();

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFile(file);
        setSelectedFileUrl(fileUrl);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*"
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
        setShowToast(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append("id", values.id || "");
        data.append("title", values.title || "");
        data.append("level", values.level || "");
        data.append("description", values.description || "");
        data.append("status", values.status || 0);
        data.append("_token", csrf_token.token);

        if (selectedFile) {
            data.append("image", selectedFile);
        }
        handleForm(data);
    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    useEffect(() => {
        setValues(values => ({
            ...values,
            status: isSwitchOn
        }));
        setShowToast(flash.message ? true : false);
    }, [isSwitchOn, flash]);

    return (
        <>
            <ToastMessage showToast={showToast} />

            <Form onSubmit={handleSubmit} noValidate ref={formRef}>
                <Form.Control
                    type="hidden"
                    value={values.id}
                    onChange={handleChange}
                    isInvalid={!!errors.id}
                />

                <Form.Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={values.title}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="level">
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={handleChange}
                                value={values.level}
                                size="md"
                                required
                                isInvalid={!!errors.level}
                            >
                                <option value="">Select a course</option>
                                <option value="Beginner">Beginner</option>
                                <option value="A1 Elementary">
                                    A1 Elementary
                                </option>
                                <option value="A2 Pre-intermediate">
                                    A2 Pre-intermediate
                                </option>
                                <option value="B1 Intermediate">
                                    B1 Intermediate
                                </option>
                                <option value="B2 Upper-Intermediate">
                                    B2 Upper-Intermediate
                                </option>
                                <option value="C1 Advanced">C1 Advanced</option>
                                <option value="C2 Proficiency">
                                    C2 Proficiency
                                </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.level}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Description"
                        value={values.description}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Cover</Form.Label>

                    <div {...getRootProps()} className="dropzone">
                        <Form.Control
                            {...getInputProps()}
                            accept="image/*"
                            name="image"
                            required
                            isInvalid={!!errors.image}
                        />
                        {selectedFileUrl || datas ? (
                            datas ? (
                                <img src={datas.cover} alt="Selected file" />
                            ) : (
                                <img
                                    src={selectedFileUrl}
                                    alt="Selected file"
                                />
                            )
                        ) : (
                            <p>
                                <FiUploadCloud size={30} />
                                <br></br>
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        )}
                    </div>

                    <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.image}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Check
                        custom
                        type="switch"
                        checked={isSwitchOn}
                        onChange={onSwitchAction}
                        label="Is it published?"
                    />
                </Form.Group>
                <br />
                <Button
                    size="lg"
                    variant="success"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}
