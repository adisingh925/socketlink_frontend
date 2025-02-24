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

    const userEvents = {
        'Message': {
            description: 'This event fires when a user sends a message to a room.',
            color: 'white',
            data: 'YOUR_MESSAGE',
            source: 'user'
        },
    }

    useEffect(() => {
        setActiveSection("User Events");
        document.title = "Docs | User Events";
    }, []);

    // Close sidebar when clicking outside
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
                                    { name: "Benefits", path: "/docs/benefits" }
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
                                    { name: "Subscribing to a room", path: "/docs/subscribing" },
                                    { name: "Sending Messages", path: "/docs/sending-messages" },
                                    { name: "Receiving Messages", path: "/docs/receiving-messages" }
                                ]
                            },
                            {
                                id: "websocket-events",
                                title: "Websocket Events",
                                subcategories: [
                                    { name: "Server Events", path: "/docs/server-events" },
                                    { name: "Admin Events", path: "/docs/admin-events" },
                                    { name: "User Events", path: "/docs/user-events" },
                                ]
                            },
                            {
                                id: "integrations",
                                title: "Integrations",
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
                                    { name: "Public Rooms", path: "/docs/public-rooms" },
                                    { name: "Private Rooms", path: "/docs/private-rooms" },
                                    { name: "State Rooms", path: "/docs/state-rooms" },
                                    { name: "Cache Rooms", path: "/docs/cache-rooms" }
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
                <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                    <div className="max-w-4xl mx-auto">
                        <section id="api" className="mb-14">
                            <h2 className="text-2xl font-bold text-gray-300 mb-8">WebSocket Events</h2>
                            <p className="text-gray-300 mb-6">
                                The following WebSocket messages are emitted by the server during different events :
                            </p>

                            <div className="space-y-6 mt-6">
                                <h3 className="text-purple-300 text-lg font-semibold mb-2">User Events</h3>
                                {Object.keys(userEvents).map((event) => (
                                    <div key={event} className="mb-6">
                                        <strong className={`text-${userEvents[event].color}`}>{event}</strong>
                                        <pre className={`mt-2 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${userEvents[event].color} overflow-x-auto whitespace-pre-wrap`}>
                                            {JSON.stringify({
                                                data: userEvents[event].data,
                                                source: userEvents[event].source
                                            }, null, 2)}
                                        </pre>
                                        <p className="text-gray-400 text-sm mt-2">{userEvents[event].description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}