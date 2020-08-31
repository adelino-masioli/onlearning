import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

import {
    FiFrown,
    FiUsers,
    FiChevronLeft,
    FiThumbsDow,
    FiThumbsUp
} from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";

export default function CourseStudent({ course, students, classrooms }) {
    const [listRegisters, setListRegisters] = useState(students);

    function handleSubmit(values) {
        Inertia.post(route("teacher-course-student-store"), values);
    }

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = students.filter(function(item) {
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

    useEffect(() => {
        setListRegisters(students);
    }, [students]);

    return (
        <>
            <Template title="My courses" subtitle="Teacher">
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4"
                    tootip="List all courses"
                    placement="bottom"
                    tootip="List all courses"
                    text="List all courses"
                    icon={<FiChevronLeft />}
                    url={route("teacher-course-create")}
                />
                <h1 className="col-md-12">List of students</h1>

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
                                            classAtrributes="mr-3 btn btn-table btn-secondary"
                                            tootip={`Add new students to ${classroom.title}`}
                                            placement="top"
                                            text="Booked"
                                            icon={<FiThumbsUp />}
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
