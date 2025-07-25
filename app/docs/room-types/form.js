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
        setActiveSection("Room Types");
        document.title = "Docs | Room Types";
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
                                <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">Room Types</h2>

                                <p className="dark:text-gray-300 text-gray-900 mb-6">
                                    This article describes the different types of rooms which can be used for different purposes.
                                </p>

                                {/* Private Room */}
                                <div className="dark:bg-gray-800 bg-gray-200 p-6 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">🔒 Private Room</h3>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        A <span className="text-yellow-500 font-bold">Private Room</span> is a restricted chat space where only invited users can join.
                                        It ensures confidentiality and is ideal for secure discussions. Private rooms require authentication,
                                        and only authorized users can access them.
                                    </p>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        To enable a private room, you need to enable the <span className="text-yellow-500 font-bold">ON VERIFICATION REQUEST</span> webhook.
                                    </p>
                                    <div className="dark:bg-gray-700 bg-gray-300 p-4 rounded-2xl mt-4 border-2 dark:border-white/20 border-gray-500/20">
                                        <p className="dark:text-gray-300 text-gray-900 mt-1">
                                            Use this prefix : <code className="text-blue-500">pri-test-room</code>
                                        </p>
                                    </div>
                                </div>

                                {/* Public Room */}
                                <div className="dark:bg-gray-800 bg-gray-200 p-6 rounded-2xl shadow-lg mt-6 border-2 dark:border-white/20 border-gray-500/20">
                                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">🌍 Public Room</h3>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        A <span className="text-yellow-500 font-bold">Public Room</span> is an open chat space where anyone can join without restrictions.
                                        It is ideal for general discussions, community engagement, and public conversations.
                                    </p>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        Public rooms do not require authentication, and any user can enter freely using the <span className="text-yellow-500 font-bold">Client API Key</span>.
                                    </p>
                                    <div className="dark:bg-gray-700 bg-gray-300 p-4 rounded-2xl mt-4 border-2 dark:border-white/20 border-gray-500/20">
                                        <p className="dark:text-gray-300 text-gray-900 mt-1">
                                            Use this prefix : <code className="text-blue-500">pub-general-room</code>
                                        </p>
                                    </div>
                                </div>

                                {/* Cache Room */}
                                <div className="dark:bg-gray-800 bg-gray-200 p-6 rounded-2xl shadow-lg mt-6 border-2 dark:border-white/20 border-gray-500/20">
                                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">🗄️ Cache Room</h3>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        A <span className="text-yellow-500 font-bold">Cache Room</span> is a temporary chat space that stores only the
                                        <span className="font-bold"> last sent message </span> in the room.
                                    </p>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        The cached message can be accessed via the <span className="text-blue-500 font-semibold">API</span>.
                                    </p>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        You can also have <span className="text-yellow-500 font-semibold">Private Cache Rooms</span> and <span className="text-yellow-500 font-semibold">Public Cache Rooms</span>.
                                    </p>
                                    <div className="dark:bg-gray-700 bg-gray-300 p-4 rounded-2xl mt-4 border-2 border-white/20">
                                        <p className="dark:text-gray-300 text-gray-900 mt-1">
                                            Prefix examples :
                                            <code className="text-blue-500"> cache-temp-room</code>,
                                            <code className="text-blue-500"> pri-cache-room</code>,
                                            <code className="text-blue-500"> pub-cache-room</code>
                                        </p>
                                    </div>
                                </div>

                                {/* State Room */}
                                <div className="dark:bg-gray-800 bg-gray-200 p-6 rounded-2xl shadow-lg mt-6 border-2 dark:border-white/20 border-gray-500/20">
                                    <h3 className="text-2xl font-semibold text-blue-400 mb-4">📢 State Room</h3>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        A <span className="text-yellow-500 font-bold">State Room</span> is a dynamic chat space where participants receive
                                        <span className="font-bold"> real-time notifications </span> when someone joins or leaves.
                                    </p>
                                    <p className="dark:text-gray-300 text-gray-900 mb-3">
                                        Variants include :
                                        <span className="text-yellow-500 font-semibold"> pri-state</span>,
                                        <span className="text-yellow-500 font-semibold"> pub-state</span>,
                                        <span className="text-yellow-500 font-semibold"> pri-state-cache</span>,
                                        <span className="text-yellow-500 font-semibold"> pub-state-cache</span>
                                    </p>
                                    <div className="dark:bg-gray-700 bg-gray-300 p-4 rounded-2xl mt-4 border-2 dark:border-white/20 border-gray-500/20">
                                        <ul className="dark:text-gray-300 text-gray-900">
                                            <li>🔒 <code className="text-blue-500">pri-state-</code></li>
                                            <li>🌍 <code className="text-blue-500">pub-state-</code></li>
                                            <li>🔒🗄️ <code className="text-blue-500">pri-state-cache-</code></li>
                                            <li>🌍🗄️ <code className="text-blue-500">pub-state-cache-</code></li>
                                        </ul>
                                        <p className="dark:text-gray-300 text-gray-900 mt-3">
                                            Example :
                                            <code className="text-blue-500"> pri-state-team-chat</code>,
                                            <code className="text-blue-500"> pub-state-community-chat</code>,
                                            <code className="text-blue-500"> pri-state-cache-meeting</code>,
                                            <code className="text-blue-500"> pub-state-cache-announcement</code>
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
