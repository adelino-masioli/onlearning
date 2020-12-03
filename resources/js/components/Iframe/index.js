import React, { useState } from "react";
import Card from "react-bootstrap/Card";

export default function Iframe({ url, allow }) {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Text>
                        <div className="iframe-responsive"><iframe allow={allow} src={url} ></iframe></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
