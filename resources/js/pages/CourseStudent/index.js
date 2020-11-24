import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

import { FiFrown, FiChevronLeft } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import ToastMessage from "../../components/ToastMessage";

export default function CourseStudent({ course, students, classrooms }) {
    const { flash } = usePage();
    const [listRegisters, setListRegisters] = useState(students);
    const [showToast, setShowToast] = useState(false);

    function handleSubmit(values) {
        Inertia.post(route("teacher-course-student-store"), values);
    }

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = students.filter(function (item) {
            return Object.keys(item).some(key =>
                excludeColumns.includes(key)
                    ? false
                    : item[key]
                        .toString()
                        .toLowerCase()
                        .includes(lowercasedValue)
            );
        });
        setListRegisters(results);
    }

    function handleIsBooked(register) {
        const classroom = classrooms.map(classroom => {
            const studentBooked = classroom.students.map(student => {
                /*if (student.pivot.student_id == register.id) {
                    return student.pivot.student_id == register.id
                        ? "Booked"
                        : "No booked";
                }*/
                return student.pivot.student_id;
            });
            if (studentBooked == register.id) {
                return "Booked";
            } else {
                return "No booked";
            }
            //return studentBooked;
        });
        console.log(register);
        return classroom;
    }

    useEffect(() => {
        setListRegisters(students);
        setShowToast(flash.message ? true : false);
    }, [students, flash]);

    //console.log(classrooms[0].students);

    return (
        <>
            <ToastMessage showToast={showToast} />
            <Template title="My courses" subtitle="Teacher">
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4"
                    tootip="List all courses"
                    placement="bottom"
                    tootip="List all courses"
                    text="List all courses"
                    icon={<FiChevronLeft />}
                    url={route("courses")}
                />

                <Search
                    placeholder="Enter your search to filter"
                    handleFunction={handleFilter}
                />

                {listRegisters && (
                    <Row>
                        <p className="col mt-2 text-center text-muted">
                            Showing <strong>{listRegisters.length}</strong> of
                            total <strong>{listRegisters.length}</strong>{" "}
                            record(s)
                        </p>
                    </Row>
                )}

                <Table striped bordered hover responsive="md" size="md">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "3%" }}>
                                #
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "25%" }}
                            >
                                Student
                            </th>

                            <th className="text-center text-uppercase">
                                Classrooms
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRegisters.length == 0 && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center text-muted"
                                >
                                    <FiFrown size={20} /> No records found
                                </td>
                            </tr>
                        )}
                        {listRegisters.map(register => (
                            <tr key={register.id} id={register.id}>
                                <td className="text-center">{register.id}</td>
                                <td>{register.name}</td>

                                <td className="text-center">
                                    {classrooms.map(classroom => (
                                        <Link
                                            key={classroom.id}
                                            classAtrributes={`mr-3 btn btn-table btn-success`}
                                            tootip={`Add new students to ${classroom.title}`}
                                            placement="top"
                                            text={handleIsBooked(register.id)}
                                            handleFunction={() =>
                                                handleSubmit({
                                                    course: course.uuid,
                                                    student: register.uuid,
                                                    classroom: classroom.uuid
                                                })
                                            }
                                        />
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Template>
        </>
    );
}
