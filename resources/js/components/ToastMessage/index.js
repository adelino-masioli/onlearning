import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";

import { ToastContainer, toast } from "react-toastify";

export default function ToastMessage({ showToast }) {
    const { flash } = usePage();

    {
        showToast && toast.success(flash.message);
    }

    return <>{showToast && <ToastContainer role="alert" />}</>;
}
