"use client";

import { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const router = useRouter();
    const sidebarRef = useRef(null);

    const events = {
        'Rate Limit Exceeded': {
            description: 'This event is fired when the user sends data very fast and the server is not able to deliver it.',
            color: 'white',
            data: 'YOU_ARE_RATE_LIMITED',
            source: 'server'
        },
        'Rate Limit Lifted': {
            description: 'This event occurs when the accumulated buffer for the user is cleared and the user can send the data again.',
            color: 'white',
            data: 'RATE_LIMIT_LIFTED',
            source: 'server'
        },
        'Messaging Disabled': {
            description: 'This event happens when the messaging is disabled for the user, either in a room or globally.',
            color: 'white',
            data: 'MESSAGING_DISABLED',
            source: 'server'
        },
        'Connected To Room': {
            description: 'This event is being sent to the user who has been successfully connected to a new room.',
            color: 'white',
            data: 'CONNECTED_TO_ROOM',
            source: 'server',
            rid: 'ROOM_ID'
        },
        'Someone Joined The Room': {
            description: 'This event is only triggered in state rooms when someone joins the room, it is sent to everyone else in the room except the user who joined.',
            color: 'white',
            data: 'SOMEONE_JOINED_THE_ROOM',
            uid: 'USER_ID',
            source: 'server',
            rid: 'ROOM_ID'
        },
        'Someone Left The Room': {
            description: 'This event is only triggered in state rooms when someone leaves the room, it is sent to everyone else in the room except the user who left.',
            color: 'white',
            data: 'SOMEONE_LEFT_THE_ROOM',
            uid: 'USER_ID',
            source: 'server',
            rid: 'ROOM_ID'
        },
        'Global Broadcast': {
            description: 'This event is triggered when some message is broadcasted by the admin to all the users connected to the server.',
            color: 'white',
            data: 'YOUR_MESSAGE',
            source: 'admin'
        },
        'Room Broadcast': {
            description: 'This event is triggered when some message is broadcasted by the admin to all the users connected to a room.',
            color: 'white',
            data: 'YOUR_MESSAGE',
            rid: 'ROOM_ID',
            source: 'admin'
        },
        'User Broadcast': {
            description: 'This event is triggered when some message is broadcasted by the admin to some selected users.',
            color: 'white',
            data: 'YOUR_MESSAGE',
            uid: 'USER_ID',
            source: 'admin'
        },
        'You Have Been Banned': {
            description: 'This event is triggered when the admin bans a user from the server, It is sent to the user who has been banned.',
            color: 'white',
            data: 'YOU_HAVE_BEEN_BANNED',
            source: 'admin'
        },
        'Message Received': {
            description: 'This event is received by all the members of the room when a user sends a message to the room.',
            color: 'white',
            data: 'YOUR_MESSAGE',
            source: 'user',
            rid: 'ROOM_ID'
        },
        'Invalid Json': {
            description: 'This event fires when the message json is invalid.',
            color: 'white',
            data: 'INVALID_JSON',
            source: 'server'
        },
        'Message Dropped': {
            description: 'This event fires when the most recent message gets dropped by the server.',
            color: 'white',
            data: 'MESSAGE_DROPPED',
            source: 'server'
        },
        'Messaging Disabled': {
            description: 'This event fires when a user tries to send a message but the messaging is disabled on the server.',
            color: 'white',
            data: 'MESSAGING_DISABLED',
            source: 'server'
        },
        'No Subscription Found': {
            description: 'This event fires when a user tries to send a message to a room but he is not subscribed to any room.',
            color: 'white',
            data: 'NO_SUBSCRIPTION_FOUND',
            source: 'server'
        },
        'No Subscription Found': {
            description: 'This event fires when a user tries to send a message to a room but he is not subscribed to that room.',
            color: 'white',
            data: 'NO_SUBSCRIPTION_FOUND',
            source: 'server'
        },
    };

    useEffect(() => {
        setActiveSection("All Events");
        document.title = "Docs | All Events";
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
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-SGP3J8PTY5" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="worker">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'G-SGP3J8PTY5');
                `}
            </Script>

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
                    <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                        <div className="max-w-4xl mx-auto">
                            <section id="api" className="mb-14">
                                <h2 className="text-3xl font-bold text-gray-300 mb-8">📡 WebSocket Events</h2>
                                <p className="text-gray-300 mb-6">
                                    The following websocket messages are emitted by the server during various events.
                                </p>

                                <div className="space-y-6 mt-6">
                                    {Object.keys(events).map((event) => (
                                        <div key={event} className="mb-6">
                                            <strong className={`text-${events[event].color}`}>{event}</strong>
                                            <pre className={`mt-2 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap`}>
                                                {JSON.stringify({
                                                    data: events[event].data,
                                                    ...(events[event].uid && { uid: events[event].uid }),
                                                    source: events[event].source,
                                                    ...(events[event].rid && { rid: events[event].rid })
                                                }, null, 2)}

                                            </pre>
                                            <p className="text-gray-400 text-sm mt-2">{events[event].description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}