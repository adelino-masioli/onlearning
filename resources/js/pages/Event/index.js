import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy";

export default function Event() {
    return (
        <>
            <h1>Index</h1>
            <InertiaLink href={route("home")}>Home</InertiaLink>
            <InertiaLink href={route("show", { id: 2 })}>About</InertiaLink>
        </>
    );
}
