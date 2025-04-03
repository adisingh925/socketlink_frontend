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
                <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-10">Key Features</h3>

                        {/* Overview */}
                        <div className="mb-10">
                            <p className="text-lg">
                                Socketlink is a powerful WebSocket-based communication solution designed for speed, security, and scalability. Whether you're building a chat application, real-time notifications, or live streaming services, Socketlink ensures seamless performance and reliability.
                            </p>
                        </div>

                        <ul className="space-y-12 mb-6">
                            <li>
                                <h4 className="text-xl font-bold text-green-400">Ultra-Fast WebSocket Connections</h4>
                                <p className="mt-2 text-gray-300">
                                    Socketlink uses optimized WebSocket technology to deliver lightning-fast, bidirectional communication. It minimizes latency and maximizes throughput, ensuring real-time data exchange between clients and servers without unnecessary overhead.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>Low-latency, high-speed communication with optimized WebSockets.</li>
                                    <li>Eliminates polling delays by maintaining a persistent connection.</li>
                                    <li>Seamless data streaming for chats, notifications, and live updates.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-green-400">Scalable Architecture</h4>
                                <p className="mt-2 text-gray-300">
                                    Designed to support thousands of concurrent users effortlessly, Socketlink provides an efficient and distributed WebSocket infrastructure that auto-scales based on demand.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>Handles massive spikes in traffic without degrading performance.</li>
                                    <li>Load balancing ensures stability even during peak usage.</li>
                                    <li>Optimized connection management prevents resource exhaustion.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-red-400">Secure WebSocket Connections</h4>
                                <p className="mt-2 text-gray-300">
                                    Security is a top priority in WebSocket communication. Socketlink implements cutting-edge security protocols to prevent unauthorized access and data interception.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>🔑 <strong>Strong Authentication</strong> – Only trusted clients can connect.</li>
                                    <li>🔐 <strong>Perfect Forward Secrecy</strong> – Ensures long-term confidentiality.</li>
                                    <li>🛡️ <strong>Quantum-Resistant Strength</strong> – Secure against emerging threats.</li>
                                    <li>⚡ <strong>Efficient Performance</strong> – Optimized for low-latency handshakes.</li>
                                    <li>🛑 <strong>Protection Against MITM Attacks</strong> – Prevents unauthorized interception.</li>
                                    <li>📜 <strong>Data Integrity</strong> – Ensures messages aren’t altered in transit.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-yellow-400">Room & Channel Management</h4>
                                <p className="mt-2 text-gray-300">
                                    Socketlink offers powerful room and channel management capabilities, allowing developers to create structured communication environments tailored to their needs.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>🟢 <strong>State Rooms</strong> – Tracks user activity in real-time.</li>
                                    <li>🗂️ <strong>Cache Channels</strong> – Temporarily stores messages for new users.</li>
                                    <li>🔐 <strong>Private Channels</strong> – Authenticate users before granting access.</li>
                                    <li>🌍 <strong>Public Channels</strong> – Open access with a valid client API key.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-purple-400">Real-Time Monitoring & Analytics</h4>
                                <p className="mt-2 text-gray-300">
                                    Gain complete visibility into your WebSocket traffic with real-time analytics. Socketlink provides detailed insights into connection health, traffic volume, and user interactions.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>💬 <strong>Total Messages Transferred</strong> – View the total number of messages exchanged.</li>
                                    <li>👥 <strong>Total Connected Users</strong> – Monitor active users in real time.</li>
                                    <li>📦 <strong>Average Payload Size</strong> – Analyze the efficiency of message transmission.</li>
                                    <li>📡 <strong>Total Payload Sent</strong> – Track bandwidth usage.</li>
                                    <li>🚫 <strong>Unauthorized Request Rejections</strong> – Detect suspicious access attempts.</li>
                                    <li>⏳ <strong>Average Message Latency</strong> – Optimize communication speed.</li>
                                    <li>❌ <strong>Total Messages Dropped</strong> – Identify transmission issues.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-pink-400">High Availability & Auto Scaling</h4>
                                <p className="mt-2 text-gray-300">
                                    Socketlink automatically scales up or down based on traffic demand, ensuring consistent performance and reliability without requiring manual intervention.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>Infrastructure automatically scales with demand, ensuring 99.99% uptime.</li>
                                    <li>Redundant failover mechanisms prevent service disruptions.</li>
                                    <li>Distributed architecture ensures reliability across multiple regions.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-cyan-400">Event Broadcasting</h4>
                                <p className="mt-2 text-gray-300">
                                    Instantly broadcast messages to multiple clients using Socketlink’s efficient event-driven architecture. Ideal for notifications, stock updates, live scores, and more.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>Broadcast events to multiple clients for real-time notifications.</li>
                                    <li>Efficient message distribution using pub/sub channels.</li>
                                    <li>Supports targeted broadcasts for personalized experiences.</li>
                                </ul>
                            </li>

                            <li>
                                <h4 className="text-xl font-bold text-indigo-400">No Vendor Lock-in</h4>
                                <p className="mt-2 text-gray-300">
                                    Socketlink provides a fully open WebSocket solution with no proprietary SDKs, allowing developers to use any frontend or backend framework without restrictions.
                                </p>
                                <ul className="mt-2 space-y-3 list-disc list-inside text-gray-300">
                                    <li>Pure WebSocket-based solution with no client-side SDKs.</li>
                                    <li>Compatible with any programming language and framework.</li>
                                    <li>Freedom to deploy on any cloud provider or on-premises setup.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}
