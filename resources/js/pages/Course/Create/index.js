import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Template from "../../../components/Template";
import FormData from "../Partials/FormCourse";

export default function Create() {
    function handleSubmit(values) {
        Inertia.post(route("courses-store"), values);
    }
    return (
        <>
            <Template title="Create new course" subtitle="Teacher">
                <FormData handleForm={handleSubmit} />
            </Template>
        </>
    );
}
