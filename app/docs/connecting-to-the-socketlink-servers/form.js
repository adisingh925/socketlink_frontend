"use client";

import { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ConnectingToTheSocketlinkServers from "@/app/components/docs/gettingStarted/connecting-to-the-socketlink-servers";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const router = useRouter();
    const sidebarRef = useRef(null);

    useEffect(() => {
        setActiveSection("Connecting to the Socketlink servers");
        document.title = "Docs | Connecting to the Socketlink servers";
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
                        h-full shadow-md rounded-r-lg overflow-y-auto border-r 
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
                                        { name: "Android quick start", path: "/docs/android-quick-start" },
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
                    <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                        <div className="max-w-4xl mx-auto">
                            <ConnectingToTheSocketlinkServers />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
