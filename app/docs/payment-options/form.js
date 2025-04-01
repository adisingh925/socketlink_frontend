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
        setActiveSection("Payment Options");
        document.title = "Docs | Payment Options";
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
                <main className="flex-grow md:px-16 px-8 pt-[7rem] text-gray-200">
                    <div className="max-w-4xl mx-auto">
                        <section id="payment-options" className="mb-16">
                            <h2 className="text-3xl font-bold text-white mb-10">💳 Payment Options</h2>

                            <p className="text-lg text-gray-300 mb-10">
                                <strong>We’ve integrated <em className="text-blue-400">Razorpay</em> as our global payment gateway.</strong>
                                <br /><br />
                                Securely complete transactions using various payment methods supported worldwide.
                            </p>

                            {/* Security Notice */}
                            <div className="mb-10 p-5 bg-yellow-500/10 border-l-4 border-yellow-400 rounded-xl">
                                <h3 className="text-lg font-semibold text-yellow-400">⚠️ Security First</h3>
                                <p className="text-gray-300 mt-2">
                                    All payments are securely processed via Razorpay, ensuring encryption, fraud prevention, and compliance with international security standards.
                                </p>
                            </div>

                            {/* Supported Payment Methods */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-blue-400 mb-3">✅ Supported Payment Methods</h3>
                                <ul className="text-gray-300 space-y-3 list-disc list-inside">
                                    <li><strong>Credit & Debit Cards –</strong> Visa, MasterCard, AmEx, Rupay, Maestro, etc.</li>
                                    <li><strong>UPI –</strong> Google Pay, PhonePe, Paytm, etc. (India).</li>
                                    <li><strong>Net Banking –</strong> Supports major banks globally.</li>
                                    <li><strong>Wallets –</strong> Paytm, Mobikwik, FreeCharge, and more.</li>
                                    <li><strong>International Payments –</strong> Accepts credit/debit cards & banking worldwide.</li>
                                </ul>
                            </div>

                            {/* Need Help Section */}
                            <div className="p-4 bg-gray-800/80 rounded-xl">
                                <h3 className="text-xl font-bold text-yellow-400">💡 Need Help?</h3>
                                <p className="text-gray-300 mt-2">
                                    If you face any issues with payments, contact our 24/7 global support team.
                                </p>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
