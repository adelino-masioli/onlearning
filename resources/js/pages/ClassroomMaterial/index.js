import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

import { FiFrown, FiChevronLeft } from "react-icons/fi";

import Template from "../../components/Template";
import Link from "../../components/Link";
import Search from "../../components/Search";
import ToastMessage from "../../components/ToastMessage";

export default function ClassroomMaterial({ materials, classroom }) {
    const { flash } = usePage();
    const [listRegisters, setListRegisters] = useState(materials);
    const [showToast, setShowToast] = useState(false);

    function handleSubmit(status, values) {
        Inertia.post(route("classroom-materials-store"), values);
    }


    function handleFilter(search) {
        const excludeColumns = ["id"];
        const lowercasedValue = search.toLowerCase().trim();
        const results = materials.filter(function (item) {
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
        setListRegisters(materials);
        setShowToast(flash.message ? true : false);
    }, [materials, flash]);


    return (
        <>
            <ToastMessage showToast={showToast} />
            <Template title="My classroom materials" subtitle="Teacher">
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4"
                    tootip="List all classrooms"
                    placement="bottom"
                    tootip="List all classrooms"
                    text="List all classrooms"
                    icon={<FiChevronLeft />}
                    url={route("classrooms")}
                />

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
                                style={{ width: "45%" }}
                            >
                                Description
                            </th>

                            <th className="text-center text-uppercase" style={{ width: "40%" }}>
                                Link
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
                                    colSpan="5"
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
                                <td>{register.link}</td>
                                <td className="text-center">
                                    <Link
                                        classAtrributes={
                                            register.status == 0
                                                ? "btn btn-table btn-secondary mr-3"
                                                : "btn btn-table btn-success mr-3"
                                        }
                                        tootip={
                                            register.status == 0
                                                ? `Add ${register.title}`
                                                : `Remove ${register.title}`
                                        }
                                        placement="top"
                                        icon={
                                            register.status == 0
                                                ? "Add"
                                                : "Remove"
                                        }
                                        value={{ classroom: classroom, material: register }}
                                        handleFunction={handleSubmit}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Template>
        </>
    );
}
