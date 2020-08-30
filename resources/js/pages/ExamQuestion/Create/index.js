import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Create({ exam }) {
    function handleSubmit(values) {
        Inertia.post(
            route("teacher-course-lesson-exam-question-store"),
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
                    tootip="Back to exams"
                    placement="bottom"
                    tootip="Back to exams"
                    text="Back to exams"
                    icon={<FiChevronLeft />}
                    url={route(
                        "teacher-course-lesson-question-exam",
                        exam.lesson.uuid
                    )}
                />
                <FormData exam={exam} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
