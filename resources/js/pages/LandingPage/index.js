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
import { Col } from "react-bootstrap";

export default function LandingPage({ landing_pages }) {
    const [listRegisters, setListRegisters] = useState(landing_pages);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);

    const handleConfirm = (status, value) => {
        setShow(status);
        setUser(value);
    };
    const handleInactive = value => {
        const data = { id: value.id };
        Inertia.post(route("landing-pages-update-status"), data);
    };

    const handleShowMainPage = (status, value) => {
        const data = { id: value.id };
        Inertia.post(route("landing-pages-update-display"), data);
    };

    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = landing_pages.filter(function (item) {
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
        setListRegisters(landing_pages);
    }, [landing_pages]);

    return (
        <>
            <Template title="My landing pages" subtitle="Teacher">
                <div className="highlight">
                    <ul className="row">
                        <Col>
                            <Link
                                classAtrributes="btn btn-secondary btn-new  mb-4"
                                tootip="Create new landing pages"
                                placement="bottom"
                                tootip="Create new landing pages"
                                text="Create new landing pages"
                                icon={<FiPlus />}
                                url={route("landing-pages-create")}
                            />
                        </Col>
                        <h1 className="col-md-12">List of landing pages</h1>
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
                            <th className="text-center text-uppercase" style={{ width: "40%" }}>
                                Landing page
                            </th>
                            <th className="text-center text-uppercase">
                                Tags
                            </th>
                            <th className="text-center text-uppercase">
                                Created At
                            </th>
                            <th className="text-center text-uppercase">
                                Display on main website?
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
                                    colSpan="7"
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
                                <td>{register.tags}</td>
                                <td>{register.date}</td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={
                                            register.default == 0
                                                ? "link btn btn-table btn-danger"
                                                : "link btn btn-table btn-success"
                                        }
                                        tootip={
                                            register.default == 0
                                                ? `Show on landing page ${register.title}`
                                                : `Hide on landing page ${register.title}`
                                        }
                                        placement="top"
                                        icon={register.default == 0 ? "No" : "Yes"}
                                        value={register}
                                        handleFunction={handleShowMainPage}
                                    />
                                </td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={
                                            register.status == 0
                                                ? "btn btn-table btn-secondary mr-3"
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
                                                url={route("landing-pages-edit", {
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
                        text="Are you sure you want to update status this landing page?"
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
