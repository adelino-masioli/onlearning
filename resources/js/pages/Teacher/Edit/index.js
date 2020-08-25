import React from "react";

import Template from "../../../components/Template";
import FormData from "../Partials/form";

export default function Show({ teacher }) {
    return (
        <>
            <Template>
                <FormData data={teacher} />
            </Template>
        </>
    );
}
