import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

import { FiFrown, FiPlus, FiChevronLeft, FiBookOpen } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import { Col } from "react-bootstrap";

export default function classroom({ classrooms }) {
    const [listRegisters, setListRegisters] = useState(classrooms);

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = classrooms.filter(function (item) {
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
        setListRegisters(classrooms);
    }, [classrooms]);

    return (
        <>
            <Template
                title={`Course classrooms <strong>classrooms</strong>`}
                subtitle="Teacher"
            >
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                                tootip="List all courses"
                                placement="bottom"
                                tootip="List all courses"
                                text="List all courses"
                                icon={<FiChevronLeft />}
                                url={route("courses")}
                            />
                            <Link
                                classAtrributes="btn btn-primary btn-new  mb-4"
                                tootip="Create new classroom"
                                placement="bottom"
                                tootip="Create new classroom"
                                text="Create new classroom"
                                icon={<FiPlus />}
                                url={route("classrooms-create")}
                            />
                        </Col>
                        <h1 className="col-md-12">List of classrooms</h1>
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
                                Classroom
                            </th>
                            <th className="text-center text-uppercase">
                                Course
                            </th>
                            <th className="text-center text-uppercase">
                                Level
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
                                <td>{register.course.title}</td>
                                <td>{register.course.level}</td>
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
                                        text="Edit classroom"
                                        icon={<FiBookOpen />}
                                        url={route(
                                            "classrooms-edit",
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
