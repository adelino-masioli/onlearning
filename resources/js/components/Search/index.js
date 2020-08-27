import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { FiSearch } from "react-icons/fi";

export default function Search({ placeholder, handleFunction }) {
    const [search, setSearch] = useState("");

    function handleChange(e) {
        const value = e.target.value;
        setSearch(value);
    }

    const handleFilter = e => {
        e.preventDefault();
        handleFunction(search);
    };
    return (
        <>
            <Card className="mb-2 filter">
                <Card.Body>
                    <Card.Title>Filter</Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleFilter}>
                            <Row>
                                <InputGroup>
                                    <Form.Control
                                        placeholder={placeholder}
                                        aria-label={placeholder}
                                        aria-describedby="search"
                                        value={search}
                                        onChange={handleChange}
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant="secondary"
                                            className="btn-md"
                                            type="submit"
                                        >
                                            <FiSearch /> Search
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    );
}
