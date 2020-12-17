import React from "react";
import {
    FiUsers,
    FiLogOut,
    FiMenu,
    FiHome,
    FiFileText,
    FiBookOpen,
    FiCommand,
    FiDownload,
    FiList,
    FiDollarSign,
    FiBookmark,
    FiColumns,
    FiFilter
} from "react-icons/fi";

import Template from "../../components/Template";
import DashboardCard from "../../components/DashboardCard";

export default function Teacher() {
    return (
        <>
            <Template title="My dashboard" subtitle="Teacher">

                <ul className="row dashboard-content">
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiFileText size={40} className="text-secondary" />}
                            title="Courses"
                            url={route("courses")}
                            total={100}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiBookOpen size={40} className="text-danger" />}
                            title="Classrooms"
                            url={route("courses")}
                            total={100}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiDownload size={40} className="text-dark" />}
                            title="Materials"
                            url={route("courses")}
                            total={100}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiUsers size={40} className="text-primary" />}
                            title="Students"
                            url={route("courses")}
                            total={100}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiFilter size={40} className="text-warning" />}
                            title="Leads"
                            url={route("courses")}
                            total={100}
                            variant="light"
                        />
                    </li>
                    <li className="col-xs-12 col-md-2 mb-4">
                        <DashboardCard
                            icon={<FiBookmark size={40} className="text-success" />}
                            title="Bookings"
                            url={route("courses")}
                            total={100}
                            variant="light"
                        />
                    </li>

                </ul>

            </Template>
        </>
    );
}
