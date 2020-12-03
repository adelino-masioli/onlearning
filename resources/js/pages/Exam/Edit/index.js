import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft, FiPlus } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ exam }) {
    function handleSubmit(values) {
        Inertia.post(route("exams-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing exam <strong>${exam.title}</strong>`}
                subtitle={`Teacher <strong>${exam.teacher.name}</strong>`}
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to exams"
                    placement="bottom"
                    tootip="Back to exams"
                    text="Back to exams"
                    icon={<FiChevronLeft />}
                    url={route("exams")}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4 mr-2"
                    tootip="Add new question"
                    placement="bottom"
                    tootip="Add new question"
                    text="Add new question"
                    icon={<FiPlus />}
                    url={route(
                        "questions-create",
                        exam.uuid
                    )}
                />

                <FormData
                    data={exam}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
