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
        setActiveSection("Sending Messages");
        document.title = "Docs | Sending Messages";
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
        <>
            <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
                {/* Sidebar */}
                <aside
                    ref={sidebarRef}
                    className={`w-64 
                        bg-gray-200 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#252525] 
                        p-8 pt-24 transition-all duration-300 ease-in-out 
                        ${isSidebarOpen ? "translate-x-0 z-50 shadow-lg" : "-translate-x-64"} 
                        md:translate-x-0 fixed md:relative 
                        h-full overflow-y-auto border-l border-gray-300 dark:border-gray-700 
                      `}
                >
                    <nav>
                        <ul className="space-y-6">
                            {[
                                {
                                    id: "overview",
                                    title: "Overview",
                                    subcategories: [
                                        { name: "Introduction", path: "/docs/introduction" },
                                        { name: "Features", path: "/docs/features" },
                                    ],
                                },
                                {
                                    id: "purchasing-guide",
                                    title: "Purchasing Guide",
                                    subcategories: [
                                        { name: "How to Purchase", path: "/docs/how-to-purchase" },
                                        { name: "Payment Options", path: "/docs/payment-options" },
                                        { name: "Refund Policy", path: "/docs/refund-policy" },
                                    ],
                                },
                                {
                                    id: "getting-started",
                                    title: "Getting Started",
                                    subcategories: [
                                        { name: "Javasript quick start", path: "/docs/javascript-quick-start" },
                                        { name: "Third party libraries", path: "/docs/third-party-libraries" },
                                    ],
                                },
                                {
                                    id: "websocket-events",
                                    title: "Websocket Events",
                                    subcategories: [
                                        { name: "All Events", path: "/docs/all-events" },
                                    ],
                                },
                                {
                                    id: "configuration",
                                    title: "Configuration",
                                    subcategories: [
                                        { name: "Webhooks", path: "/docs/webhooks" },
                                        { name: "MySQL", path: "/docs/mysql-integration" },
                                    ],
                                },
                                {
                                    id: "rooms",
                                    title: "Rooms",
                                    subcategories: [
                                        { name: "Room Types", path: "/docs/room-types" },
                                    ],
                                },
                                {
                                    id: "api",
                                    title: "API Reference",
                                    subcategories: [
                                        { name: "Client Endpoints", path: "/docs/client-endpoints" },
                                        { name: "Admin Endpoints", path: "/docs/admin-endpoints" },
                                    ],
                                },
                            ].map((item, index) => (
                                <li key={item.id}>
                                    <div className="dark:text-gray-300 text-gray-900 font-semibold text-lg mb-2 uppercase tracking-wide">
                                        {item.title}
                                    </div>
                                    <ul className="pl-4 space-y-3 text-sm">
                                        {item.subcategories.map((sub) => (
                                            <li
                                                key={sub.name}
                                                className={`cursor-pointer transition-colors duration-200 ease-in-out px-2 py-1 rounded-lg 
                                                ${activeSection === sub.name
                                                        ? "text-white font-bold dark:bg-gray-700/50 bg-gray-700/90"
                                                        : "dark:text-gray-400 text-gray-700 hover:text-white dark:hover:bg-gray-700/40 hover:bg-gray-700/60"}`}
                                                onClick={() => router.push(sub.path)}
                                            >
                                                {sub.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {index !== 6 && <hr className="border-gray-600 my-5" />}
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
                                <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">📤 Sending Messages</h2>

                                <p className="dark:text-gray-300 text-gray-900 mb-6">
                                    This article describes the format that should be used for sending the websocket messages.
                                </p>

                                <p className="dark:text-gray-300 text-gray-900 mb-6">
                                    You simply need to send the message in the given format using the send function of your respective websocket library.
                                </p>

                                {/* Endpoint URL */}
                                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">

                                    {/* Headers */}
                                    <div className="space-y-4">
                                        <strong className="dark:text-blue-400 text-blue-500">Message Format</strong>
                                        <pre className="dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 dark:border-white/20 border-gray-500/20 overflow-x-auto whitespace-pre-wrap">
                                            {JSON.stringify({
                                                message: "YOUR_MESSAGE",
                                                rid: "ROOM_ID"
                                            }, null, 2)}
                                        </pre>

                                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
                                            <li><code>message :</code> The message that you want to send.</li>
                                            <li><code>rid :</code> The room in which you want to send the given message.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 bg-blue-50 border border-blue-400 shadow-md p-4 rounded-lg mt-10">
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
                                        <p className="font-bold text-black items-center">
                                            In order to send a message to a room, you need to subscribe to it first.
                                            <a href="/docs/client-endpoints" className="text-blue-500 hover:text-blue-700">
                                                &nbsp;Learn how to subscribe to a room.
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
