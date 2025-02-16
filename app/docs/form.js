"use client";

import { useState } from "react";
import NavigationBar from "../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import HowToPurchase from "../components/docs/purchasingGuide/how-to-purchase";
import ConnectingToTheSocketlinkServers from "../components/docs/gettingStarted/connecting-to-the-socketlink-servers";
import RoomTypes from "../components/docs/rooms/room-types";
import Introduction from "../components/docs/overview/introduction";
import ClientEndpoints from "../components/docs/apiReference/client-endpoints";
import AdminEndpoints from "../components/docs/apiReference/admin-endpoints";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");

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
            case "Introduction":
                return <Introduction />;
            case "How to Purchase":
                return <HowToPurchase />;
            case "Connecting to the Socketlink servers":
                return <ConnectingToTheSocketlinkServers />;
            case "Room Types":
                return <RoomTypes />;
            case "features":
                return <Features />;
            case "Client Endpoints":
                return <ClientEndpoints />;
            case "Admin Endpoints":
                return <AdminEndpoints />;
            case "faq":
                return <FAQ />;
            default:
                return <Introduction />;
        }
    };

    return (
        <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className={`w-64 bg-[#1a1a1a] p-10 pt-32 transition-transform ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} md:translate-x-0 fixed md:relative h-full shadow-md overflow-y-auto`}>
                <nav>
                    <ul className="space-y-5">
                        {[
                            {
                                id: "overview",
                                title: "Overview",
                                subcategories: ["Introduction", "Features", "Benefits"]
                            },
                            {
                                id: "purchasing-guide",
                                title: "Purchasing Guide",
                                subcategories: ["How to Purchase", "Payment Options", "Refund Policy"]
                            },
                            {
                                id: "getting-started",
                                title: "Getting Started",
                                subcategories: ["Connecting to the Socketlink servers", "Subscribing to a room", "Sending Messages", "Receiving Messages"]
                            },
                            {
                                id: "rooms",
                                title: "Rooms",
                                subcategories: ["Room Types", "Public Rooms", "Private Rooms", "State Rooms", "Cache Rooms"]
                            },
                            {
                                id: "api",
                                title: "API Reference",
                                subcategories: ["Client Endpoints", "Admin Endpoints"]
                            },
                            {
                                id: "faq",
                                title: "FAQ",
                                subcategories: ["General Questions", "Technical Questions", "Billing Questions"]
                            }
                        ].map((item, index) => (
                            <li key={item.id}>
                                <div className="mb-2 text-gray-300 font-bold">
                                    {item.title}
                                </div>
                                <ul className="pl-4 space-y-2 text-sm">
                                    {item.subcategories.map((sub) => (
                                        <li
                                            key={sub}
                                            className={`cursor-pointer ${activeSection === sub ? "text-white font-bold" : "text-gray-500 hover:text-gray-300"}`}
                                            onClick={() => setActiveSection(sub)}
                                        >
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                                {index !== 5 && <hr className="border-gray-700 my-4" />}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Sidebar Toggle Button (Mobile) */}
            <button
                className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1.5 rounded-full shadow-md md:hidden transition-all opacity-70 hover:opacity-100 z-50 ${isSidebarOpen ? "left-[17rem]" : "left-4"
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
