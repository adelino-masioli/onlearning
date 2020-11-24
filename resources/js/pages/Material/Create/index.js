import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Create({ classroom }) {
    function handleSubmit(values) {
        Inertia.post(route("materials-store"), values);
    }
    return (
        <>
            <Template
                title={`Create new material <strong>${classroom.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to materials"
                    placement="bottom"
                    tootip="Back to materials"
                    text="Back to materials"
                    icon={<FiChevronLeft />}
                    url={route(
                        "materials",
                        classroom.uuid
                    )}
                />
                <FormData classroom={classroom} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
