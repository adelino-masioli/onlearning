import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { FiEdit2 } from "react-icons/fi";
import Link from "../Link";

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
            <Card>
                <Card.Img variant="top" src={cover} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Link
                        tootip="Edit course"
                        placement="top"
                        tootip="Edit course"
                        text="Edit course"
                        icon={<FiEdit2 />}
                        url={url}
                    />
                    <Badge variant={variant} className="float-right mt-1">
                        {status}
                    </Badge>
                </Card.Body>
            </Card>
        </>
    );
}
