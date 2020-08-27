import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Template from "../../../components/Template";
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
                <FormData datas={course} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
