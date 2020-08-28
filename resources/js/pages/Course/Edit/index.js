import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiPlus } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ course }) {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing course <strong>${course.register.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4"
                    tootip="Create new lesson"
                    placement="bottom"
                    tootip="Create new lesson"
                    text="Create new lesson"
                    icon={<FiPlus />}
                    url={route("teacher-course-create")}
                />
                <FormData datas={course} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
