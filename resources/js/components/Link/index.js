import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function Link({
    icon,
    classAtrributes,
    text,
    tootip,
    placement,
    url,
    handleFunction,
    value
}) {
    const handleClick = (status, value) => {
        handleFunction(status, value);
    };
    return (
        <>
            <OverlayTrigger
                placement={placement}
                overlay={<Tooltip id="button-tooltip-2">{tootip}</Tooltip>}
            >
                {handleFunction ? (
                    <span
                        className={classAtrributes}
                        onClick={() => {
                            handleClick(true, value);
                        }}
                    >
                        {icon} {text}
                    </span>
                ) : (
                        <InertiaLink className={classAtrributes} href={url}>
                            {icon} {text}
                        </InertiaLink>
                    )}
            </OverlayTrigger>
        </>
    );
}
