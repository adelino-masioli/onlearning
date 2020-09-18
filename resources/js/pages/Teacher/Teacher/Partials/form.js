import React, { useState, useEffect, useCallback } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { useDropzone } from "react-dropzone";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FiUploadCloud } from "react-icons/fi";

import ToastMessage from "../../../../components/ToastMessage";
import TextArea from "../../../../components/TextArea";
import Loading from "../../../../components/Loading";

export default function FormDatas({ datas }) {
    const { errors, flash, csrf_token } = usePage();

    const [values, setValues] = useState({
        name: datas ? datas.register.name : "",
        email: datas ? datas.register.email : "",
        phone:
            datas && datas.register.phone != null ? datas.register.phone : "",
        instagram:
            datas && datas.register.instagram != null
                ? datas.register.instagram
                : "",
        facebook:
            datas && datas.register.facebook != null
                ? datas.register.facebook
                : "",
        youtube:
            datas && datas.register.youtube != null
                ? datas.register.youtube
                : "",
        linkedin:
            datas && datas.register.linkedin != null
                ? datas.register.linkedin
                : "",
        description:
            datas && datas.register.description != null
                ? datas.register.description
                : "",
        degree:
            datas && datas.register.degree != null ? datas.register.degree : "",
        qualification:
            datas && datas.register.qualification != null
                ? datas.register.qualification
                : "",
        seo: datas && datas.register.seo != null ? datas.register.seo : "",
        avatar: datas && datas.avatar != null ? datas.avatar : "",
        password: "",
        confirmpassword: "",
    });
    const [isSwitchOn, setIsSwitchOn] = useState(
        datas && datas.seo != 0 ? true : false
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
        data.append("name", values.name || "");
        data.append("email", values.email || "");
        data.append("phone", values.phone || "");
        data.append("instagram", values.instagram || "");
        data.append("facebook", values.facebook || "");
        data.append("youtube", values.youtube || "");
        data.append("linkedin", values.linkedin || "");
        data.append("description", values.description || "");
        data.append("degree", values.degree || "");
        data.append("qualification", values.qualification || "");
        data.append("seo", values.seo || "");
        data.append("password", values.password || "");
        data.append("confirmpassword", values.confirmpassword || "");
        data.append("_token", csrf_token.token);

        if (selectedFile) {
            data.append("image", selectedFile);
        }

        Inertia.post("/teacher/update", data);
        setShowLoading(true);
    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const handleTextAreaDescription = (text) => {
        setValues((values) => ({
            ...values,
            description: text,
        }));
    };
    const handleTextAreaDegree = (text) => {
        setValues((values) => ({
            ...values,
            degree: text,
        }));
    };
    const handleTextAreaQualification = (text) => {
        setValues((values) => ({
            ...values,
            qualification: text,
        }));
    };

    useEffect(() => {
        setValues((values) => ({
            ...values,
            seo: isSwitchOn,
        }));
        setShowToast(flash.message ? true : false);
        setShowLoading(Object.keys(flash).length ? false : true);
    }, [isSwitchOn, flash]);

    return (
        <>
            <Loading
                message="Loading"
                show={showLoading}
                flash={showToast}
                errors={!!errors}
            />
            <ToastMessage showToast={showToast} />

            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="name">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Full name"
                                        value={values.name}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Enter email"
                                        value={values.email}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="phone">
                                    <Form.Label>Telephone</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Telephone"
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="instagram">
                                    <Form.Label>Instagram</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Instagram"
                                        value={values.instagram}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="facebook">
                                    <Form.Label>Facebook</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Facebook"
                                        value={values.facebook}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="youtube">
                                    <Form.Label>Youtube</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Youtube"
                                        value={values.youtube}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="linkedin">
                                    <Form.Label>Linkedin</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Linkedin"
                                        value={values.linkedin}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>

                            <TextArea
                                placeholder="Description"
                                handleFunction={handleTextAreaDescription}
                                value={values.description}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="degree">
                            <Form.Label>Degree</Form.Label>

                            <TextArea
                                placeholder="Degree"
                                handleFunction={handleTextAreaDegree}
                                value={values.degree}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                {errors.degree}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="qualification">
                            <Form.Label>Qualifications</Form.Label>
                            <TextArea
                                placeholder="Qualifications"
                                handleFunction={handleTextAreaQualification}
                                value={values.qualification}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                {errors.qualification}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Row>
                            <Col>
                                <Form.Group controlId="password">
                                    <Form.Label>New password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="confirmpassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={values.confirmpassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmpassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmpassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Col>

                    <Col xs={4}>
                        <Form.Group controlId="image">
                            <div className="photo-profile">
                                <div className="photo-profile-header"></div>
                                <div
                                    {...getRootProps()}
                                    className="dropzone dropzone_radius m-auto"
                                >
                                    <Form.Control
                                        {...getInputProps()}
                                        accept="image/*"
                                        name="image"
                                        required
                                        isInvalid={!!errors.image}
                                    />
                                    {selectedFileUrl ||
                                    (datas && datas.avatar != null) ? (
                                        selectedFileUrl ? (
                                            <img
                                                src={selectedFileUrl}
                                                alt="Selected file"
                                            />
                                        ) : (
                                            <img
                                                src={datas.avatar}
                                                alt="Selected file"
                                            />
                                        )
                                    ) : (
                                        <p>
                                            <FiUploadCloud size={40} />
                                            Drag 'n' drop some files here, or
                                            click to select files
                                        </p>
                                    )}
                                </div>

                                <div className="photo-profile-name">
                                    {values.name}
                                </div>
                            </div>

                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                {errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="seo">
                    <Form.Check
                        custom
                        type="switch"
                        checked={isSwitchOn}
                        onChange={onSwitchAction}
                        label="Would you like to share your information on search engines?"
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
