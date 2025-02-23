"use client";

import { useEffect, useState } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Introduction from "../../components/docs/overview/introduction";
import { useRouter } from "next/navigation";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const router = useRouter();

    useEffect(() => {
        setActiveSection("Features");
        document.title = "Docs | Features";
    }, []);

    return (
        <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className={`w-64 bg-gradient-to-b from-[#1a1a1a] to-[#252525] p-8 pt-24 transition-all duration-300 ease-in-out 
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
                <main className="flex-grow md:px-16 px-8 mb-10 pt-[7rem]">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">✨ Key Features</h3>

                        <div className="space-y-6">
                            {/* Feature 1 */}
                            <div className="p-4 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-semibold text-green-400">⚡ Ultra-Fast WebSocket Connections</h4>
                                <p className="text-gray-300 mt-2">
                                    Experience low-latency, high-speed communication with our optimized WebSocket infrastructure.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-4 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-semibold text-yellow-400">📡 Scalable Architecture</h4>
                                <p className="text-gray-300 mt-2">
                                    Built to handle thousands of concurrent connections effortlessly, ensuring seamless scalability.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-6 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-bold text-red-400 mb-3">🔒 Secure WebSocket Connections</h4>
                                <p className="text-gray-300">
                                    We use <strong>secp384r1 (P-384) Elliptic Curve Certificates</strong> to establish highly secure WebSocket connections,
                                    ensuring top-tier protection for real-time communication.
                                </p>

                                <div className="mt-4 p-4 bg-gray-900 rounded-xl">
                                    <h5 className="text-lg font-semibold text-white">🔑 Strong Authentication</h5>
                                    <p className="text-gray-300 mt-2">
                                        Only trusted clients can establish a WebSocket connection, preventing unauthorized access.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🔐 Perfect Forward Secrecy (PFS)</h5>
                                    <p className="text-gray-300 mt-2">
                                        Even if future encryption keys are compromised, past communications remain secure, ensuring long-term confidentiality.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🛡️ Quantum-Resistant Strength</h5>
                                    <p className="text-gray-300 mt-2">
                                        ECC provides higher security per-bit, making WebSocket encryption more resilient to emerging threats, including quantum computing.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">⚡ Efficient Performance</h5>
                                    <p className="text-gray-300 mt-2">
                                        Secure handshakes are optimized for speed and reduced computational overhead, ensuring low-latency connections.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🛑 Protection Against MITM Attacks</h5>
                                    <p className="text-gray-300 mt-2">
                                        End-to-end encryption safeguards WebSocket traffic, preventing unauthorized interception or tampering.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">📜 Data Integrity</h5>
                                    <p className="text-gray-300 mt-2">
                                        Built-in cryptographic verification ensures that transmitted messages cannot be altered during transmission.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="p-6 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-bold text-purple-400 mb-3">📡 Room & Channel Management</h4>
                                <p className="text-gray-300">
                                    Easily create and manage <strong>private</strong> or <strong>public</strong> rooms, track participants,
                                    and optimize real-time collaboration with advanced channel management features.
                                </p>

                                <div className="mt-4 p-4 bg-gray-900 rounded-xl">
                                    <h5 className="text-lg font-semibold text-white">🟢 State Rooms</h5>
                                    <p className="text-gray-300 mt-2">
                                        Keep track of user activity in real-time. When a user joins or leaves, a message is automatically broadcasted
                                        to all participants in the room, ensuring seamless engagement and awareness.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🗂️ Cache Channels</h5>
                                    <p className="text-gray-300 mt-2">
                                        Messages in cache channels are temporarily stored on our servers, allowing new users to retrieve previous
                                        messages via an API call. This ensures better context and continuity in conversations.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🔐 Private Channels</h5>
                                    <p className="text-gray-300 mt-2">
                                        For enhanced security, socketlink.io servers authenticate with your server before allowing users to connect.
                                        This ensures only authorized users gain access to your private communication channels.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🌍 Public Channels</h5>
                                    <p className="text-gray-300 mt-2">
                                        Public channels are accessible to anyone with a valid <em>client API key</em>. These channels are ideal
                                        for broadcasting messages and facilitating open discussions without additional authentication.
                                    </p>
                                </div>
                            </div>


                            {/* Feature 5 */}
                            <div className="p-6 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-bold text-blue-400 mb-3">📊 Real-Time Monitoring & Analytics</h4>
                                <p className="text-gray-300">
                                    Monitor live user activity, track system performance, and gain insights into real-time network operations
                                    with detailed analytics.
                                </p>

                                <div className="mt-4 p-4 bg-gray-900 rounded-xl">
                                    <h5 className="text-lg font-semibold text-white">💬 Total Messages Transferred</h5>
                                    <p className="text-gray-300 mt-2">
                                        Keep track of the total number of messages sent and received in your system, providing valuable insights
                                        into user engagement and traffic volume.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">👥 Total Connected Users</h5>
                                    <p className="text-gray-300 mt-2">
                                        Monitor the number of active users connected at any given time, ensuring optimal system performance and
                                        resource allocation.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">📦 Average Payload Size</h5>
                                    <p className="text-gray-300 mt-2">
                                        Measure the average size of data packets being transferred, helping optimize bandwidth usage and efficiency.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">📡 Total Payload Sent</h5>
                                    <p className="text-gray-300 mt-2">
                                        Track the total amount of data transmitted across your network to better understand traffic flow and network demands.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">🚫 Unauthorized Request Rejections</h5>
                                    <p className="text-gray-300 mt-2">
                                        Ensure security by tracking and blocking unauthorized connection attempts, preventing unauthorized access to your system.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">⏳ Average Message Latency</h5>
                                    <p className="text-gray-300 mt-2">
                                        Measure the time it takes for messages to be delivered, allowing you to identify and optimize potential delays in real-time communication.
                                    </p>

                                    <h5 className="text-lg font-semibold text-white mt-4">❌ Total Messages Dropped</h5>
                                    <p className="text-gray-300 mt-2">
                                        Identify lost or dropped messages due to congestion or network errors, helping improve system reliability and performance.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 6 */}
                            <div className="p-4 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-semibold text-pink-400">🚀 High Availability & Auto Scaling</h4>
                                <p className="text-gray-300 mt-2">
                                    Our infrastructure automatically scales with demand, providing 99.99% uptime reliability.
                                </p>
                            </div>

                            {/* Feature 7 */}
                            <div className="p-4 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-semibold text-indigo-400">🔄 Event Broadcasting</h4>
                                <p className="text-gray-300 mt-2">
                                    Easily broadcast events to multiple clients, enabling real-time notifications and updates.
                                </p>
                            </div>

                            {/* Feature 8 */}
                            <div className="p-4 bg-gray-800 border-2 border-white/20 rounded-2xl shadow-md">
                                <h4 className="text-lg font-semibold text-cyan-400">🛠 No Vendor Lock-in</h4>
                                <p className="text-gray-300 mt-2">
                                    We provide a pure WebSocket-based solution with no client-side SDKs, giving developers full flexibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
