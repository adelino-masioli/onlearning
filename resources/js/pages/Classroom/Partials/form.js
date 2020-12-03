import React, { useState, useEffect, useRef } from "react";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../components/ToastMessage";
import TextArea from "../../../components/TextArea";

export default function Formdata({ data, courses, handleForm }) {
    const { errors, flash } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: data ? data.id : "",
        title: data ? data.title : "",
        description: data ? data.description : "",
        video: data && data.video ? data.video : "",
        download: data && data.download ? data.download : "",
        meet: data && data.meet ? data.meet : "",
        status: data && data.status ? data.status : 0,
        course_id: data && data.course_id ? data.course_id : "",
    });

    const [isSwitchOn, setIsSwitchOn] = useState(
        data && data.status != 0 ? true : false
    );

    const [showToast, setShowToast] = useState(false);
    const [listCourses, setListCourses] = useState(courses ? courses : []);

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
        setListCourses(courses)

        return () => (mounted = false);
    }, [isSwitchOn, flash, courses]);

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
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="course_id">
                            <Form.Label>Course</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={handleChange}
                                value={values.course_id}
                                size="md"
                                required
                                isInvalid={!!errors.course_id}
                                className="shadow-sm"
                            >
                                <option value="">Select a course</option>
                                {listCourses.map(course => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.course_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="meet">
                            <Form.Label>Meet ID</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Meet ID"
                                value={values.meet}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.meet}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.meet}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <TextArea
                        placeholder="Description"
                        handleFunction={handleTextArea}
                        value={values.description}
                        className="shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col>
                        <Form.Group controlId="video">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Video URL"
                                value={values.video}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.video}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.video}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="download">
                            <Form.Label>Download URL</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={values.download}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.download}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.download}
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
