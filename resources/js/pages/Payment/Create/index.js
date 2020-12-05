import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import FormDataPayment from "../Partials/FormPayment";
import Link from "../../../components/Link";



export default function Create({ courses, classrooms, students }) {
    function handleSubmit(values) {
        Inertia.post(route("payments-store"), values);
    }
    return (
        <>
            <Template title="Create new payment" subtitle="Teacher">
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to payments"
                    placement="bottom"
                    tootip="Back to payments"
                    text="Back to payments"
                    icon={<FiChevronLeft />}
                    url={route("payments")}
                />
                <FormDataPayment courses={courses} classrooms={classrooms} students={students} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
