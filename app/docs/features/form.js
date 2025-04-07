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
                                        { name: "Connecting to the Socketlink servers", path: "/docs/connecting-to-the-socketlink-servers" },
                                        { name: "Sending Messages", path: "/docs/sending-messages" },
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
                            <h3 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">🔑 Key Features</h3>

                            {/* Overview */}
                            <div className="mb-10">
                                <p className="dark:text-gray-300 text-gray-900 mb-6">
                                    Socketlink is a powerful WebSocket-based communication solution designed for speed, security, and scalability. Whether you&apos;re building a chat application, real-time notifications, or live streaming services, Socketlink ensures seamless performance and reliability.
                                </p>
                            </div>

                            <ul className="space-y-8 mb-6">
                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-green-400">Ultra-Fast WebSocket Connections</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Socketlink leverages optimized WebSocket technology to provide ultra-fast, bidirectional communication. By minimizing latency and maximizing throughput, it enables real-time data exchange between clients and servers with minimal overhead.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li><span className="text-green-300 font-medium">Low-latency, high-speed communication</span> with optimized WebSockets.</li>
                                        <li><span className="text-green-300 font-medium">No polling delays</span>, thanks to a persistent connection.</li>
                                        <li><span className="text-green-300 font-medium">Seamless data streaming</span> for chats, notifications, and live updates.</li>
                                    </ul>
                                </li>

                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-blue-400">Scalable Architecture</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Engineered to handle thousands of concurrent users seamlessly, Socketlink offers a robust, distributed WebSocket infrastructure that auto-scales to meet demand.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li><span className="text-blue-300 font-medium">Handles massive traffic spikes</span> without degrading performance.</li>
                                        <li><span className="text-blue-300 font-medium">Load balancing</span> ensures stability even during peak usage.</li>
                                        <li><span className="text-blue-300 font-medium">Optimized connection management</span> prevents resource exhaustion.</li>
                                    </ul>
                                </li>

                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-red-400">Secure WebSocket Connections</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Security is a top priority in WebSocket communication. Socketlink implements advanced security protocols to prevent unauthorized access and data interception.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li>🔑 <span className="text-red-300 font-medium">Strong Authentication</span> – Only trusted clients can connect.</li>
                                        <li>🔐 <span className="text-red-300 font-medium">Perfect Forward Secrecy</span> – Ensures long-term confidentiality.</li>
                                        <li>🛡️ <span className="text-red-300 font-medium">Quantum-Resistant Strength</span> – Secure against emerging threats.</li>
                                        <li>⚡ <span className="text-red-300 font-medium">Efficient Performance</span> – Optimized for low-latency handshakes.</li>
                                        <li>🛑 <span className="text-red-300 font-medium">Protection Against MITM Attacks</span> – Prevents unauthorized interception.</li>
                                        <li>📜 <span className="text-red-300 font-medium">Data Integrity</span> – Ensures messages aren’t altered in transit.</li>
                                    </ul>
                                </li>


                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-yellow-400">Room & Channel Management</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Socketlink offers powerful room and channel management capabilities, enabling developers to create structured communication environments tailored to their needs.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li>🟢 <span className="text-yellow-300 font-medium">State Rooms</span> – Tracks when a user joins or leaves a room and informs the other users.</li>
                                        <li>🗂️ <span className="text-yellow-300 font-medium">Cache Channels</span> – Stores the last message sent on the room.</li>
                                        <li>🔐 <span className="text-yellow-300 font-medium">Private Channels</span> – Authenticate users before granting access.</li>
                                        <li>🌍 <span className="text-yellow-300 font-medium">Public Channels</span> – Open access with a valid client API key.</li>
                                    </ul>
                                </li>


                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-purple-400">Real-Time Monitoring & Analytics</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Gain complete visibility into your WebSocket traffic with real-time analytics. Socketlink provides detailed insights into connection health, traffic volume, and user interactions.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li>💬 <span className="text-purple-300 font-medium">Total Messages Transferred</span> – View the total number of messages exchanged.</li>
                                        <li>👥 <span className="text-purple-300 font-medium">Total Connected Users</span> – Monitor active users in real time.</li>
                                        <li>📦 <span className="text-purple-300 font-medium">Average Payload Size</span> – Analyze the efficiency of message transmission.</li>
                                        <li>📡 <span className="text-purple-300 font-medium">Total Payload Sent</span> – Track bandwidth usage.</li>
                                        <li>🚫 <span className="text-purple-300 font-medium">Unauthorized Request Rejections</span> – Detect suspicious access attempts.</li>
                                        <li>⏳ <span className="text-purple-300 font-medium">Average Message Latency</span> – Optimize communication speed.</li>
                                        <li>❌ <span className="text-purple-300 font-medium">Total Messages Dropped</span> – Identify transmission issues.</li>
                                    </ul>
                                </li>


                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-pink-400">High Availability & Auto Scaling</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Socketlink automatically scales up or down based on traffic demand, ensuring consistent performance and reliability without requiring manual intervention.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li>⚡ <span className="text-pink-300 font-medium">Auto-Scaling Infrastructure</span> – Dynamically adjusts resources for 99.99% uptime.</li>
                                        <li>🛑 <span className="text-pink-300 font-medium">Failover Mechanisms</span> – Prevents service disruptions with automatic redundancy.</li>
                                        <li>🌍 <span className="text-pink-300 font-medium">Distributed Architecture</span> – Ensures reliability across multiple regions.</li>
                                    </ul>
                                </li>


                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-cyan-400">Event Broadcasting</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Instantly broadcast messages to multiple clients using Socketlink’s efficient event-driven architecture. Perfect for notifications, stock updates, live scores, and more.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li>📡 <span className="text-cyan-300 font-medium">Real-Time Notifications</span> – Instantly deliver updates to multiple clients.</li>
                                        <li>🔄 <span className="text-cyan-300 font-medium">Efficient Pub/Sub System</span> – Uses optimized channels for message distribution.</li>
                                        <li>🎯 <span className="text-cyan-300 font-medium">Targeted Broadcasts</span> – Send personalized messages to specific users or groups.</li>
                                    </ul>
                                </li>


                                <li className="dark:bg-gray-800 bg-gray-200 p-4 rounded-2xl border-2 dark:border-white/20 border-gray-500/20">
                                    <h4 className="text-xl font-bold text-indigo-400">No Vendor Lock-in</h4>
                                    <p className="mt-2 dark:text-gray-300 text-gray-900">
                                        Socketlink provides a fully open WebSocket solution with no proprietary SDKs, allowing developers to use any frontend or backend framework without restrictions.
                                    </p>
                                    <ul className="mt-3 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-900">
                                        <li>🚀 <span className="text-indigo-300 font-medium">Pure WebSocket Solution</span> – No client-side SDKs required.</li>
                                        <li>🌍 <span className="text-indigo-300 font-medium">Universal Compatibility</span> – Works with any language or framework.</li>
                                        <li>☁️ <span className="text-indigo-300 font-medium">Flexible Deployment</span> – Run on any cloud provider or on-premises setup.</li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
