import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Confirm({
    header,
    text,
    label,
    handleFunction,
    showConfirm,
    handleConfirm,
    value
}) {
    const [show, setShow] = useState(showConfirm);
    const handleClose = () => {
        setShow(false);
        setTimeout(function() {
            handleConfirm(false, null);
        }, 1000);
    };
    const handleConfirmModal = value => {
        handleFunction(value);
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleConfirmModal(value);
                        }}
                    >
                        {label}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
