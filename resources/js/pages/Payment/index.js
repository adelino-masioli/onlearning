import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";


import { FiFrown, FiPlus, FiEdit2, FiCopy } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import ToastMessage from "../../components/ToastMessage";
import Confirm from "../../components/Confirm";



export default function Payment({ payments }) {
    const { flash } = usePage();
    const [listRegisters, setlistRegisters] = useState(payments);
    const [showToast, setShowToast] = useState(false);

    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);



    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = payments.filter(function (item) {
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


    const handleConfirm = (status, value) => {
        setShow(status);
        setUser(value);
    };
    const handleDuplicate = value => {
        const data = { id: value.id };
        Inertia.post(route("payments-duplicate"), data);
    };




    useEffect(() => {
        setlistRegisters(payments);
        setShowToast(flash.message ? true : false);
    }, [payments, flash]);


    return (
        <>
            <ToastMessage showToast={showToast} />
            <Template title="My payments" subtitle="Teacher">

                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-primary btn-new  mb-4"
                                tootip="Create new payment"
                                placement="bottom"
                                tootip="Create new payment"
                                text="Create new payment"
                                icon={<FiPlus />}
                                url={route("payments-create")}
                            />
                        </Col>
                        <h1 className="col-md-12">List of payments</h1>
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
                            <th className="text-center" style={{ width: "3%" }}>
                                #
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
                                style={{ width: "10%" }}
                            >
                                Method
                            </th>

                            <th
                                className="text-center text-uppercase"
                                style={{ width: "8%" }}
                            >
                                Price
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "8%" }}
                            >
                                Date
                            </th>
                            <th
                                className="text-center text-uppercase"
                                style={{ width: "10%" }}
                            >
                                Next
                            </th>
                            <th className="text-center text-uppercase">
                                Status
                            </th>

                            <th className="text-center text-uppercase" >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRegisters.length == 0 && (
                            <tr>
                                <td
                                    colSpan="10"
                                    className="text-center text-muted"
                                >
                                    <FiFrown size={20} /> No records found
                                </td>
                            </tr>
                        )}
                        {listRegisters.map(register => (
                            <tr key={register.id} id={register.id}>
                                <td className="text-center">{register.id}</td>
                                <td>{register.student_name}</td>
                                <td>{register.course_name}</td>
                                <td>{register.classroom_name}</td>
                                <td>{register.payment}</td>
                                <td className="text-right">{register.price}</td>
                                <td>{register.date}</td>
                                <td>{register.next_date}</td>
                                <td className="text-center">
                                    {register.status == "Waiting" ? (
                                        <Badge pill variant="secondary">Waiting</Badge>
                                    ) : (
                                            <Badge pill variant="success">
                                                Paid
                                            </Badge>
                                        )}
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes="link badge badge-pill badge-danger mr-2"
                                        tootip={`Copy ${register.student_name}`}
                                        placement="top"
                                        text=""
                                        icon={<FiCopy />}
                                        value={register}
                                        handleFunction={handleConfirm}
                                    />

                                    <Link
                                        classAtrributes="link badge badge-pill badge-success"
                                        tootip={`Edit ${register.student_name}`}
                                        placement="top"
                                        text=""
                                        icon={<FiEdit2 />}
                                        url={route(
                                            "payments-edit",
                                            register.uuid
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {show && (
                    <Confirm
                        header="Confirmatiom"
                        text="Are you sure you want to duplicate this register?"
                        label="Confirm"
                        showConfirm={show}
                        handleConfirm={handleConfirm}
                        handleFunction={handleDuplicate}
                        value={user}
                    />
                )}

            </Template>
        </>
    );
}
