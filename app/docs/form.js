"use client";

import { useState } from "react";
import NavigationBar from "../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from "next/image";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");

    // Individual layouts for each section
    const Overview = () => (
        <section id="overview" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Overview</h2>
            <p className="text-gray-400 mb-6">
                <strong>Welcome to the documentation for <em>socketlink.io</em>!</strong> <br /><br />
                This guide will help you understand the core concepts, features, and how to integrate real-time communication into your applications using our platform.
                <br /><br />
                🚀 <strong>What is socketlink.io?</strong><br /><br />
                <em>socketlink.io</em> is a powerful real-time communication platform built for developers. It offers fast, scalable, and secure WebSocket connections, enabling instant messaging, live updates, and interactive experiences.
                <br /><br />
                📚 <strong>What You Will Find Here :</strong><br /><br />
                - <strong>Getting Started :</strong> Learn how to set up a WebSocket server and connect clients.<br />
                - <strong>Features :</strong> Explore advanced functionalities like rooms, event broadcasting, and presence tracking.<br />
                - <strong>API Reference :</strong> Get detailed information on WebSocket events and message formats.<br />
                - <strong>FAQ :</strong> Find solutions to common issues and best practices.<br /><br />
                💡 <strong>Who Should Read This?</strong><br /><br />
                - Developers building real-time applications (e.g., chat apps, live dashboards, multiplayer games).<br />
                - Teams integrating WebSockets into existing platforms.<br />
                - Anyone exploring socketlink.io’s capabilities.
            </p>
        </section>
    );

    const PurchasingGuide = () => (
        <section id="getting-started" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Purchasing Guide</h2>
            <div className="space-y-8">
                <p className="text-gray-400">
                    <b>Step 1 :</b> Go to our{" "}
                    <a
                        href="/pricing"
                        className="text-blue-400 hover:underline"
                    >
                        Pricing
                    </a>{" "}
                    page and select the plan suitable for your requirement.
                </p>

                <Image
                    src="/images/pricing.png"
                    alt="Pricing Page Preview"
                    width={800}
                    height={400}
                    className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
                />

                <p className="text-gray-400">
                    <b>Step 2 :</b> You will be asked to choose the region in which you want to setup your plan, It is advised to choose the region closest to your users for low latency.
                </p>

                <Image
                    src="/images/choose-plan-region.png"
                    alt="Choose Plan Region Preview"
                    width={800}
                    height={400}
                    className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
                />

                <p className="text-gray-400">
                    <b>Step 3 :</b> After choosing the suitable plan and upon completion of the payment,
                    you will be automatically redirected to the{" "}
                    <a
                        href="/my-plans"
                        className="text-blue-400 hover:underline"
                    >
                        My Plans
                    </a>{" "}
                    page, where you will be able to see the plan that you have chosen.
                </p>

                <Image
                    src="/images/my-plans.png"
                    alt="Pricing Page Preview"
                    width={800}
                    height={400}
                    className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
                />

                <p className="text-gray-400">
                    <b>Step 4 :</b> It will take a few minutes to get your plan ready and as soon as it will become ready the <b>Account Status</b> will become <b>Active</b>.
                </p>
            </div>
        </section>
    );

    const Features = () => (
        <section id="features" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Features</h2>
            <p className="text-gray-400 mb-6">
                Explore the various features and functionalities available in our application:<br /><br />
                - Real-time Messaging<br />
                - Private Rooms and Group Chats<br />
                - Typing Indicators and Presence Tracking<br />
                - Secure WebSocket Connections<br />
                - Event Broadcasting
            </p>
        </section>
    );

    const APIReference = () => (
        <section id="api" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">API Reference</h2>
            <p className="text-gray-400 mb-6">
                Detailed documentation on how to use our API endpoints effectively.<br /><br />
                <strong>WebSocket Events:</strong><br />
                - <code>connect</code>: Triggered when a client connects.<br />
                - <code>message</code>: Triggered when a message is sent.<br />
                - <code>disconnect</code>: Triggered when a client disconnects.<br /><br />
                <strong>Message Format:</strong><br />
                <code>{"{ event: 'message', data: 'Hello, world!' }"}</code>
            </p>
        </section>
    );

    const FAQ = () => (
        <section id="faq" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">FAQ</h2>
            <p className="text-gray-400 mb-6">
                Find answers to the most commonly asked questions about our platform.<br /><br />
                <strong>Q: What is socketlink.io?</strong><br />
                A: A real-time WebSocket communication platform.<br /><br />
                <strong>Q: Is socketlink.io free to use?</strong><br />
                A: We offer a free tier with premium plans for additional features.<br /><br />
                <strong>Q: How can I report an issue?</strong><br />
                A: Contact our support team via the help center.
            </p>
        </section>
    );

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <Overview />;
            case "purchasing-guide":
                return <PurchasingGuide />;
            case "features":
                return <Features />;
            case "api":
                return <APIReference />;
            case "faq":
                return <FAQ />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className={`w-64 bg-[#1a1a1a] p-10 pt-32 transition-transform ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} md:translate-x-0 fixed md:relative h-full shadow-md`}>
                <nav>
                    <ul className="space-y-5">
                        {[
                            { id: "overview", title: "Overview" },
                            { id: "purchasing-guide", title: "Purchasing Guide" },
                            { id: "getting-started", title: "Getting Started" },
                            { id: "api", title: "API Reference" },
                            { id: "faq", title: "FAQ" },
                        ].map((item, index) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveSection(item.id)}
                                    className={`block w-full text-left text-gray-300 hover:text-white transition-colors ${activeSection === item.id ? "font-bold text-white" : ""
                                        }`}
                                >
                                    {item.title}
                                </button>
                                {index !== 4 && <hr className="border-gray-700 my-4" />}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Sidebar Toggle Button (Mobile) */}
            <button
                className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1.5 rounded-full shadow-md md:hidden transition-all opacity-70 hover:opacity-100 ${isSidebarOpen ? "left-[17rem]" : "left-4"
                    }`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>

            {/* Main Content Area */}
            <div className="flex flex-col flex-grow overflow-y-auto">
                <NavigationBar />
                <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                    <div className="max-w-3xl mx-auto">
                        {renderSection()}
                    </div>
                </main>
            </div>
        </div>
    );
}
