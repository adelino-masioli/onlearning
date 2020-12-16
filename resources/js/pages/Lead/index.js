import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
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
import { Col } from "react-bootstrap";

export default function Lead({ leads }) {
    const [listRegisters, setListRegisters] = useState(leads);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    const handleConfirm = (status, value) => {
        setShow(status);
        setUser(value);
    };
    const handleStatus = value => {
        Inertia.post(route("leads-update-status"), value);
    };


    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = leads.filter(function (item) {
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
        setListRegisters(leads);
    }, [leads]);

    return (
        <>
            <Template title="My landing pages" subtitle="Teacher">
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-secondary btn-new  mb-4"
                                tootip="List all students"
                                placement="bottom"
                                tootip="List all students"
                                text="List all students"
                                icon={<FiPlus />}
                                url={route("teacher-student")}
                            />
                        </Col>
                        <h1 className="col-md-12">List of leads</h1>
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
                                <td>{register.student.name}</td>
                                <td>{register.course.title}</td>
                                <td>{register.student.level}</td>
                                <td>{register.date}</td>


                                <td className="text-center">
                                    <ButtonGroup size="sm" className="table-btn-group">
                                        <Button onClick={() => handleConfirm(true, { id: register.id, status: 0 })} className={`btn-table radius-left ${register.status == 0 ? "btn-dark" : "btn-secondary"} `}>Open</Button>
                                        <Button onClick={() => handleConfirm(true, { id: register.id, status: 1 })} className={`btn-table ${register.status == 1 ? "btn-secondary active" : "btn-secondary"} `}>Contacted</Button>
                                        <Button onClick={() => handleConfirm(true, { id: register.id, status: 2 })} className={`btn-table ${register.status == 2 ? "btn-primary" : "btn-secondary"} `}>Working</Button>
                                        <Button onClick={() => handleConfirm(true, { id: register.id, status: 3 })} className={`btn-table ${register.status == 3 ? "btn-success" : "btn-secondary"} `}>Converted</Button>
                                        <Button onClick={() => handleConfirm(true, { id: register.id, status: 4 })} className={`btn-table radius-right ${register.status == 4 ? "btn-danger" : "btn-secondary"} `}>Canceled</Button>
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
            </Template>
        </>
    );
}
