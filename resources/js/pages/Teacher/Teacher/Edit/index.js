import React from "react";

import Template from "../../../../components/Template";
import FormDatas from "../Partials/form";

export default function Show({ teacher }) {
    return (
        <>
            <Template title="Editing my profile" subtitle="Teacher">
                <FormDatas datas={teacher} />
            </Template>
        </>
    );
}
