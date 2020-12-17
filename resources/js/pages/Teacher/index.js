import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {
    FiUsers,
    FiFileText,
    FiBookOpen,
    FiDownload,
    FiBookmark,
    FiFilter,
    FiFrown,
    FiSearch
} from "react-icons/fi";

import Template from "../../components/Template";
import DashboardCard from "../../components/DashboardCard";
import Link from "../../components/Link";
import Confirm from "../../components/Confirm";

export default function Teacher({ courses, classrooms, materials, students, last_students, leads, last_leads, bookings }) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    const handleConfirm = (status, value) => {
        setShow(status);
        setUser(value);
    };
    const handleStatus = value => {
        Inertia.post(route("leads-update-status"), value);
    };
    return (
        <>
            <Template title="My dashboard" subtitle="Teacher">

                <ul className="row dashboard-content">
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiFileText size={40} className="text-secondary" />}
                            title="Courses"
                            url={route("courses")}
                            total={courses.length}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiBookOpen size={40} className="text-danger" />}
                            title="Classrooms"
                            url={route("classrooms")}
                            total={classrooms.length}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiDownload size={40} className="text-dark" />}
                            title="Materials"
                            url={route("materials")}
                            total={materials.length}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiUsers size={40} className="text-primary" />}
                            title="Students"
                            url={route("teacher-student")}
                            total={students.length}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiFilter size={40} className="text-warning" />}
                            title="Leads"
                            url={route("leads")}
                            total={leads.length}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiBookmark size={40} className="text-success" />}
                            title="Bookings"
                            url={route("bookings")}
                            total={bookings.length}
                            variant="light"
                        />
                    </li>

                </ul>

                <Card className="card-table-dashboard">
                    <Card.Header><FiUsers size={20} className="text-dark" /> LAST STUDENTS</Card.Header>
                    <Card.Body>
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
                                {last_students.length == 0 && (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center text-muted"
                                        >
                                            <FiFrown size={20} /> No records found
                                </td>
                                    </tr>
                                )}
                                {last_students.map(student => (
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
                                            <Link
                                                tootip={`View ${student.name}`}
                                                placement="top"
                                                icon={<FiSearch />}
                                                text="View"
                                                url={route("teacher-student-edit", {
                                                    uuid: student.uuid
                                                })}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>


                <Card className="card-table-dashboard mt-4">
                    <Card.Header><FiFilter size={20} className="text-dark" /> LAST LEADS</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive="md" size="md">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center text-uppercase" style={{ width: "30%" }}>
                                        Student
                            </th>
                                    <th className="text-center text-uppercase" style={{ width: "25%" }}>
                                        Course
                            </th>
                                    <th className="text-center text-uppercase">
                                        Level
                            </th>
                                    <th className="text-center text-uppercase">
                                        Created at
                            </th>
                                    <th className="text-center text-uppercase">
                                        Status
                            </th>
                                </tr>
                            </thead>
                            <tbody>
                                {last_leads.length == 0 && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center text-muted"
                                        >
                                            <FiFrown size={20} /> No records found
                                </td>
                                    </tr>
                                )}
                                {last_leads.map(register => (
                                    <tr key={register.id} id={register.id}>
                                        <td className="text-center">{register.id}</td>
                                        <td>{register.student.name}</td>
                                        <td>{register.course.title}</td>
                                        <td>{register.student.level}</td>
                                        <td>{register.date}</td>


                                        <td className="text-center">
                                            <ButtonGroup size="sm" className="table-btn-group">
                                                <Button onClick={() => handleConfirm(true, { id: register.id, status: 0, redirect: 'teacher' })} className={`btn-table radius-left ${register.status == 0 ? "btn-dark" : "btn-secondary"} `}>Open</Button>
                                                <Button onClick={() => handleConfirm(true, { id: register.id, status: 1, redirect: 'teacher' })} className={`btn-table ${register.status == 1 ? "btn-secondary active" : "btn-secondary"} `}>Contacted</Button>
                                                <Button onClick={() => handleConfirm(true, { id: register.id, status: 2, redirect: 'teacher' })} className={`btn-table ${register.status == 2 ? "btn-primary" : "btn-secondary"} `}>Working</Button>
                                                <Button onClick={() => handleConfirm(true, { id: register.id, status: 3, redirect: 'teacher' })} className={`btn-table ${register.status == 3 ? "btn-success" : "btn-secondary"} `}>Converted</Button>
                                                <Button onClick={() => handleConfirm(true, { id: register.id, status: 4, redirect: 'teacher' })} className={`btn-table radius-right ${register.status == 4 ? "btn-danger" : "btn-secondary"} `}>Canceled</Button>
                                            </ButtonGroup>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {show && (
                            <Confirm
                                header="Confirmatiom"
                                text="Are you sure you want to update status this lead?"
                                label="Confirm"
                                showConfirm={show}
                                handleConfirm={handleConfirm}
                                handleFunction={handleStatus}
                                value={user}
                            />
                        )}
                    </Card.Body>
                </Card>

            </Template>
        </>
    );
}
