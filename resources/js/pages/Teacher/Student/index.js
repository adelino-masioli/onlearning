import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import { FiThumbsDown, FiThumbsUp, FiXCircle, FiEdit2 } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import Confirm from "../../../components/Confirm";

export default function Student({ students }) {
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

    return (
        <>
            <Template title="My students" subtitle="Teacher">
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
                        {students.map(student => (
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
                                    {student.status == 0 ? (
                                        <span className="mr-3 text-muted">
                                            <FiXCircle />
                                        </span>
                                    ) : (
                                        <Link
                                            classAtrributes="mr-3"
                                            tootip={`Edit ${student.name}`}
                                            placement="top"
                                            icon={<FiEdit2 />}
                                            url={route(
                                                "teacher-student-create"
                                            )}
                                        />
                                    )}

                                    <Link
                                        classAtrributes={
                                            student.status == 1
                                                ? "text-danger link"
                                                : "text-success link"
                                        }
                                        tootip={
                                            student.status == 0
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
