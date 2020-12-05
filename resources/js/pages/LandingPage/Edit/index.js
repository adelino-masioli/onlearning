import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { FiPlus, FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import FormData from "../Partials/FormLandingPage";

export default function Edit({ landing, themes }) {
    function handleSubmit(values) {
        Inertia.post(route("landing-pages-update"), values);
    }

    return (
        <>
            <Template
                title={`Editing landing page <strong>${landing.register.title}</strong>`}
                subtitle="Teacher"
            >
                <Link
                    classAtrributes="btn btn-secondary btn-new  mb-4 mr-2"
                    tootip="Back to landing pages"
                    placement="bottom"
                    tootip="Back to landing pages"
                    text="Back to landing pages"
                    icon={<FiChevronLeft />}
                    url={route("landing-pages")}
                />

                <Link
                    classAtrributes="btn btn-primary btn-new  mb-4 mr-2"
                    tootip="Create new landing page"
                    placement="bottom"
                    tootip="Create new landing page"
                    text="Create new landing page"
                    icon={<FiPlus />}
                    url={route("landing-pages-create")}
                />

                <FormData datas={landing} themes={themes} handleForm={handleSubmit} />
            </Template>
        </>
    );
}
