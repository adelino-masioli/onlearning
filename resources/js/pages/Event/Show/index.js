import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy";

export default function Show({ event }) {
    return (
        <>
            <h1>Show</h1>
            <InertiaLink href={route("home")}>Home</InertiaLink>
            <InertiaLink href={route("show", { id: 2 })}>
                About {event}
            </InertiaLink>
        </>
    );
}
