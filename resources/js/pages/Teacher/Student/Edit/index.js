import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Template from "../../../../components/Template";
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
                <FormData data={student} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
