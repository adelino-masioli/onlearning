import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ material }) {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-classroom-material-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing course <strong>${material.classroom.title}</strong>`}
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
                        "teacher-course-classroom-material",
                        material.classroom.uuid
                    )}
                />

                <FormData
                    data={material}
                    classroom={material.classroom}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
