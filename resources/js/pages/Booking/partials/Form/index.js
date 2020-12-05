import React, { useState, useEffect, useRef } from "react";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ToastMessage from "../../../../components/ToastMessage";


export default function Formdata({ data, courses, classrooms, students, handleForm }) {
    const { errors, flash } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: data && data.id ? data.id : "",
        course_id: data && data.id ? data.course_id : "",
        classroom_id: data && data.id ? data.classroom_id : "",
        student_id: data && data.id ? data.student_id : "",
        observation: data && data.id ? data.observation : "",
        status: data && data.id ? data.status : 0,

    });


    const [showToast, setShowToast] = useState(false);
    const [listCourses, setListCourses] = useState(courses ? courses : []);
    const [listStudents, setListStudents] = useState(students ? students : []);
    const [listClassrooms, setlistClassrooms] = useState([]);


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
                id: "",
                course_id: "",
                classroom_id: "",
                student_id: "",
                observation: "",
                status: 0,
            }));
            setShowToast(flash.message ? true : false);
        }
        setListCourses(courses)
        setListStudents(students)

        return () => (mounted = false);
    }, [flash, courses, students]);

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

                    <Col md={2}>
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


                    <Col md={2}>
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
                                disabled={listClassrooms.length > 0 ? null : 'disabled'}
                            >
                                <option value="">Select a classroom</option>
                                {listClassrooms.map(classroom => (
                                    <option key={classroom.id} value={classroom.id}>{classroom.title}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.classroom_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                    <Col md={3}>
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


                    <Col md={5}>
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
