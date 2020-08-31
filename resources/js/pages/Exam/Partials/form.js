import React, { useState, useEffect, useRef } from "react";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../components/ToastMessage";
import TextArea from "../../../components/TextArea";

export default function Formdata({ data, classroom, handleForm }) {
    const { errors, flash } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: data ? data.id : "",
        title: data ? data.title : "",
        description: data ? data.description : "",
        average: data && data.average ? data.average : "",
        status: data && data.status ? data.status : 0,
        classroom_id: classroom.id
    });

    const [isSwitchOn, setIsSwitchOn] = useState(
        data && data.status != 0 ? true : false
    );

    const [showToast, setShowToast] = useState(false);

    const handleTextArea = text => {
        setValues(values => ({
            ...values,
            description: text
        }));
    };

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
        handleForm(values);
    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setValues(values => ({
                ...values,
                status: isSwitchOn
            }));
            setShowToast(flash.message ? true : false);
        }

        return () => (mounted = false);
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

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <TextArea
                        placeholder="Description"
                        handleFunction={handleTextArea}
                        value={values.description}
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col className="col-md-2">
                        <Form.Group controlId="average">
                            <Form.Label>Average</Form.Label>
                            <Form.Control
                                size="lg"
                                type="number"
                                placeholder="Average"
                                value={values.average}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.average}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.average}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

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
