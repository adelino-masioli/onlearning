import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

import { FiFrown, FiPlus, FiLink2, FiList } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import { Col } from "react-bootstrap";

export default function Exame({ exams }) {
    const [listRegisters, setListRegisters] = useState(exams);

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = exams.filter(function (item) {
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
        setListRegisters(exams);
    }, [exams]);

    return (
        <>
            <Template
                title={`Exams</strong>`}
                subtitle="Teacher"
            >
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-primary btn-new  mb-4"
                                tootip="Create new exam"
                                placement="bottom"
                                tootip="Create new exam"
                                text="Create new exam"
                                icon={<FiPlus />}
                                url={route("exams-create")}
                            />
                        </Col>
                        <h1 className="col-md-12">List of exams</h1>
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
                                Material
                            </th>
                            <th className="text-center text-uppercase">
                                Teacher
                            </th>
                            <th className="text-center text-uppercase">
                                Average
                            </th>
                            <th className="text-center text-uppercase">
                                Questions
                            </th>
                            <th className="text-center text-uppercase">
                                Created At
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
                                <td>{register.title}</td>
                                <td>{register.teacher.name}</td>
                                <td className="text-center">{register.average}</td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={register.questions.length == 0 ? "text-secondary link mr-1" : "text-success link mr-1"}
                                        tootip={`Questions of ${register.title}`}
                                        placement="top"
                                        text="Questions"
                                        icon={<FiList />}
                                        url={route(
                                            "questions",
                                            register.uuid
                                        )}
                                    />
                                    {register.questions.length == 0 ? (
                                        <Badge pill variant="secondary">{register.questions.length}</Badge>
                                    ) : (
                                            <Badge pill variant="success">
                                                {register.questions.length}
                                            </Badge>
                                        )}

                                </td>
                                <td>{register.date}</td>
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
                                        tootip={`Edit ${register.title}`}
                                        placement="top"
                                        text="Edit exam"
                                        icon={<FiLink2 />}
                                        url={route(
                                            "exams-edit",
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
