"use client";

import { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Introduction from "../../components/docs/overview/introduction";
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
                            <h2 className="text-3xl font-bold text-gray-300 mb-8">Room Types</h2>

                            <p className="text-gray-300 mb-6">
                                This article describes the different types of rooms which can be used for different purposes.
                            </p>

                            <div className="bg-gray-800 p-6 rounded-2xl border-2 border-white/20">
                                <h3 className="text-2xl font-semibold text-blue-400 mb-4">🔒 Private Room</h3>

                                <p className="text-gray-300 mb-3">
                                    A <span className="text-yellow-300 font-bold">Private Room</span> is a restricted chat space where only invited users can join.
                                    It ensures confidentiality and is ideal for secure discussions. Private rooms require authentication,
                                    and only authorized users can access them.
                                </p>

                                <p className="text-gray-300 mb-3">
                                    To enable a private room, You need to enable the <span className="text-yellow-300 font-bold">ON VERIFICATION REQUEST</span> webhook.
                                </p>

                                <div className="bg-gray-700 p-4 rounded-2xl mt-4 border-2 border-white/20">
                                    <p className="text-gray-300 mt-1">Use this prefix before the room name to indicate a private room, i.e. <code className="text-blue-300">pri-test-room</code></p>
                                </div>
                            </div>

                            {/* Public Room */}
                            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 border-2 border-white/20">
                                <h3 className="text-2xl font-semibold text-green-400 mb-4">🌍 Public Room</h3>

                                <p className="text-gray-300 mb-3">
                                    A <span className="text-yellow-300 font-bold">Public Room</span> is an open chat space where anyone can join without restrictions.
                                    It is ideal for general discussions, community engagement, and public conversations.
                                </p>

                                <p className="text-gray-300 mb-3">
                                    Public rooms do not require authentication, and any user can enter freely using the <span className="text-yellow-300 font-bold">Client API Key</span>.
                                </p>

                                <div className="bg-gray-700 p-4 rounded-2xl mt-4 border-2 border-white/20">
                                    <p className="text-gray-300 mt-1">Use this prefix before the room name to indicate a public room, i.e. <code className="text-green-300">pub-general-room</code>.</p>
                                </div>
                            </div>

                            {/* Cache Room */}
                            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 border-2 border-white/20">
                                <h3 className="text-2xl font-semibold text-purple-400 mb-4">🗄️ Cache Room</h3>

                                <p className="text-gray-300 mb-3">
                                    A <span className="text-yellow-300 font-bold">Cache Room</span> is a temporary chat space that stores only the
                                    <span className="text-white font-bold"> last sent message </span> in the room. This allows users to retrieve
                                    the most recent message without storing older conversations.
                                </p>

                                <p className="text-gray-300 mb-3">
                                    The cached message can be accessed via the <span className="text-blue-300 font-semibold">API</span>, ensuring
                                    quick retrieval when needed. Once a new message is sent, the previous cached message is replaced.
                                </p>

                                <p className="text-gray-300 mb-3">
                                    Cache rooms can also be used in combination with
                                    <span className="text-green-300 font-semibold"> Private </span> and
                                    <span className="text-blue-400 font-semibold"> Public </span> rooms, {" "}
                                    <span className="text-green-300 font-semibold">Private Cache Rooms</span> restrict access while caching only the last message.{" "}
                                    <span className="text-blue-400 font-semibold">Public Cache Rooms</span> allow open participation with only the latest message stored.
                                </p>

                                <div className="bg-gray-700 p-4 rounded-2xl mt-4 border-2 border-white/20">
                                    
                                    <p className="text-gray-300 mt-1">
                                        Use this prefix before the room name to indicate a cache room, i.e.
                                        <code className="text-purple-300"> cache-temp-room</code>.
                                        To combine with other room types, use
                                        <code className="text-green-300"> pri-cache-room</code> for private cache rooms or
                                        <code className="text-blue-400"> pub-cache-room</code> for public cache rooms.
                                    </p>
                                </div>
                            </div>

                            {/* State Room */}
                            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 border-2 border-white/20">
                                <h3 className="text-2xl font-semibold text-orange-400 mb-4">📢 State Room</h3>

                                <p className="text-gray-300 mb-3">
                                    A <span className="text-yellow-300 font-bold">State Room</span> is a dynamic chat space where participants receive
                                    <span className="text-white font-bold"> real-time notifications </span> when someone joins or leaves the room.
                                    This feature enhances user engagement and awareness within the conversation.
                                </p>

                                <p className="text-gray-300 mb-3">
                                    State rooms can also include caching, {" "}
                                    <span className="text-green-300 font-semibold">pri-state</span> : A private state room with restricted access and user join/leave notifications.{" "}
                                    <span className="text-blue-400 font-semibold">pub-state</span> : A public state room open to everyone, with join/leave notifications.{" "}
                                    <span className="text-purple-300 font-semibold">pri-state-cache</span> : A private state room that also stores the last message.{" "}
                                    <span className="text-blue-400 font-semibold">pub-state-cache</span> : A public state room that also stores the last message.
                                </p>

                                <div className="bg-gray-700 p-4 rounded-2xl mt-4 border-2 border-white/20">
                                    <ul className="text-gray-300">
                                        <li>🔒 <code className="text-green-300">pri-state-</code> (Private State Room)</li>
                                        <li>🌍 <code className="text-blue-400">pub-state-</code> (Public State Room)</li>
                                        <li>🔒🗄️ <code className="text-purple-300">pri-state-cache-</code> (Private State Cache Room)</li>
                                        <li>🌍🗄️ <code className="text-purple-300">pub-state-cache-</code> (Public State Cache Room)</li>
                                    </ul>

                                    <p className="text-gray-300 mt-3">
                                        Use these prefixes before the room name to indicate the room type, i.e.{" "}
                                        <code className="text-green-300">pri-state-team-chat</code>,{" "}
                                        <code className="text-blue-400">pub-state-community-chat</code>,{" "}
                                        <code className="text-purple-300">pri-state-cache-meeting</code>,{" "}
                                        <code className="text-purple-300">pub-state-cache-announcement</code>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
