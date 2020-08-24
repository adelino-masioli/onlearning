import React from "react";

export default function TitlePage(props) {
    return (
        <h1 className="title-page">
            {props.title} <small>{props.subtitle}</small>
        </h1>
    );
}
