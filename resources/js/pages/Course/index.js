import React, { useState, useEffect } from "react";
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
    FiPlus,
    FiSmile
} from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Confirm from "../../components/Confirm";
import Search from "../../components/Search";
import PopCard from "../../components/PopCard";
import { Col } from "react-bootstrap";

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
        Inertia.post(route("teacher-course-update-status"), data);
    };

    const handleShowLandingPage = (status, value) => {
        const data = { id: value.id };
        Inertia.post(route("teacher-course-update-show"), data);
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

    useEffect(() => {
        setListRegisters(courses);
    }, [courses]);

    return (
        <>
            <Template title="My courses" subtitle="Teacher">
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-secondary btn-new  mb-4"
                                tootip="Create new course"
                                placement="bottom"
                                tootip="Create new course"
                                text="Create new course"
                                icon={<FiPlus />}
                                url={route("teacher-course-create")}
                            />
                        </Col>
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
                                Course
                            </th>
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
                                Show on landing page?
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
                                <td>{register.level}</td>
                                <td>{register.date}</td>
                                <td className="text-center">{register.id}</td>
                                <td className="text-center">{register.id}</td>
                                <td className="text-center">
                                    {register.show == 0 ? (
                                        <Badge variant="danger">No</Badge>
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
                                    {register.status == 0 ? (
                                        <span className="mr-3 text-muted">
                                            <FiXCircle />
                                        </span>
                                    ) : (
                                        <Link
                                            classAtrributes="mr-3"
                                            tootip={`Edit ${register.title}`}
                                            placement="top"
                                            icon={<FiEdit2 />}
                                            url={route("teacher-student-edit", {
                                                uuid: register.uuid
                                            })}
                                        />
                                    )}

                                    <Link
                                        classAtrributes={
                                            register.status == 0
                                                ? "text-danger link mr-3"
                                                : "text-success link mr-3"
                                        }
                                        tootip={
                                            register.status == 0
                                                ? `Enable ${register.title}`
                                                : `Disable ${register.title}`
                                        }
                                        placement="top"
                                        icon={
                                            register.status == 0 ? (
                                                <FiThumbsDown />
                                            ) : (
                                                <FiThumbsUp />
                                            )
                                        }
                                        value={register}
                                        handleFunction={handleConfirm}
                                    />

                                    <Link
                                        classAtrributes={
                                            register.show == 0
                                                ? "text-danger link"
                                                : "text-success link"
                                        }
                                        tootip={
                                            register.show == 0
                                                ? `Show on landing page ${register.title}`
                                                : `Hide on landing page ${register.title}`
                                        }
                                        placement="top"
                                        icon={
                                            register.show == 0 ? (
                                                <FiFrown />
                                            ) : (
                                                <FiSmile />
                                            )
                                        }
                                        value={register}
                                        handleFunction={handleShowLandingPage}
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
