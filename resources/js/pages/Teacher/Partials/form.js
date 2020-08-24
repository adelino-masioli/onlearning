import React, { useState } from "react";
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
        seo: data ? data.seo : null
    });

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

    {
        flash.message && toast.success(flash.message);
    }

    return (
        <>
            <ToastContainer />

            <Form onSubmit={handleSubmit} noValidate validated={errors}>
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
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name && <div>{errors.name[0]}</div>}
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
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email && <div>{errors.email[0]}</div>}
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
                        <Form.Group controlId="formInstagram">
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Instagram"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFacebook">
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Facebook"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formYoutube">
                            <Form.Label>Youtube</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Youtube"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formLinkedin">
                            <Form.Label>Linkedin</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Linkedin"
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Description"
                    />
                </Form.Group>

                <Form.Group controlId="formDegree">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Degree" />
                </Form.Group>

                <Form.Group controlId="formQualifications">
                    <Form.Label>Qualifications</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Qualifications"
                    />
                    <Form.Text className="text-muted">
                        Please enter one per line
                    </Form.Text>
                </Form.Group>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                size="lg"
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                size="lg"
                                type="password"
                                placeholder="Confirm password"
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId="formCheckbox">
                    <Form.Check
                        custom
                        type="checkbox"
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
