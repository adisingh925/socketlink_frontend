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
        setActiveSection("Webhooks");
        document.title = "Docs | Webhooks";
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
                        <section id="disable_messaging_for_everyone" className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-300 mb-8">Webhooks</h2>

                            <p className="text-gray-300 mb-6">
                                This article describes how you can use the different webhooks.
                            </p>

                            <code className="text-blue-300">Webhook Url :</code>
                            &nbsp;Insert the url where you want to receive the webhook events.<br />
                            <code className="text-blue-300">Webhook Secret :</code>
                            &nbsp;Insert the secret key to secure the webhook events, An <code>HMAC-SHA256</code> will be created using this secret and included on the header in the field <code>X-HMAC-Signature</code><br />

                            <h2 className="text-2xl font-bold text-gray-300 mb-8 mt-8">Events</h2>

                            {/* Webhooks List */}
                            <div className="bg-gray-900 rounded-lg mt-4 space-y-4">
                                <ul className="text-gray-300 space-y-8">
                                    <li>
                                        <code className="text-blue-300">ON_MESSAGE :</code>
                                        &nbsp;Triggered when a user sends a message in a room.
                                        <div className="mt-4">
                                            <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                                {JSON.stringify({
                                                    event: "ON_MESSAGE",
                                                    uid: "USER_ID",
                                                    rid: "ROOM_ID",
                                                    message: "Hello, this is a test message!"
                                                }, null, 2)}
                                            </pre>

                                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                                <li><code>event :</code> The event which triggered the webhook.</li>
                                                <li><code>uid :</code> The uid from wich the message is sent.</li>
                                                <li><code>rid :</code> The room in which the message is sent.</li>
                                                <li><code>message :</code> The message sent on the room.</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <code className="text-blue-300">ON_VERIFICATION_REQUEST :</code>
                                        &nbsp;Triggered when a user attempts to join a private room, A request is sent to the webhook server to verify wether the user is allowed in the given private room or not.
                                        <div className="mt-4">
                                            <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                                {JSON.stringify({
                                                    event: "ON_VERIFICATION_REQUEST",
                                                    uid: "USER_ID",
                                                    rid: "ROOM_ID"
                                                }, null, 2)}
                                            </pre>

                                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                                <li><code>event :</code> The event which triggered the webhook.</li>
                                                <li><code>uid :</code> The uid from wich the message is sent.</li>
                                                <li><code>rid :</code> The room in which the message is sent.</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <code className="text-blue-300">ON_SUBSCRIBE :</code>
                                        &nbsp;Triggered when a user subscribes to a room.
                                        <div className="mt-4">
                                            <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                                {JSON.stringify({
                                                    event: "ON_SUBSCRIBE",
                                                    uid: "USER_ID",
                                                    rid: "ROOM_ID",
                                                    connections_in_room: "ROOM_CONNECTION_COUNT"
                                                }, null, 2)}
                                            </pre>

                                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                                <li><code>event :</code> The event which triggered the webhook.</li>
                                                <li><code>uid :</code> The uid from wich the message is sent.</li>
                                                <li><code>rid :</code> The room in which the message is sent.</li>
                                                <li><code>connections_in_room :</code> total number of users connected to the room.</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <code className="text-blue-300">ON_UNSUBSCRIBE :</code>
                                        &nbsp;Triggered when a user unsubscribes from a room.
                                        <div className="mt-4">
                                            <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                                {JSON.stringify({
                                                    event: "ON_UNSUBSCRIBE",
                                                    uid: "USER_ID",
                                                    rid: "ROOM_ID",
                                                    connections_in_room: "ROOM_CONNECTION_COUNT"
                                                }, null, 2)}
                                            </pre>


                                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                                <li><code>event :</code> The event which triggered the webhook.</li>
                                                <li><code>uid :</code> The uid from wich the message is sent.</li>
                                                <li><code>rid :</code> The room in which the message is sent.</li>
                                                <li><code>connections_in_room :</code> total number of users connected to the room.</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <code className="text-blue-300">ON_ROOM_OCCUPIED :</code>
                                        &nbsp;Triggered when a room becomes occupied.
                                        <div className="mt-4">
                                            <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                                {JSON.stringify({
                                                    event: "ON_ROOM_OCCUPIED",
                                                    uid: "USER_ID",
                                                    rid: "ROOM_ID"
                                                }, null, 2)}
                                            </pre>

                                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                                <li><code>event :</code> The event which triggered the webhook.</li>
                                                <li><code>uid :</code> The uid from wich the message is sent.</li>
                                                <li><code>rid :</code> The room in which the message is sent.</li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <code className="text-blue-300">ON_ROOM_VACATED :</code>
                                        &nbsp;Triggered when the last user leaves a chat room.
                                        <div className="mt-4">
                                            <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                                                {JSON.stringify({
                                                    event: "ON_ROOM_VACATED",
                                                    uid: "USER_ID",
                                                    rid: "ROOM_ID"
                                                }, null, 2)}
                                            </pre>

                                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                                <li><code>event :</code> The event which triggered the webhook.</li>
                                                <li><code>uid :</code> The uid from wich the message is sent.</li>
                                                <li><code>rid :</code> The room in which the message is sent.</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
