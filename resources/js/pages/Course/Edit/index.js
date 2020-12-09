import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiPlus, FiBookOpen } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/FormCourse";

export default function Edit({ course }) {
    function handleSubmit(values) {
        Inertia.post(route("courses-update"), values);
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
                    url={route("courses-create")}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4"
                    tootip="Create new classroom"
                    placement="bottom"
                    tootip="Create new classroom"
                    text="Create new classroom"
                    icon={<FiBookOpen />}
                    url={route("classrooms-create")}
                />
                <FormData data_res={course} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
