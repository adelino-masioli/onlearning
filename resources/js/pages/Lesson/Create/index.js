import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Template from "../../../components/Template";
import FormData from "../Partials/form";

export default function Create({ course }) {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-lesson-store"), values);
    }
    return (
        <>
            <Template
                title={`Create new lesson <strong>${course.title}</strong>`}
                subtitle="Teacher"
            >
                <FormData course={course} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
