import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft, FiBookOpen } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ lesson }) {
    function handleSubmit(values) {
        Inertia.post(route("teacher-course-lesson-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing course <strong>${lesson.course.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to class"
                    placement="bottom"
                    tootip="Back to class"
                    text="Back to class"
                    icon={<FiChevronLeft />}
                    url={route("teacher-course-lesson", lesson.course.uuid)}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4"
                    tootip="Add materials"
                    placement="bottom"
                    tootip="Add materials"
                    text="Add materials"
                    icon={<FiBookOpen />}
                    url={route("teacher-course-create")}
                />
                <FormData
                    data={lesson}
                    course={lesson.course}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
