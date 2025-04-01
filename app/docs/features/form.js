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
        setActiveSection("Features");
        document.title = "Docs | Features";
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
                <main className="flex-grow md:px-16 px-8 mb-10 pt-[7rem] text-gray-200">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-10">Key Features</h3>

                        <ul className="space-y-12">
                            <li>
                                <h4 className="text-xl font-semibold text-blue-400 mb-3">Ultra-Fast WebSocket Connections</h4>
                                <p className="text-gray-400">Low-latency, high-speed communication with optimized WebSockets.</p>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-green-400 mb-3">Scalable Architecture</h4>
                                <p className="text-gray-400">Handles thousands of concurrent connections effortlessly.</p>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-red-400 mb-3">Secure WebSocket Connections</h4>
                                <ul className="ml-5 space-y-3 text-gray-400">
                                    <li>🔑 <strong>Strong Authentication</strong> – Only trusted clients can connect.</li>
                                    <li>🔐 <strong>Perfect Forward Secrecy</strong> – Ensures long-term confidentiality.</li>
                                    <li>🛡️ <strong>Quantum-Resistant Strength</strong> – Secure against emerging threats.</li>
                                    <li>⚡ <strong>Efficient Performance</strong> – Optimized for low-latency handshakes.</li>
                                    <li>🛑 <strong>Protection Against MITM Attacks</strong> – Prevents unauthorized interception.</li>
                                    <li>📜 <strong>Data Integrity</strong> – Ensures messages aren’t altered in transit.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-yellow-400 mb-3">Room & Channel Management</h4>
                                <ul className="ml-5 space-y-3 text-gray-400">
                                    <li>🟢 <strong>State Rooms</strong> – Tracks user activity in real-time.</li>
                                    <li>🗂️ <strong>Cache Channels</strong> – Temporarily stores messages for new users.</li>
                                    <li>🔐 <strong>Private Channels</strong> – Authenticate users before granting access.</li>
                                    <li>🌍 <strong>Public Channels</strong> – Open access with a valid client API key.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-purple-400 mb-3">Real-Time Monitoring & Analytics</h4>
                                <ul className="ml-5 space-y-3 text-gray-400">
                                    <li>💬 <strong>Total Messages Transferred</strong></li>
                                    <li>👥 <strong>Total Connected Users</strong></li>
                                    <li>📦 <strong>Average Payload Size</strong></li>
                                    <li>📡 <strong>Total Payload Sent</strong></li>
                                    <li>🚫 <strong>Unauthorized Request Rejections</strong></li>
                                    <li>⏳ <strong>Average Message Latency</strong></li>
                                    <li>❌ <strong>Total Messages Dropped</strong></li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-pink-400 mb-3">High Availability & Auto Scaling</h4>
                                <p className="text-gray-400">Infrastructure automatically scales with demand, ensuring 99.99% uptime.</p>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-cyan-400 mb-3">Event Broadcasting</h4>
                                <p className="text-gray-400">Broadcast events to multiple clients for real-time notifications.</p>
                            </li>

                            <li>
                                <h4 className="text-xl font-semibold text-indigo-400 mb-3">No Vendor Lock-in</h4>
                                <p className="text-gray-400">Pure WebSocket-based solution with no client-side SDKs.</p>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}
