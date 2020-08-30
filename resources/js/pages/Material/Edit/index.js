import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft, FiBookOpen } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ material }) {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-lesson-material-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing course <strong>${material.lesson.title}</strong>`}
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
                        "teacher-course-lesson-material",
                        material.lesson.uuid
                    )}
                />

                <FormData
                    data={material}
                    lesson={material.lesson}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
