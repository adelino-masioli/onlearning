import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Create({ question }) {
    function handleSubmit(values) {
        Inertia.post(
            route("teacher-course-lesson-exam-question-answer-store"),
            values
        );
    }
    return (
        <>
            <Template
                title={`Create new answer <strong>${question.question}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to answers"
                    placement="bottom"
                    tootip="Back to answers"
                    text="Back to answers"
                    icon={<FiChevronLeft />}
                    url={route(
                        "teacher-course-lesson-question-exam-answer",
                        question.uuid
                    )}
                />
                <FormData question={question} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
