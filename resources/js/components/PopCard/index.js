import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { FiEdit2 } from "react-icons/fi";

export default function PopCard({
    title,
    description,
    cover,
    url,
    status,
    variant
}) {
    return (
        <>
            <InertiaLink href={url}>
                <Card>
                    <div className="image">
                        <Card.Img variant="top" src={cover} />
                    </div>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        <FiEdit2 /> Edit course
                        <Badge variant={variant} className="float-right mt-1">
                            {status}
                        </Badge>
                    </Card.Body>
                </Card>
            </InertiaLink>
        </>
    );
}
