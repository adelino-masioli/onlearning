import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Create() {
    function handleSubmit(values) {
        Inertia.post(route("exams-store"), values);
    }
    return (
        <>
            <Template
                title={`Create new exam`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to exams"
                    placement="bottom"
                    tootip="Back to exams"
                    text="Back to exams"
                    icon={<FiChevronLeft />}
                    url={route("exams")}
                />
                <FormData handleForm={handleSubmit} />
            </Template>
        </>
    );
}
