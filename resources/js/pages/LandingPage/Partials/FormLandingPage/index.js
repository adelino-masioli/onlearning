import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { usePage } from "@inertiajs/inertia-react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { FiUploadCloud } from "react-icons/fi";

import ToastMessage from "../../../../components/ToastMessage";
import Loading from "../../../../components/Loading";

export default function FormLandingPage({ datas, themes, handleForm }) {
    const { errors, flash, csrf_token } = usePage();
    const formRef = useRef();

    const [values, setValues] = useState({
        id: datas ? datas.register.id : "",
        template_id: datas ? datas.register.template_id : "",
        title: datas ? datas.register.title : "",
        tags: datas ? datas.register.tags : "",
        description: datas ? datas.register.description : "",
        hero: datas ? datas.register.hero : "",
        slug: datas ? datas.register.slug : "",
        image: datas ? datas.cover.cover : "",
        video: datas ? datas.register.video : "",
        default: datas ? datas.register.default : 0,
        status: datas ? datas.register.status : 0,
        template_id: datas && datas.register.template_id ? datas.register.template_id : "",
    });
    const [isSwitchOn, setIsSwitchOn] = useState(
        datas && datas.status != 0 ? true : false
    );
    const [isSwitchOnMainPage, setisSwitchOnMainPage] = useState(
        datas && datas.show != 0 ? true : false
    );
    const [showToast, setShowToast] = useState(false);
    const [showMainPage, setshowMainPage] = useState(false);

    const [listThemes, setListThemes] = useState(themes ? themes : []);

    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileUrl, setSelectedFileUrl] = useState();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFile(file);
        setSelectedFileUrl(fileUrl);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        setShowToast(false);
    }

    function handleSelectTheme(value) {
        setValues((values) => ({
            ...values,
            template_id: value,
        }));
    }


    function handleSubmit(e) {
        e.preventDefault();

        setShowToast(false);

        const data = new FormData();
        data.append("id", values.id || "");
        data.append("title", values.title || "");
        data.append("tags", values.tags || "");
        data.append("description", values.description || "");
        data.append("hero", values.hero || "");
        data.append("slug", values.slug || "");
        data.append("video", values.video || "");
        data.append("template_id", values.template_id || "");
        data.append("default", values.default || 0);
        data.append("status", values.status || 0);
        data.append("_token", csrf_token.token);

        if (selectedFile) {
            data.append("image", selectedFile);
        }
        handleForm(data);

        setshowMainPage(true);
    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const onSwitchMainPageAction = () => {
        setisSwitchOnMainPage(!isSwitchOnMainPage);
    };

    useEffect(() => {
        setValues((values) => ({
            ...values,
            status: isSwitchOn,
            show: isSwitchOnMainPage,
        }));
        setShowToast(flash.message ? true : false);
        setshowMainPage(Object.keys(flash).length ? false : true);

        setListThemes(themes)
    }, [isSwitchOn, isSwitchOnMainPage, flash, themes]);


    return (
        <>
            <Loading
                message="Loading"
                show={showMainPage}
                flash={showToast}
                errors={errors}
            />
            <ToastMessage showToast={showToast} />

            <Form onSubmit={handleSubmit} noValidate ref={formRef}>
                <Form.Control
                    type="hidden"
                    value={values.id}
                    onChange={handleChange}
                    isInvalid={!!errors.id}
                />

                <Form.Row>
                    <Col md={5}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={values.title}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={7}>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags - [separate with a comma(tag one, tag two, ...)]</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Tags"
                                value={values.tags}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.tags}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tags}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                </Form.Row>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Description"
                        value={values.description}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col sm={5}>
                        <Form.Group controlId="hero">
                            <Form.Label>Hero</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Hero"
                                value={values.hero}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.hero}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.hero}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={7}>
                        <Form.Group controlId="video">
                            <Form.Label>Video - [URL from YouTube]</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="video - [URL from YouTube]"
                                value={values.video}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.video}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.video}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Form.Row>



                <Form.Group controlId="image">
                    <Form.Label>Cover</Form.Label>

                    <div {...getRootProps()} className="dropzone">
                        <Form.Control
                            {...getInputProps()}
                            accept="image/*"
                            name="image"
                            required
                            isInvalid={!!errors.image}
                        />
                        {selectedFileUrl || (datas && datas.cover != null) ? (
                            selectedFileUrl ? (
                                <img
                                    src={selectedFileUrl}
                                    alt="Selected file"
                                />
                            ) : (
                                    <img src={datas.cover} alt="Selected file" />
                                )
                        ) : (
                                <p>
                                    <FiUploadCloud size={30} />
                                    <br></br>
                                Drag 'n' drop a file here, or click to
                                select a file
                                </p>
                            )}
                    </div>

                    <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.image}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                    <Col className="col-md-3">
                        <Form.Group controlId="status">
                            <Form.Check
                                custom
                                type="switch"
                                checked={isSwitchOn}
                                onChange={onSwitchAction}
                                label="Is it published?"
                            />
                        </Form.Group>
                    </Col>
                    <Form.Group controlId="show">
                        <Form.Check
                            custom
                            type="switch"
                            checked={isSwitchOnMainPage}
                            onChange={onSwitchMainPageAction}
                            label="Display on main website?"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Col className="col-md-12">
                        <Form.Group controlId="template_id">
                            <Form.Label>Select a theme</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Select a theme"
                                value={values.template_id}
                                onChange={handleChange}
                                required
                                isInvalid={!!errors.template_id}
                                className="d-none"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.template_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {listThemes.map(theme => (
                        <Col className="col-md-2" key={theme.id}>
                            <Image src={`/uploads/landingpages/themes/${theme.thumbnail}`} rounded className={`img-fluid thumb-theme ${values.template_id == theme.id ? "thumb-theme-active" : null}`} onClick={() => handleSelectTheme(theme.id)} />
                        </Col>
                    ))}
                </Form.Row>


                <br />
                <Button
                    className="mt-3"
                    size="lg"
                    variant="success"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}
