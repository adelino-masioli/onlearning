import React from "react";

import Template from "../../../../components/Template";
import FormData from "../Partials/form";

export default function Show({ teacher }) {
    return (
        <>
            <Template title="Editing my profile" subtitle="Teacher">
                <FormData data={teacher} />
            </Template>
        </>
    );
}
