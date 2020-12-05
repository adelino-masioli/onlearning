import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiPlus, FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormDataPayment from "../Partials/FormPayment";

export default function Edit({ payment, courses, classrooms, students }) {
    function handleSubmit(values) {
        Inertia.post(route("payments-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing payment <strong>${payment.student.name}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to payments"
                    placement="bottom"
                    tootip="Back to payments"
                    text="Back to payments"
                    icon={<FiChevronLeft />}
                    url={route("payments")}
                />
                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4 mr-2"
                    tootip="Create new payment"
                    placement="bottom"
                    tootip="Create new payment"
                    text="Create new payment"
                    icon={<FiPlus />}
                    url={route("payments-create")}
                />
                <FormDataPayment data={payment} courses={courses} classrooms={classrooms} students={students} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
