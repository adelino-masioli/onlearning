import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { FiUploadCloud } from "react-icons/fi";

import ToastMessage from "../../../../components/ToastMessage";
import Loading from "../../../../components/Loading";

export default function FormData({ datas, handleForm }) {
    const { errors, flash, csrf_token } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: datas ? datas.register.id : "",
        title: datas ? datas.register.title : "",
        level: datas ? datas.register.level : "",
        price: datas ? datas.register.price : "",
        weeks: datas ? datas.register.weeks : "",
        hours: datas ? datas.register.hours : "",
        timetable: datas ? datas.register.timetable : "",
        age: datas ? datas.register.age : "",
        size: datas ? datas.register.size : "",
        description: datas ? datas.register.description : "",
        image: datas ? datas.cover.cover : "",
        show: datas ? datas.register.show : 0,
        status: datas ? datas.register.status : 0,
    });
    const [isSwitchOn, setIsSwitchOn] = useState(
        datas && datas.status != 0 ? true : false
    );
    const [isSwitchOnLandingPage, setIsSwitchOnLandingPage] = useState(
        datas && datas.show != 0 ? true : false
    );
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileUrl, setSelectedFileUrl] = useState();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFile(file);
        setSelectedFileUrl(fileUrl);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        setShowToast(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setShowToast(false);

        const data = new FormData();
        data.append("id", values.id || "");
        data.append("title", values.title || "");
        data.append("level", values.level || "");
        data.append("price", values.price || "");
        data.append("weeks", values.weeks || "");
        data.append("hours", values.hours || "");
        data.append("timetable", values.timetable || "");
        data.append("age", values.age || "");
        data.append("size", values.size || "");
        data.append("description", values.description || "");
        data.append("show", values.show || 0);
        data.append("status", values.status || 0);
        data.append("_token", csrf_token.token);

        if (selectedFile) {
            data.append("image", selectedFile);
        }
        handleForm(data);

        setShowLoading(true);
    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const onSwitchOnLandingPageAction = () => {
        setIsSwitchOnLandingPage(!isSwitchOnLandingPage);
    };

    useEffect(() => {
        setValues((values) => ({
            ...values,
            status: isSwitchOn,
            show: isSwitchOnLandingPage,
        }));
        setShowToast(flash.message ? true : false);
        setShowLoading(Object.keys(flash).length ? false : true);
    }, [isSwitchOn, isSwitchOnLandingPage, flash]);

    return (
        <>
            <Loading
                message="Loading"
                show={showLoading}
                flash={showToast}
                errors={errors}
            />
            <ToastMessage showToast={showToast} />

            <Form onSubmit={handleSubmit} noValidate ref={formRef}>
                <Form.Control
                    type="hidden"
                    value={values.id}
                    onChange={handleChange}
                    isInvalid={!!errors.id}
                />

                <Form.Row>
                    <Col md={5}>
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

                    <Col md={5}>
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

                    <Col md={2}>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Price"
                                value={values.price}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col sm={1}>
                        <Form.Group controlId="weeks">
                            <Form.Label>Weeks</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Weeks"
                                value={values.weeks}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.weeks}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.weeks}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group controlId="hours">
                            <Form.Label>Hours per week</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Hours per week"
                                value={values.hours}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.hours}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.hours}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="age">
                            <Form.Label>Minimum age</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Minimum age"
                                value={values.age}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.age}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.age}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>



                    <Col sm={5}>
                        <Form.Group controlId="timetable">
                            <Form.Label>Timetable</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Timetable"
                                value={values.timetable}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.timetable}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.timetable}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group controlId="size">
                            <Form.Label>Max class size</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Max class size"
                                value={values.size}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.size}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.size}
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

                <Form.Group controlId="image">
                    <Form.Label>Cover</Form.Label>

                    <div {...getRootProps()} className="dropzone">
                        <Form.Control
                            {...getInputProps()}
                            accept="image/*"
                            name="image"
                            required
                            isInvalid={!!errors.image}
                        />
                        {selectedFileUrl || (datas && datas.cover != null) ? (
                            selectedFileUrl ? (
                                <img
                                    src={selectedFileUrl}
                                    alt="Selected file"
                                />
                            ) : (
                                    <img src={datas.cover} alt="Selected file" />
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

                <Form.Row>
                    <Col className="col-md-3">
                        <Form.Group controlId="status">
                            <Form.Check
                                custom
                                type="switch"
                                checked={isSwitchOn}
                                onChange={onSwitchAction}
                                label="Is it published?"
                            />
                        </Form.Group>
                    </Col>
                    <Form.Group controlId="show">
                        <Form.Check
                            custom
                            type="switch"
                            checked={isSwitchOnLandingPage}
                            onChange={onSwitchOnLandingPageAction}
                            label="Show on landing page?"
                        />
                    </Form.Group>
                </Form.Row>
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
