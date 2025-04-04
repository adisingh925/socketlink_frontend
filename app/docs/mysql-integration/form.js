"use client";

import { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const router = useRouter();
    const sidebarRef = useRef(null);

    useEffect(() => {
        setActiveSection("MySQL");
        document.title = "Docs | MySQL";
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside ref={sidebarRef} className={`w-64 bg-gradient-to-b from-[#1a1a1a] to-[#252525] p-8 pt-24 transition-all duration-300 ease-in-out 
                  ${isSidebarOpen ? "translate-x-0 z-50 shadow-lg" : "-translate-x-64"} md:translate-x-0 fixed md:relative 
                  h-full shadow-md rounded-r-lg overflow-y-auto border-r border-gray-700`}>
                <nav>
                    <ul className="space-y-6">
                        {[
                            {
                                id: "overview",
                                title: "Overview",
                                subcategories: [
                                    { name: "Introduction", path: "/docs/introduction" },
                                    { name: "Features", path: "/docs/features" },
                                ]
                            },
                            {
                                id: "purchasing-guide",
                                title: "Purchasing Guide",
                                subcategories: [
                                    { name: "How to Purchase", path: "/docs/how-to-purchase" },
                                    { name: "Payment Options", path: "/docs/payment-options" },
                                    { name: "Refund Policy", path: "/docs/refund-policy" }
                                ]
                            },
                            {
                                id: "getting-started",
                                title: "Getting Started",
                                subcategories: [
                                    { name: "Connecting to the Socketlink servers", path: "/docs/connecting-to-the-socketlink-servers" },
                                    { name: "Sending Messages", path: "/docs/sending-messages" },
                                ]
                            },
                            {
                                id: "websocket-events",
                                title: "Websocket Events",
                                subcategories: [
                                    { name: "All Events", path: "/docs/all-events" },
                                ]
                            },
                            {
                                id: "configuration",
                                title: "Configuration",
                                subcategories: [
                                    { name: "Webhooks", path: "/docs/webhooks" },
                                    { name: "MySQL", path: "/docs/mysql-integration" },
                                ]
                            },
                            {
                                id: "rooms",
                                title: "Rooms",
                                subcategories: [
                                    { name: "Room Types", path: "/docs/room-types" },
                                ]
                            },
                            {
                                id: "api",
                                title: "API Reference",
                                subcategories: [
                                    { name: "Client Endpoints", path: "/docs/client-endpoints" },
                                    { name: "Admin Endpoints", path: "/docs/admin-endpoints" }
                                ]
                            },
                            {
                                id: "faq",
                                title: "FAQ",
                                subcategories: [
                                    { name: "General Questions", path: "/docs/general-questions" },
                                    { name: "Technical Questions", path: "/docs/technical-questions" },
                                    { name: "Billing Questions", path: "/docs/billing-questions" }
                                ]
                            }
                        ].map((item, index) => (
                            <li key={item.id}>
                                <div className="text-gray-300 font-semibold text-lg mb-2 uppercase tracking-wide">
                                    {item.title}
                                </div>
                                <ul className="pl-4 space-y-3 text-sm">
                                    {item.subcategories.map((sub) => (
                                        <li
                                            key={sub.name}
                                            className={`cursor-pointer transition-colors duration-200 ease-in-out px-2 py-1 rounded-lg 
                                                ${activeSection === sub.name
                                                    ? "text-white font-bold bg-gray-700/50"
                                                    : "text-gray-400 hover:text-white hover:bg-gray-700/40"}`}
                                            onClick={() => router.push(sub.path)}
                                        >
                                            {sub.name}
                                        </li>
                                    ))}
                                </ul>
                                {index !== 7 && <hr className="border-gray-600 my-5" />}
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
                <main className="flex-grow md:px-16 px-8 pt-[7rem] text-gray-200">
                    <div className="max-w-4xl mx-auto">
                        <section id="disable_messaging_for_everyone" className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-300 mb-8">MySQL</h2>

                            <p className="text-gray-300 mb-6">
                                This article describes how you can use the MySQL integration.
                            </p>

                            <div className="bg-gray-800 p-6 rounded-2xl shadow-md border-2 border-white/20">
                                <ul className="space-y-4 text-gray-300">
                                    <li>
                                        <code className="text-blue-400 font-semibold">MySQL Hostname :</code>
                                        <span className="ml-2">Insert the DB URL and ensure the Socketlink server IP is whitelisted.</span>
                                    </li>
                                    <li>
                                        <code className="text-blue-400 font-semibold">MySQL DB Username :</code>
                                        <span className="ml-2">Insert the database username for integration.</span>
                                    </li>
                                    <li>
                                        <code className="text-blue-400 font-semibold">MySQL DB Password :</code>
                                        <span className="ml-2">Insert the database password.</span>
                                    </li>
                                    <li>
                                        <code className="text-blue-400 font-semibold">MySQL DB Port :</code>
                                        <span className="ml-2">Insert the database port number.</span>
                                    </li>
                                    <li>
                                        <code className="text-blue-400 font-semibold">MySQL Commit Batch Size :</code>
                                        <span className="ml-2">Set the batch size for message insertion. A higher value is recommended for high-frequency messaging.</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-gray-300 mt-6">
                                Press the save credentials button to save the credentials.
                            </p>

                            <h2 className="text-3xl font-bold text-gray-300 mb-8 mt-8">Enabling/Disabling the MySQL Integration</h2>

                            <p className="text-gray-300 mt-4">
                                Use the toggle to enable and disable the MySQL integration.
                            </p>

                            <div className="flex items-center space-x-3 bg-blue-50 border border-blue-400 shadow-md p-4 rounded-lg mt-4">
                                <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M21 12a9 9 0 10-18 0 9 9 0 0018 0z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-bold text-blue-600 items-center">To initiate a reconnection with the MySQL DB you can disable and re-enable the integration using the toggle.</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mt-4">
                                After Enabling the integration this table (<code>socketlink_messages</code>) will be created automatically where the messages will be stored.
                            </p>
                            <pre className="mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                {`id : int (Auto Increment, Primary Key)
insert_time : datetime
message : text
uid : varchar(4096)
rid : varchar(160)`}
                            </pre>

                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
