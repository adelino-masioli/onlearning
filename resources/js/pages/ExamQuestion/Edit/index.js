import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ exam_question, exam }) {
    function handleSubmit(values) {
        Inertia.post(
            route("teacher-course-lesson-exam-question-update"),
            values
        );
    }

    return (
        <>
            <Template
                title={`Editing question <strong>${exam_question.question}</strong>`}
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
                        "teacher-course-lesson-question-exam",
                        exam.uuid
                    )}
                />

                <FormData
                    data={exam_question}
                    exam={exam}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
