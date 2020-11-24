import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../../components/Template";
import Link from "../../../../components/Link";
import FormData from "../Partials/form";

export default function Create({ course, courses }) {
    function handleSubmit(values) {
        Inertia.post(route("classrooms-store"), values);
    }
    return (
        <>
            <Template
                title={`Create new classroom <strong>${course.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to classrooms"
                    placement="bottom"
                    tootip="Back to classrooms"
                    text="Back to classrooms"
                    icon={<FiChevronLeft />}
                    url={route(
                        "classrooms-by-course",
                        course.uuid
                    )}
                />
                <FormData course={course} courses={courses} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
