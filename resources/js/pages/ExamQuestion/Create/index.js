import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Create({ exam }) {
    function handleSubmit(values) {
        Inertia.post(
            route("teacher-course-classroom-exam-question-store"),
            values
        );
    }
    return (
        <>
            <Template
                title={`Create new question <strong>${exam.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to questions"
                    placement="bottom"
                    tootip="Back to questions"
                    text="Back to questions"
                    icon={<FiChevronLeft />}
                    url={route(
                        "teacher-course-classroom-exam-question",
                        exam.uuid
                    )}
                />
                <FormData exam={exam} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
