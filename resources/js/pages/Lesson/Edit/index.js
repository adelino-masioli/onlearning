import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiPlus, FiBookOpen } from "react-icons/fi";

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
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Create new course"
                    placement="bottom"
                    tootip="Create new course"
                    text="Create new course"
                    icon={<FiPlus />}
                    url={route("teacher-course-create")}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4"
                    tootip="Create new lesson"
                    placement="bottom"
                    tootip="Create new lesson"
                    text="Create new lesson"
                    icon={<FiBookOpen />}
                    url={route("teacher-course-create")}
                />
                <FormData datas={course} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
