import React, { useState, useEffect, useRef } from "react";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../components/ToastMessage";

export default function Formdata({ data, exam, handleForm }) {
    const { errors, flash } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: data ? data.id : "",
        question: data ? data.question : "",
        time: data ? data.time : "",
        status: data && data.status ? data.status : 0,
        exam_id: exam.id
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

                <Form.Group controlId="question">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Question"
                        value={values.question}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.question}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.question}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col className="col-md-2">
                        <Form.Group controlId="time">
                            <Form.Label>
                                How long to answer this question?
                            </Form.Label>
                            <Form.Control
                                size="lg"
                                type="number"
                                placeholder="How long to answer this question?"
                                value={values.time}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.time}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.time}
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
