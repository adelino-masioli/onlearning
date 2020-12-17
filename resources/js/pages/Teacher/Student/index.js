import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

import {
    FiThumbsDown,
    FiThumbsUp,
    FiXCircle,
    FiEdit2,
    FiFrown,
    FiPlus
} from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import Confirm from "../../../components/Confirm";
import Search from "../../../components/Search";

export default function Student({ students }) {
    const [listRegisters, setListRegisters] = useState(students);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    const handleConfirm = (status, value) => {
        setShow(status);
        setUser(value);
    };
    const handleInactive = value => {
        const data = { id: value.id };
        Inertia.post(route("teacher-student-update-status"), data);
    };


    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = students.filter(function (item) {
            return item["name"]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue)
        });
        setListRegisters(results);
    }


    useEffect(() => {
        setListRegisters(students);
    }, [students]);




    return (
        <>
            <Template title="My students" subtitle="Teacher">
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-primary btn-new  mb-4"
                                tootip="Create new student"
                                placement="bottom"
                                tootip="Create new student"
                                text="Create new student"
                                icon={<FiPlus />}
                                url={route("teacher-student-create")}
                            />
                        </Col>
                        <h1 className="col-md-12">List of students</h1>
                    </ul>
                </div>

                <Search
                    placeholder="Enter a student name to filter"
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
                            <th className="text-center text-uppercase">Name</th>
                            <th className="text-center text-uppercase">
                                Email
                            </th>
                            <th className="text-center text-uppercase">
                                Phone
                            </th>
                            <th className="text-center text-uppercase">
                                Country
                            </th>
                            <th className="text-center text-uppercase">
                                Level
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
                        {listRegisters.map(student => (
                            <tr key={student.id} id={student.id}>
                                <td className="text-center">{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.country}</td>
                                <td>{student.level}</td>
                                <td className="text-center">
                                    {student.status == 0 ? (
                                        <Badge variant="secondary">
                                            Inactive
                                        </Badge>
                                    ) : (
                                            <Badge variant="success">Active</Badge>
                                        )}
                                </td>
                                <td className="text-center">
                                    {student.status == "Inactive" ? (
                                        <span className="mr-3 text-muted">
                                            <FiXCircle />
                                        </span>
                                    ) : (
                                            <Link
                                                classAtrributes="mr-3"
                                                tootip={`Edit ${student.name}`}
                                                placement="top"
                                                icon={<FiEdit2 />}
                                                url={route("teacher-student-edit", {
                                                    uuid: student.uuid
                                                })}
                                            />
                                        )}

                                    <Link
                                        classAtrributes={
                                            student.status == "Active"
                                                ? "text-danger link"
                                                : "text-success link"
                                        }
                                        tootip={
                                            student.status == "Inactive"
                                                ? `Enable ${student.name}`
                                                : `Disable ${student.name}`
                                        }
                                        placement="top"
                                        icon={
                                            student.status == 0 ? (
                                                <FiThumbsUp />
                                            ) : (
                                                    <FiThumbsDown />
                                                )
                                        }
                                        value={student}
                                        handleFunction={handleConfirm}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {show && (
                    <Confirm
                        header="Confirmatiom"
                        text="Are you sure you want to disable this user?"
                        label="Confirm"
                        showConfirm={show}
                        handleConfirm={handleConfirm}
                        handleFunction={handleInactive}
                        value={user}
                    />
                )}
            </Template>
        </>
    );
}
