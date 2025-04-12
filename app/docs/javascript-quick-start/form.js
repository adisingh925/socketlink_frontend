"use client";

import { useEffect, useState, useRef } from "react";
import NavigationBar from "../../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Introduction from "../../components/docs/overview/introduction";
import { useRouter } from "next/navigation";
import CodeSnippet from "@/app/components/codeSnippet";
import Link from "next/link";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");
    const router = useRouter();
    const sidebarRef = useRef(null);

    useEffect(() => {
        setActiveSection("Javasript quick start");
        document.title = "Docs | Javasript quick start";
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
                                        { name: "Javasript quick start", path: "/docs/javascript-quick-start" },
                                        { name: "Android quick start", path: "/docs/android-quick-start" },
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
                    <main className="flex-grow md:px-16 px-8 pt-[7rem]">
                        <div className="max-w-4xl mx-auto">
                            <section id="overview" className="mb-16 text-white">
                                <h2 className="text-3xl font-bold dark:dark:text-gray-300 text-gray-900 mb-8">🚀 Javascript Quick Start Guide</h2>

                                {/* Overview */}
                                <div className="mb-10">
                                    <p className="dark:text-gray-300 text-gray-900">
                                        This guide will walk you through the process of quickly getting started with our NPM package, making it easy to integrate and begin using Socketlink in your project.                                    </p>
                                </div>


                            </section>

                            <section id="installation" className="mb-16 text-white">
                                <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">📦 Installation</h2>

                                {/* Installation Instructions */}
                                <div className="mb-10">
                                    <p className="dark:text-gray-300 text-gray-900">
                                        To get started, you need to install the Socketlink NPM package into your project. Follow the steps below :
                                    </p>

                                    <div className="space-y-4">
                                        <pre className="mt-5 dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 dark:border-white/20 border-gray-500/20 overflow-x-auto whitespace-nowrap">
                                            npm i socketlink-nodejs
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            <section id="code-samples" className="mb-16 text-white">
                                <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">💻 Code Samples</h2>

                                {/* Code Samples Instructions */}
                                <div className="mb-10">
                                    <p className="dark:text-gray-300 text-gray-900">
                                        Below are some useful code samples to help you get started with Socketlink. These examples show how to integrate Socketlink with your project in different use cases.
                                    </p>

                                    <div className="space-y-6 mt-5">
                                        {/* Basic Example */}
                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">1. Basic Connection</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                This example demonstrates how to establish a basic connection to the WebSocket server :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `const socketlink = require("socketlink-nodejs");

const client = new socketlink({
    clientApiKey: 'sl_2aadbb9a5cf33fb77aa3be56c9d408166442d2747881d6bddedbf7b79bf24b4c',
    adminApiKey: 'sl_2aadbb9a5cf33fb77aa3be56c9d408166442d2747881d6bddedbf7b79bf24b4c',
    connectionUrl: 'https://adisingh925.socketlink.io',
    uid: "uid"
});

client.onOpen = () => {
    console.log("🎉 Connection is open!");
};

/**
 * 
 * @param {*} msg - message received from users
 * @param {*} rid - The rid for which the message is received
 */
client.onMessage = (msg, rid) => {
    console.log("Message received for rid " + rid + " : ", msg);
};

client.onClose = () => {
    console.log("😴 Disconnected from server");
};

client.onError = (err) => {
    console.error("❗ WebSocket error :", err.message);
};

/**
 * 
 * @param {*} msg - Server error/warning response after sending a message
 */
client.onServerBroadcast = (msg) => {
    console.log("📩 Server broadcast received :", msg);
}

/**
 * 
 * @param {*} msg - message sent by the admin
 * @param {*} rid - The rid for which the message is received
 */
client.onAdminBroadcast = (msg, rid) => {
    console.log("📩 Admin broadcast received for rid " + rid + " : ", msg);
}
`
                                                }}
                                            />
                                        </div>

                                        {/* Sending Messages */}
                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">2. Subscribing to a Room</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                Once connected, you can subscribe to specific rooms.{' '}
                                                <Link href="/docs/room-types" passHref>
                                                    <span className="text-blue-300 hover:underline hover:underline-offset-4 cursor-pointer">
                                                        Learn about different room types.
                                                    </span>
                                                </Link>
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.subscribeToRoom("pub-test-groupchat").then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        {/* Subscribing to Rooms */}
                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">3. Sending Messages</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                After subscribing you can start sending messages to the room :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.send("Hi there!", "pub-test-groupchat");`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">3. Unsubscribe from a Room</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can unsubscribe from a room using the below method :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.unsubscribeFromRoom("pub-test-groupchat").then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">4. Get message for Cache Room</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can fetch the last message for the subscribed cache room using the below method :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getMessageForCacheRoom("pub-cache-test-groupchat", "uid").then((message) => {
    console.log("Message received from cache room : ", message);
}).catch((err) => {
    console.error("Error while getting message from cache room : ", err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">5. Get server usage metrics</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can fetch the latest server usage metrics using the below method :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getUsageMetrics().then((metrics) => {
    console.log(metrics);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">6. Sync MySQL</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to sync your MySQL buffer in the server with the database :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.syncMySQL().then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">7. Fetch all Rooms</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all the rooms and their users :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.fetchAllRooms().then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">7. Get orphan users</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all the users that are not subscribed to any room :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getOrphanUsers().then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">8. Get users in given rooms</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all the users in the given rooms, You can pass room ids as string array :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getAllUsersInGivenRooms(["pub-cache-test-groupchat"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">8. Get all the uids</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all the uids and the rooms they are subscribed to :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getSubscriptionsForAllUsers().then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">9. Get rooms for the given uids</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all rooms for the given uids, You can pass uids as string array :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getSubscriptionsForGivenUsers(["uid"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">10. Broadcast message to everyone</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to send message to all the users in the server :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.broadcastMessageToEveryone("Hi there!").then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">10. Broadcast message to given rooms</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to send message to all the users in the given rooms, You can pass room ids as string array :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.broadcastMessageToGivenRooms("Hi there!", ["pub-cache-test-groupchat"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">11. Broadcast message to given users</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to send message to the given users, You can pass uids as string array :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.broadcastMessageToGivenUsers("Hi there!", ["uid"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>
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
