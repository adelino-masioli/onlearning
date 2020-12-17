import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function DashboardCard({
    icon,
    title,
    url,
    total,
    variant
}) {
    return (
        <>
            <InertiaLink href={url}>
                <Card >
                    <div className="icon">
                        {icon}
                    </div>
                    <Card.Body>
                        <Badge variant={variant}>
                            {title}
                        </Badge>
                        <Card.Title>{total}</Card.Title>
                    </Card.Body>
                </Card>
            </InertiaLink>
        </>
    );
}
