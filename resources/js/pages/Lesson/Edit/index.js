import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft, FiPlus } from "react-icons/fi";

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
                    tootip="Back to lesson"
                    placement="bottom"
                    tootip="Back to lesson"
                    text="Back to lesson"
                    icon={<FiChevronLeft />}
                    url={route("teacher-course-lesson", lesson.course.uuid)}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4 mr-2"
                    tootip="Add new material"
                    placement="bottom"
                    tootip="Add new material"
                    text="Add new material"
                    icon={<FiPlus />}
                    url={route(
                        "teacher-course-lesson-material-create",
                        lesson.uuid
                    )}
                />

                <Link
                    classAtrributes="btn btn-warning btn-new  mb-4"
                    tootip="Create new test"
                    placement="bottom"
                    tootip="Create new test"
                    text="Create new test"
                    icon={<FiPlus />}
                    url={route(
                        "teacher-course-lesson-exam-create",
                        lesson.uuid
                    )}
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
