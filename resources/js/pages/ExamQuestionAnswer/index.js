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

export default function ExamQuestionAnswer({ answers, question }) {
    const [listRegisters, setListRegisters] = useState(answers);

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = answers.filter(function (item) {
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
        setListRegisters(answers);
    }, [answers]);

    return (
        <>
            <Template
                title={`Question  answers <strong>${question.question}</strong>`}
                subtitle="Teacher"
            >
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                                tootip="List all questions"
                                placement="bottom"
                                tootip="List all questions"
                                text="List all questions"
                                icon={<FiChevronLeft />}
                                url={route(
                                    "questions",
                                    question.exam.uuid
                                )}
                            />
                            <Link
                                classAtrributes="btn btn-primary btn-new  mb-4"
                                tootip="Create new answer"
                                placement="bottom"
                                tootip="Create new answer"
                                text="Create new answer"
                                icon={<FiPlus />}
                                url={route(
                                    "answers-create",
                                    question.uuid
                                )}
                            />
                        </Col>
                        <h1 className="col-md-12">List of exam answers</h1>
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
                                Answer
                            </th>
                            <th className="text-center text-uppercase">
                                Question
                            </th>

                            <th className="text-center text-uppercase">
                                Created At
                            </th>
                            <th className="text-center text-uppercase">
                                Is correct?
                            </th>
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
                                <td>{register.answer}</td>
                                <td>{question.question}</td>
                                <td>{register.date}</td>
                                <td className="text-center">
                                    {register.is_correct == 0 ? (
                                        <Badge variant="secondary">No</Badge>
                                    ) : (
                                            <Badge variant="success">Yes</Badge>
                                        )}
                                </td>

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
                                        tootip={`Edit ${register.answer}`}
                                        placement="top"
                                        text="Edit answer"
                                        icon={<FiLink2 />}
                                        url={route(
                                            "answers-edit",
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
