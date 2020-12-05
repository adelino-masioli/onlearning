import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";


import { FiFrown, FiChevronLeft, FiPlus } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import ToastMessage from "../../components/ToastMessage";
import Confirm from "../../components/Confirm";

import FormData from "./partials/Form";

export default function Booking({ courses, classrooms, students, bookings }) {
    const { flash } = usePage();
    const [listRegisters, setlistRegisters] = useState(bookings);
    const [showToast, setShowToast] = useState(false);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    const handleSubmit = value => {
        Inertia.post(route("bookings-store"), value);
    };

    const handleConfirm = (status, value) => {
        setShow(status);
        setUser(value);
    };
    const handleInactive = value => {
        const data = { id: value.id };
        Inertia.post(route("bookings-update-status"), data);
    };

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = bookings.filter(function (item) {
            return Object.keys(item).some(key =>
                excludeColumns.includes(key)
                    ? false
                    : item[key]
                        .toString()
                        .toLowerCase()
                        .includes(lowercasedValue)
            );
        });
        setlistRegisters(results);
    }



    useEffect(() => {
        setlistRegisters(bookings);
        setShowToast(flash.message ? true : false);
    }, [bookings, flash]);


    return (
        <>
            <ToastMessage showToast={showToast} />
            <Template title="My bookings" subtitle="Teacher">

                <Card bg="light" className="mb-4">
                    <Card.Body>
                        <FormData courses={courses} classrooms={classrooms} students={students} handleForm={handleSubmit} />
                    </Card.Body>
                </Card>

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
                            <th className="text-center" style={{ width: "3%" }}>
                                #
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "29%" }}
                            >
                                Course
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "20%" }}
                            >
                                Classroom
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "20%" }}
                            >
                                Student
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "20%" }}
                            >
                                Observation
                            </th>

                            <th className="text-center text-uppercase">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRegisters.length == 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-muted"
                                >
                                    <FiFrown size={20} /> No records found
                                </td>
                            </tr>
                        )}
                        {listRegisters.map(register => (
                            <tr key={register.id} id={register.id}>
                                <td className="text-center">{register.id}</td>
                                <td>{register.course.title}</td>
                                <td>{register.classroom.title}</td>
                                <td>{register.student.name}</td>
                                <td>{register.observation}</td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={
                                            register.status == 0
                                                ? "btn btn-table btn-secondary mr-3"
                                                : "btn btn-table btn-success mr-3"
                                        }
                                        tootip={
                                            register.status == 0
                                                ? `Inactive ${register.student.name}`
                                                : `Active ${register.student.name}`
                                        }
                                        placement="top"
                                        icon={
                                            register.status == 0
                                                ? "Inactive"
                                                : "Active"
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
                        text="Are you sure you want to update status this booking?"
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
