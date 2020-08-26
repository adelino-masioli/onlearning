import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";

import { ToastContainer, toast } from "react-toastify";

export default function ToastMessage({ showToast }) {
    const { flash } = usePage();
    const customId = "custom-id-yes";

    if (showToast == true) {
        toast.success(flash.message, {
            toastId: customId
        });
    }

    return <>{showToast && <ToastContainer role="alert" />}</>;
}
