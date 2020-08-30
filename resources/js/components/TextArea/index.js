import React, { useState } from "react";
import ReactQuill from "react-quill";
const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ]
    ]
};

export default function TextArea({ handleFunction, value, placeholder }) {
    const [text, setText] = useState(value ? value : "");

    const onChange = text => {
        setText(text);
        handleFunction(text);
    };

    return (
        <>
            <ReactQuill
                theme="snow"
                placeholder={placeholder}
                value={text}
                onChange={onChange}
                modules={modules}
            />
        </>
    );
}
