import React from "react";


import { FiChevronLeft } from "react-icons/fi";

import Template from "../../../components/Template";
import Link from "../../../components/Link";
import Iframe from "../../../components/Iframe";


export default function Edit({ classroom }) {

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

                <Iframe url={`https://meet.jit.si/${classroom.meet}`} allow="camera; microphone; fullscreen; display-capture" />
            </Template>
        </>
    );
}
