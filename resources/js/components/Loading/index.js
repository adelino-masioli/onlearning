import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { VscLoading } from "react-icons/vsc";

export default function ToastMessage({ message, show, flash, errors }) {
    return (
        <>
            {show && flash === false && Object.keys(errors).length < 1 && (
                <Row className="loading-component">
                    <Col>
                        <VscLoading size={30} /> {message}
                    </Col>
                </Row>
            )}
        </>
    );
}
