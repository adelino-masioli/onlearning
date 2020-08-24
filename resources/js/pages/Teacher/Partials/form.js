import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

import { ToastContainer, toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function FormData({ data }) {
    const { errors, flash } = usePage();

    const [values, setValues] = useState({
        name: data ? data.name : null,
        email: data ? data.email : null,
        phone: data ? data.phone : null,
        instagram: data ? data.instagram : null,
        facebook: data ? data.facebook : null,
        youtube: data ? data.youtube : null,
        linkedin: data ? data.linkedin : null,
        description: data ? data.description : null,
        degree: data ? data.degree : null,
        qualification: data ? data.qualification : null,
        seo: data ? data.seo : null,
        password: "",
        confirmpassword: ""
    });
    const [isSwitchOn, setIsSwitchOn] = useState(
        data && data.seo == 0 ? false : true
    );

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post("/teacher/update", values);
    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    useEffect(() => {
        setValues(values => ({
            ...values,
            seo: isSwitchOn
        }));
    }, [isSwitchOn]);

    {
        flash.message && toast.success(flash.message);
    }

    return (
        <>
            <ToastContainer />

            <Form onSubmit={handleSubmit} noValidate>
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
                                isInvalid={!!errors.email}
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
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Description"
                        value={values.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="degree">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Degree"
                        value={values.degree}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="qualification">
                    <Form.Label>Qualifications</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Qualifications"
                        value={values.qualification}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        Please enter one per line
                    </Form.Text>
                </Form.Group>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
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
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}
