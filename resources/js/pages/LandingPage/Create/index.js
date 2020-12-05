import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Template from "../../../components/Template";
import FormData from "../Partials/FormLandingPage";

export default function Create({ themes }) {
    function handleSubmit(values) {
        Inertia.post(route("landing-pages-store"), values);
    }
    return (
        <>
            <Template title="Create new landing page" subtitle="Teacher">
                <FormData themes={themes} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
