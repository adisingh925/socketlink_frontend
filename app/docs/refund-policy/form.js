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
        setActiveSection("Refund Policy");
        document.title = "Docs | Refund Policy";
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
                <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                    <div className="max-w-3xl mx-auto">
                        <section id="refund-policy" className="mb-16 p-6 bg-gray-900 border-2 border-white/20 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-extrabold text-white mb-6">🔄 Refund Policy</h2>

                            <p className="text-gray-300 text-lg mb-6">
                                <strong>We strive to ensure a smooth experience for our users.</strong>
                                <br /><br />
                                Below are the terms and conditions regarding refunds for payments made through our platform.
                            </p>

                            {/* Important Refund Notice */}
                            <div className="mb-6 p-5 bg-yellow-500/10 border-l-4 border-yellow-400 rounded-2xl shadow-md">
                                <h3 className="text-lg font-semibold text-yellow-400">⚠️ Important Notice</h3>
                                <p className="text-gray-300 mt-2">
                                    Refunds are only applicable under specific conditions and will be processed based on our policy guidelines. Please review the details below before making a request.
                                </p>
                            </div>

                            <div className="mb-6 p-4 bg-gray-800 border-2 border-white/20 rounded-2xl">
                                <h3 className="text-xl font-bold text-blue-400">📌 Refund Eligibility</h3>
                                <ul className="text-gray-300 mt-2 space-y-2 list-disc list-inside">
                                    <li>Refund requests must be made within <strong>7 days</strong> of the transaction date.</li>
                                    <li>Refunds are applicable only for failed transactions where the amount was deducted but the service was not delivered.</li>
                                    <li>No refunds will be issued for successfully processed payments where services have been utilized.</li>
                                    <li>All refund requests will be reviewed, and approval will be subject to verification.</li>
                                </ul>
                            </div>

                            <div className="mb-6 p-4 bg-gray-800 border-2 border-white/20 rounded-2xl">
                                <h3 className="text-xl font-bold text-blue-400">⏳ Refund Processing Time</h3>
                                <p className="text-gray-300 mt-2">
                                    Approved refunds will be processed within <strong>5-10 business days</strong>. The amount will be credited to the original payment method used for the transaction.
                                </p>
                            </div>

                            <div className="p-4 bg-gray-800 border-2 border-white/20 rounded-2xl">
                                <h3 className="text-xl font-bold text-yellow-400">💡 Need Assistance?</h3>
                                <p className="text-gray-300 mt-2">
                                    If you have any concerns or need help with a refund request, please contact our 24/7 support team.
                                </p>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
