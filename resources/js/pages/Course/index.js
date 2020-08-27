import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

import {
    FiThumbsDown,
    FiThumbsUp,
    FiXCircle,
    FiEdit2,
    FiFrown,
    FiPlus
} from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Confirm from "../../components/Confirm";
import Search from "../../components/Search";
import PopCard from "../../components/PopCard";

export default function Course({ courses }) {
    const [listRegisters, setListRegisters] = useState(courses);
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
        const results = courses.filter(function(item) {
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

    return (
        <>
            <Template title="My courses" subtitle="Teacher">
                <div className="highlight">
                    <Link
                        classAtrributes="btn btn-secondary btn-new  mb-4"
                        tootip="Create new course"
                        placement="bottom"
                        tootip="Create new course"
                        text="Create new course"
                        icon={<FiPlus />}
                        url={route("teacher-course")}
                    />
                    <ul className="row">
                        <h1 className="col-md-12">Last edited courses</h1>
                        <li className="col-xs-12 col-md-3">
                            <PopCard
                                title="Card Title"
                                description="Some quick example text to build on the card title"
                                cover="https://plchldr.co/i/300x80?bg=36c6f4"
                                url={route("teacher-course")}
                                status="Draft"
                                variant="secondary"
                            />
                        </li>
                        <li className="col-xs-12 col-md-3">
                            <PopCard
                                title="Card Title"
                                description="Some quick example text to build on the card title"
                                cover="https://plchldr.co/i/300x80?bg=36c6f4"
                                url={route("teacher-course")}
                                status="Published"
                                variant="success"
                            />
                        </li>
                        <li className="col-xs-12 col-md-3">
                            <PopCard
                                title="Card Title"
                                description="Some quick example text to build on the card title"
                                cover="https://plchldr.co/i/300x80?bg=36c6f4"
                                url={route("teacher-course")}
                                status="Published"
                                variant="success"
                            />
                        </li>
                        <li className="col-xs-12 col-md-3">
                            <PopCard
                                title="Card Title"
                                description="Some quick example text to build on the card title"
                                cover="https://plchldr.co/i/300x80?bg=36c6f4"
                                url={route("teacher-course")}
                                status="Published"
                                variant="success"
                            />
                        </li>
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
                            <th className="text-center text-uppercase">Name</th>
                            <th className="text-center text-uppercase">
                                Level
                            </th>
                            <th className="text-center text-uppercase">
                                Created At
                            </th>
                            <th className="text-center text-uppercase">
                                Lessons
                            </th>
                            <th className="text-center text-uppercase">
                                Students
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
                                <td>{register.name}</td>
                                <td>{register.level}</td>
                                <td>{register.date}</td>
                                <td className="text-center">{register.id}</td>
                                <td className="text-center">{register.id}</td>
                                <td className="text-center">
                                    {register.status == 0 ? (
                                        <Badge variant="secondary">
                                            Published
                                        </Badge>
                                    ) : (
                                        <Badge variant="success">Draft</Badge>
                                    )}
                                </td>
                                <td className="text-center">
                                    {register.status == 0 ? (
                                        <span className="mr-3 text-muted">
                                            <FiXCircle />
                                        </span>
                                    ) : (
                                        <Link
                                            classAtrributes="mr-3"
                                            tootip={`Edit ${register.name}`}
                                            placement="top"
                                            icon={<FiEdit2 />}
                                            url={route("teacher-student-edit", {
                                                uuid: register.uuid
                                            })}
                                        />
                                    )}

                                    <Link
                                        classAtrributes={
                                            register.status == 1
                                                ? "text-danger link"
                                                : "text-success link"
                                        }
                                        tootip={
                                            register.status == 0
                                                ? `Enable ${register.name}`
                                                : `Disable ${register.name}`
                                        }
                                        placement="top"
                                        icon={
                                            register.status == 0 ? (
                                                <FiThumbsUp />
                                            ) : (
                                                <FiThumbsDown />
                                            )
                                        }
                                        value={register}
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
