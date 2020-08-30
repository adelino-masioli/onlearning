import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ exam }) {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-lesson-exam-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing exam <strong>${exam.lesson.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to exams"
                    placement="bottom"
                    tootip="Back to exams"
                    text="Back to exams"
                    icon={<FiChevronLeft />}
                    url={route("teacher-course-lesson-exam", exam.lesson.uuid)}
                />

                <FormData
                    data={exam}
                    lesson={exam.lesson}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
