import React, { useState, useEffect, useRef } from "react";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../../components/ToastMessage";


export default function FormPayment({ data, courses, classrooms, students, handleForm }) {
    const { errors, flash } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: data && data.id ? data.id : "",
        course_id: data && data.id ? data.course_id : "",
        classroom_id: data && data.id ? data.classroom_id : "",
        student_id: data && data.id ? data.student_id : "",
        payment: data && data.id ? data.payment : "",
        date: data && data.id ? data.date : "",
        next_date: data && data.id ? data.next_date : "",
        observation: data && data.id ? data.observation : "",
        status: data && data.status ? data.status : 0,

    });

    const [isSwitchOn, setIsSwitchOn] = useState(
        data && data.status != 0 ? true : false
    );

    const [showToast, setShowToast] = useState(false);
    const [listCourses, setListCourses] = useState(courses ? courses : []);
    const [listStudents, setListStudents] = useState(students ? students : []);
    const [listClassrooms, setlistClassrooms] = useState([]);

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };


    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
        setShowToast(false);

        if (key == "course_id") {
            handleFilter(value)
        }

    }

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = classrooms.filter(function (item) {
            return Object.keys(item).some(key =>
                excludeColumns.includes(key)
                    ? false
                    : item["course_id"]
                        .toString()
                        .toLowerCase()
                        .includes(lowercasedValue)
            );
        });
        setlistClassrooms(results);
    }


    function handleSubmit(e) {
        e.preventDefault();
        handleForm(values);
    }


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
        setListStudents(students)

        return () => (mounted = false);
    }, [flash, isSwitchOn, courses, students]);

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

                    <Col md={4}>
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


                    <Col md={4}>
                        <Form.Group controlId="classroom_id">
                            <Form.Label>Classroom</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={handleChange}
                                value={values.classroom_id}
                                size="md"
                                required
                                isInvalid={!!errors.classroom_id}
                                className="shadow-sm"
                                disabled={listClassrooms.length > 0 || values.classroom_id > 0 ? null : 'disabled'}
                            >
                                <option value="">Select a classroom</option>
                                {listClassrooms.length > 0 || !data ? (
                                    listClassrooms.map(classroom => (
                                        <option key={classroom.id} value={classroom.id}>{classroom.title}</option>
                                    ))
                                ) : (
                                        <option value={data.classroom_id}>{data.classroom.title}</option>
                                    )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.classroom_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                    <Col md={4}>
                        <Form.Group controlId="student_id">
                            <Form.Label>Student</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                onChange={handleChange}
                                value={values.student_id}
                                size="md"
                                required
                                isInvalid={!!errors.student_id}
                                className="shadow-sm"
                            >
                                <option value="">Select a student</option>
                                {listStudents.map(student => (
                                    <option key={student.id} value={student.id}>{student.name}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.student_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Form.Row>

                <Form.Row>

                    <Col md={4}>
                        <Form.Group controlId="payment">
                            <Form.Label>Method payment</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Method payment"
                                value={values.payment}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.payment}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.payment}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group controlId="date">
                            <Form.Label>Date payment</Form.Label>
                            <Form.Control
                                size="lg"
                                type="date"
                                placeholder="Date payment"
                                value={values.date}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.date}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group controlId="next_date">
                            <Form.Label>Next payment</Form.Label>
                            <Form.Control
                                size="lg"
                                type="date"
                                placeholder="Next payment"
                                value={values.next_date}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.next_date}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.next_date}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Check
                                custom
                                type="switch"
                                checked={isSwitchOn}
                                onChange={onSwitchAction}
                                label="Was it paid?"
                                className="mt-2"
                            />
                        </Form.Group>
                    </Col>



                </Form.Row>


                <Form.Row>

                    <Col md={12}>
                        <Form.Group controlId="observation">
                            <Form.Label>Observation</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Observation"
                                value={values.observation}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.observation}
                                className="shadow-sm"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.observation}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                </Form.Row>

                <Button
                    size="md"
                    variant="success"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Confirm
                </Button>
            </Form>
        </>
    );
}
