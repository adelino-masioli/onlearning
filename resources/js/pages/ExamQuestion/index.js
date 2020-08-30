import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

import { FiFrown, FiPlus, FiChevronLeft, FiLink2 } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import { Col } from "react-bootstrap";

export default function ExamQuestion({ questions, exam }) {
    const [listRegisters, setListRegisters] = useState(questions);

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = questions.filter(function(item) {
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
        setListRegisters(questions);
    }, [questions]);

    return (
        <>
            <Template
                title={`Exame questions  <strong>${exam.title}</strong>`}
                subtitle="Teacher"
            >
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                                tootip="List all exams"
                                placement="bottom"
                                tootip="List all exams"
                                text="List all exams"
                                icon={<FiChevronLeft />}
                                url={route(
                                    "teacher-course-lesson-exam",
                                    exam.lesson.uuid
                                )}
                            />
                            <Link
                                classAtrributes="btn btn-primary btn-new  mb-4"
                                tootip="Create new question"
                                placement="bottom"
                                tootip="Create new question"
                                text="Create new question"
                                icon={<FiPlus />}
                                url={route(
                                    "teacher-course-lesson-exam-question-create",
                                    exam.uuid
                                )}
                            />
                        </Col>
                        <h1 className="col-md-12">List of exam questions</h1>
                    </ul>
                </div>

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
                            <th className="text-center">#</th>
                            <th className="text-center text-uppercase">
                                Question
                            </th>
                            <th className="text-center text-uppercase">Exam</th>

                            <th className="text-center text-uppercase">
                                Created At
                            </th>
                            <th className="text-center text-uppercase">Time</th>
                            <th className="text-center text-uppercase">
                                Status
                            </th>
                            <th className="text-center text-uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRegisters.length == 0 && (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center text-muted"
                                >
                                    <FiFrown size={20} /> No records found
                                </td>
                            </tr>
                        )}
                        {listRegisters.map(register => (
                            <tr key={register.id} id={register.id}>
                                <td className="text-center">{register.id}</td>
                                <td>{register.question}</td>
                                <td>{register.exam.title}</td>
                                <td>{register.date}</td>
                                <td className="text-center">{register.time}</td>
                                <td className="text-center">
                                    {register.status == 0 ? (
                                        <Badge variant="secondary">Draft</Badge>
                                    ) : (
                                        <Badge variant="success">
                                            Published
                                        </Badge>
                                    )}
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes="text-success link"
                                        tootip={`Edit ${register.question}`}
                                        placement="top"
                                        text="Edit exam"
                                        icon={<FiLink2 />}
                                        url={route(
                                            "teacher-course-lesson-exam-question-edit",
                                            register.uuid
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Template>
        </>
    );
}
