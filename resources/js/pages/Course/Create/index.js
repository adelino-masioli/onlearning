import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Template from "../../../components/Template";
import FormData from "../Partials/form";

export default function Create() {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-store"), values);
    }
    return (
        <>
            <Template title="Create new course" subtitle="Teacher">
                <FormData handleForm={handleSubmit} />
            </Template>
        </>
    );
}
