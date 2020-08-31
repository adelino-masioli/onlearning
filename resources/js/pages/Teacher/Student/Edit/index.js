import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../../components/Template";
import Link from "../../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ student }) {
    function handleSubmit(values) {
        Inertia.put(route("teacher-student-update"), values);
    }
    return (
        <>
            <Template
                title={`Editing student profile <strong>${student.name}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to students"
                    placement="bottom"
                    tootip="Back to students"
                    text="Back to students"
                    icon={<FiChevronLeft />}
                    url={route("teacher-student")}
                />

                <FormData data={student} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
