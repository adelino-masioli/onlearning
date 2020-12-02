import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft, FiDownload, FiList, FiUsers } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/form";

export default function Edit({ classroom, courses }) {
    function handleSubmit(values) {
        Inertia.post(route("classrooms-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing classroom <strong>${classroom.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to classrooms"
                    placement="bottom"
                    tootip="Back to classrooms"
                    text="Back to classrooms"
                    icon={<FiChevronLeft />}
                    url={route("classrooms")}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4 mr-2"
                    tootip="Add new material"
                    placement="bottom"
                    tootip="Add new material"
                    text="Add new material"
                    icon={<FiDownload />}
                    url={route(
                        "materials-create",
                        classroom.uuid
                    )}
                />

                <Link
                    classAtrributes="btn btn-warning btn-new  mb-4 mr-2"
                    tootip="Create new exam"
                    placement="bottom"
                    tootip="Create new exam"
                    text="Create new exam"
                    icon={<FiList />}
                    url={route(
                        "exams-create",
                        classroom.uuid
                    )}
                />

                <Link
                    classAtrributes="btn btn-success btn-new  mb-4"
                    tootip="Students"
                    placement="bottom"
                    tootip="Students"
                    text="Students"
                    icon={<FiUsers />}
                    url={route(
                        "classroom-students",
                        classroom.uuid
                    )}
                />
                <FormData
                    data={classroom}
                    courses={courses}
                    course={classroom.course}
                    handleForm={handleSubmit}
                />
            </Template>
        </>
    );
}
