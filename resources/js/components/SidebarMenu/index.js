import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function SidebarMenu(props) {
    return (
        <li>
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-2">{props.text}</Tooltip>}
            >
                <InertiaLink href={route(props.url)}>
                    {props.icon} {props.text}
                </InertiaLink>
            </OverlayTrigger>
        </li>
    );
}
