import React from "react";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function SidebarMenu(props) {
    return (
        <li>
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-2">{props.text}</Tooltip>}
            >
                <a href="/">
                    {props.icon} {props.text}
                </a>
            </OverlayTrigger>
        </li>
    );
}
