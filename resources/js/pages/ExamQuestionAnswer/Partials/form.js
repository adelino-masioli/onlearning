import React, { useState, useEffect, useRef } from "react";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../components/ToastMessage";

export default function Formdata({ data, question, handleForm }) {
    const { errors, flash } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: data ? data.id : "",
        answer: data ? data.answer : "",
        is_correct: data && data.is_correct ? data.is_correct : 0,
        status: data && data.status ? data.status : 0,
        exam_question_id: question.id
    });

    const [isSwitchOn, setIsSwitchOn] = useState(
        data && data.status != 0 ? true : false
    );

    const [isSwitchCorrect, setIsSwitchCorrect] = useState(
        data && data.is_correct != 0 ? true : false
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

    const setIsSwitchCorrectAction = () => {
        setIsSwitchCorrect(!isSwitchCorrect);
    };

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setValues(values => ({
                ...values,
                is_correct: isSwitchCorrect,
                status: isSwitchOn
            }));
            setShowToast(flash.message ? true : false);
        }

        return () => (mounted = false);
    }, [isSwitchOn, isSwitchCorrect, flash]);

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

                <Form.Group controlId="answer">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Answer"
                        value={values.answer}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.answer}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.answer}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col className="col-md-2">
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
                    <Col className="col-md-3">
                        <Form.Group controlId="is_correct">
                            <Form.Check
                                custom
                                type="switch"
                                checked={isSwitchCorrect}
                                onChange={setIsSwitchCorrectAction}
                                label="Is it correct?"
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
