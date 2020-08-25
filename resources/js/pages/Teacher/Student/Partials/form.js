import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../../components/ToastMessage";

export default function FormData({ data }) {
    const { errors, flash } = usePage();

    const [values, setValues] = useState({
        name: data ? data.name : "",
        email: data ? data.email : "",
        phone: data ? data.phone : "",
        instagram: data ? data.instagram : "",
        facebook: data ? data.facebook : "",
        youtube: data ? data.youtube : "",
        linkedin: data ? data.linkedin : "",
        country: data ? data.country : "",
        state: data ? data.state : "",
        city: data ? data.city : "",
        level: data ? data.level : "",
        about: data ? data.about : "",
        status: data ? data.status : "",
        password: "",
        confirmpassword: ""
    });
    const [isSwitchOn, setIsSwitchOn] = useState(
        data && data.status != 0 ? true : false
    );
    const [showToast, setShowToast] = useState(false);

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
        Inertia.post("/teacher/student/store", values);
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
                </Form.Row>

                <Form.Row>
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
                    <Col>
                        <Form.Group controlId="level">
                            <Form.Label>English level</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={handleChange}
                                value={values.level}
                                size="md"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="A1 Elementary<">
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
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Country"
                                value={values.country}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="State"
                                value={values.state}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="City"
                                value={values.city}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="About"
                        value={values.about}
                        onChange={handleChange}
                    />
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

                <Form.Group controlId="status">
                    <Form.Check
                        custom
                        type="switch"
                        checked={isSwitchOn}
                        onChange={onSwitchAction}
                        label="Is active?"
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
