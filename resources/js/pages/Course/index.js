import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

import {
    FiXCircle,
    FiEdit2,
    FiFrown,
    FiPlus,
    FiBookOpen,
    FiUsers
} from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Confirm from "../../components/Confirm";
import Search from "../../components/Search";
import PopCard from "../../components/PopCard";
import { Col } from "react-bootstrap";

export default function Course({ courses, highlights }) {
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

                        {highlights.map(highlight => (
                            <li
                                className="col-xs-12 col-md-3"
                                key={highlight.id}
                            >
                                <PopCard
                                    title={highlight.title}
                                    description={highlight.description}
                                    cover={highlight.cover}
                                    url={route("teacher-course-edit", {
                                        uuid: highlight.uuid
                                    })}
                                    status={
                                        highlight.status == 0
                                            ? "Draft"
                                            : "Published"
                                    }
                                    variant={
                                        highlight.status == 0
                                            ? "secondary"
                                            : "success"
                                    }
                                />
                            </li>
                        ))}
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
                                Classrooms
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
                                <td className="text-center">
                                    {register.classrooms.length}
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes="mr-3 btn btn-table btn-warning"
                                        tootip={`Add new students to ${register.title}`}
                                        placement="top"
                                        text={register.students.length}
                                        icon={<FiUsers />}
                                        url={route(
                                            "teacher-course-student",
                                            register.uuid
                                        )}
                                    />
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={
                                            register.show == 0
                                                ? "link btn btn-table btn-danger"
                                                : "link btn btn-table btn-success"
                                        }
                                        tootip={
                                            register.show == 0
                                                ? `Show on landing page ${register.title}`
                                                : `Hide on landing page ${register.title}`
                                        }
                                        placement="top"
                                        icon={register.show == 0 ? "No" : "Yes"}
                                        value={register}
                                        handleFunction={handleShowLandingPage}
                                    />
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={
                                            register.status == 0
                                                ? "btn btn-table btn-danger mr-3"
                                                : "btn btn-table btn-success mr-3"
                                        }
                                        tootip={
                                            register.status == 0
                                                ? `Enable ${register.title}`
                                                : `Disable ${register.title}`
                                        }
                                        placement="top"
                                        icon={
                                            register.status == 0
                                                ? "Draft"
                                                : "Published"
                                        }
                                        value={register}
                                        handleFunction={handleConfirm}
                                    />
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes="mr-3 btn btn-table btn-primary"
                                        tootip={`Classrooms of ${register.title}`}
                                        placement="top"
                                        text="Classrooms"
                                        icon={<FiBookOpen />}
                                        url={route(
                                            "teacher-course-classroom",
                                            register.uuid
                                        )}
                                    />

                                    {register.status == 0 ? (
                                        <span className="btn btn-table btn-light cursor-default">
                                            <FiXCircle /> Edit
                                        </span>
                                    ) : (
                                        <Link
                                            classAtrributes="btn btn-table btn-secondary"
                                            tootip={`Edit ${register.title}`}
                                            placement="top"
                                            text="Edit"
                                            icon={<FiEdit2 />}
                                            url={route("teacher-course-edit", {
                                                uuid: register.uuid
                                            })}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {show && (
                    <Confirm
                        header="Confirmatiom"
                        text="Are you sure you want to update status this course?"
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
