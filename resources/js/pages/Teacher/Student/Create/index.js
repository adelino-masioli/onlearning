import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../../components/Template";
import Link from "../../../../components/Link";
import FormData from "../Partials/form";

export default function Create() {
    function handleSubmit(values) {
        Inertia.post(route("teacher-student-store"), values);
    }
    return (
        <>
            <Template title="Create new student" subtitle="Teacher">
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to students"
                    placement="bottom"
                    tootip="Back to students"
                    text="Back to students"
                    icon={<FiChevronLeft />}
                    url={route("teacher-student")}
                />

                <FormData handleForm={handleSubmit} />
            </Template>
        </>
    );
}
