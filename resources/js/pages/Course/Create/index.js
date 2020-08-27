import React from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

import Template from "../../../components/Template";
import FormData from "../Partials/form";

export default function Create() {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
        }
    };
    function handleSubmit(values) {
        axios.post(route("teacher-course-store"), values, config);
    }
    return (
        <>
            <Template title="Create new course" subtitle="Teacher">
                <FormData handleForm={handleSubmit} />
            </Template>
        </>
    );
}
