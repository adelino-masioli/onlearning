import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import {
    FiUser,
    FiLogOut,
    FiMenu,
    FiHome,
    FiFileText,
    FiUsers,
    FiBookOpen,
    FiCommand,
    FiDownload,
    FiList,
    FiDollarSign,
    FiBookmark,
    FiColumns
} from "react-icons/fi";

import TitlePage from "../../components/TitlePage";
import SidebarMenu from "../../components/SidebarMenu";

import logo from "../../assets/top-bar-logo.png";

export default function Template(props) {
    const { auth } = usePage();
    const { id, name, email, profile } = auth.user;

    return (
        <Container fluid className="template">
            <Row>
                <div className="sidebar">
                    <section className="sidebar-header">
                        <Row>
                            <Col md={9}>
                                <Image src={logo} fluid />
                            </Col>
                            <Col md={3}>
                                <FiMenu size={20} />
                            </Col>
                        </Row>
                    </section>

                    <section className="sidebar-content">
                        <Row>
                            <Col md={12}>
                                <ul>
                                    <SidebarMenu
                                        text="Home"
                                        url="home"
                                        icon={<FiHome size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Courses"
                                        url="courses"
                                        icon={<FiFileText size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Classrooms"
                                        url="classrooms"
                                        icon={<FiBookOpen size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Materials"
                                        url="materials"
                                        icon={<FiDownload size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Exams"
                                        url="exams"
                                        icon={<FiList size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Students"
                                        url="teacher-student"
                                        icon={<FiUsers size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Bookings"
                                        url="bookings"
                                        icon={<FiBookmark size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Payments"
                                        url="payments"
                                        icon={<FiDollarSign size="20" />}
                                    />
                                    <SidebarMenu
                                        text="Landing Pages"
                                        url="landing-pages"
                                        icon={<FiColumns size="20" />}
                                    />
                                    <SidebarMenu
                                        text="My profile"
                                        url="teacher-profile"
                                        icon={<FiUser size="20" />}
                                    />
                                    {/* <SidebarMenu
                                        text="Settings"
                                        url="home"
                                        icon={<FiCommand size="20" />}
                                    /> */}
                                </ul>
                            </Col>
                        </Row>
                    </section>
                </div>
                <div className="content">
                    <Container fluid>
                        <Navbar>
                            <Nav className="mr-auto">
                                <TitlePage
                                    title={props.title}
                                    subtitle={props.subtitle}
                                />
                            </Nav>

                            <Nav>
                                <InertiaLink
                                    href={route("teacher-profile")}
                                    className="nav-link"
                                >
                                    <FiUser /> {name}
                                </InertiaLink>

                                <a href="/logout" className="nav-link">
                                    <FiLogOut /> Logout
                                </a>
                            </Nav>
                        </Navbar>
                    </Container>

                    <Container fluid>
                        <Col>{props.children}</Col>
                    </Container>
                </div>
            </Row>
        </Container>
    );
}
