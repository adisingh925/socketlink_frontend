"use client";

import { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import AdminEndpoints from "@/app/components/docs/apiReference/admin-endpoints";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const router = useRouter();
    const sidebarRef = useRef(null);

    useEffect(() => {
        setActiveSection("Admin Endpoints");
        document.title = "Docs | Admin Endpoints";
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

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

                {/* Left Sidebar */}
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

                {/* Left Sidebar Toggle Button (Mobile) */}
                <button
                    className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1.5 rounded-full shadow-md md:hidden transition-all opacity-70 hover:opacity-100 z-50 ${isSidebarOpen ? "left-[17rem]" : "left-4"}`}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                </button>

                {/* Main Content Area */}
                <div className="flex flex-col flex-grow overflow-y-auto">
                    <NavigationBar />
                    <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                        <div className="max-w-4xl mx-auto">
                            <AdminEndpoints />
                        </div>
                    </main>
                </div>

                {/* Right Sidebar */}
                <aside className={`w-64 bg-gray-200 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#252525] p-8 pt-24 transition-all duration-300 ease-in-out 
      ${isRightDrawerOpen ? "translate-x-0 z-10 shadow-lg" : "translate-x-64"} md:translate-x-0 fixed md:relative 
      h-full shadow-md rounded-l-lg overflow-y-auto border-l border-gray-300 dark:border-gray-700 right-0 top-0`}>
                    <nav>
                        <ul className="space-y-6">
                            {[
                                {
                                    id: "overview",
                                    title: "Table of Contents",
                                    subcategories: [
                                        { name: "Test if server is running", id: "test_the_server" },
                                        { name: "Fetch resource usage metrics", id: "fetch_resources" },
                                        { name: "Sync MySQL buffers stored in the server", id: "sync_mysql" },
                                        { name: "Fetch all rooms and its members", id: "fetch_all_rooms" },
                                        { name: "Fetch members in given rooms", id: "fetch_member_in_given_room" },
                                        { name: "Send message to everyone", id: "send_message_to_everyone" },
                                        { name: "Send message to everyone in selected rooms", id: "send_message_to_everyone_in_room" },
                                        { name: "Send message to selected connections", id: "send_message_to_connection" },
                                        { name: "Ban the selected users globally or in a room", id: "ban_the_user" },
                                        { name: "Unban the selected users globally or in a room", id: "unban_the_user" },
                                        { name: "Enable messaging for eveyone", id: "enable_messaging_for_everyone" },
                                        { name: "Disable messaging for eveyone", id: "disable_messaging_for_everyone" },
                                        { name: "Disable messaging for selected users in selected rooms", id: "disable_messaging_in_rooms" },
                                        { name: "Enable messaging for selected users in selected rooms", id: "enable_messaging_in_rooms" },
                                        { name: "Fetch the banned users", id: "fetch_the_banned_users" },
                                        { name: "Fetch the messages for the cache rooms", id: "fetch_messages" },
                                        { name: "Truncate the cache rooms database", id: "truncate_database" },
                                    ]
                                }
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
                                                        ? "text-white font-bold bg-gray-700/50"
                                                        : "dark:text-gray-400 text-gray-700 hover:text-white dark:hover:bg-gray-700/40 hover:bg-gray-700/60"}`}
                                                onClick={() => scrollToSection(sub.id)}
                                            >
                                                {sub.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* {index !== 1 && <hr className="border-gray-600 my-5" />} */}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Right Sidebar Toggle Button (Mobile) */}
                <button
                    className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1.5 rounded-full shadow-md md:hidden transition-all opacity-70 hover:opacity-100 z-50 ${isRightDrawerOpen ? "right-[17rem]" : "right-4"}`}
                    onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
                >
                    {isRightDrawerOpen ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </button>
            </div>
        </>
    );
}
