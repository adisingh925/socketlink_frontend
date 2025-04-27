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
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
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

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    };

    return (
        <>
            <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
                {/* Sidebar */}
                <aside
                    ref={sidebarRef}
                    className={`w-64 
                        bg-gray-200 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#252525] 
                        p-8 pt-24 transition-all duration-300 ease-in-out 
                        ${isSidebarOpen ? "translate-x-0 z-50 shadow-lg" : "-translate-x-64 z-50"} 
                        md:translate-x-0 fixed md:relative 
                        h-full overflow-y-auto border-l border-gray-300 dark:border-gray-700
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
                    className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1.5 rounded-full shadow-md md:hidden transition-all opacity-70 hover:opacity-100 z-50 ${isSidebarOpen ? "left-[17rem]" : "left-4"}`}
                    onClick={() => {
                        setIsSidebarOpen(!isSidebarOpen);
                        if (!isSidebarOpen) setIsRightDrawerOpen(false); // Close the right drawer if opening the left one
                    }}
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
                                        <div id="basic_connection">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">1. Basic Connection</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                This example demonstrates how to establish a basic connection to the WebSocket server :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `const socketlink = require("./socketlink-nodejs");

const client = new socketlink({
    clientApiKey: 'sl_d94600b5fefdbc8c03ae63053478ef3a8f338cae4fd6ac3e59bc2fa95d2198e3',
    adminApiKey: 'sl_b4c75523d7c37579df17facea3bdaebd311a2a45ad2fabc2c854e45b934acb62',
    connectionUrl: 'https://adisingh925.socketlink.io',
    uid: "test",
    metadata: "This is test users metadata"
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

/**
 * 
 * @param {*} msg - Server warning response after sending a message
 */
client.onWarn = (msg) => {
    console.log(msg);
}

/**
 * 
 * @param {*} err - Server error response due to websocket or server error
 */
client.onError = (err) => {
    console.log(err);
}

/**
 * 
 * @param {*} rid - If you get banned from a room you will get notified here
 */
client.onBanned = (rid) => {
    console.log("you are banned from room " + rid);
}

/**
 * 
 * @param {*} user - notify when a new user joins the state room
 */
client.onUserJoin = (metadata, rid) => {
    console.log("User joined : ", metadata + " to room " + rid);
}

/**
 * 
 * @param {*} user - notify when a user leaves the state room
 */
client.onUserLeave = (metadata, rid) => {
    console.log("User left : ", metadata + " from room " + rid);
}
`
                                                }}
                                            />
                                        </div>

                                        {/* Sending Messages */}
                                        <div id="subscribing_to_room">
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
                                        <div id="sending_messages">
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

                                        <div id="unsubscribe_from_room">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">4. Unsubscribe from a Room</h3>
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

                                        <div id="server_usage_metrics">
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

                                        <div id="sync_mysql">
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

                                        <div id="fetch_all_rooms">
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

                                        <div id="get_orphan_users">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">8. Get orphan users</h3>
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

                                        <div id="users_in_given_rooms">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">9. Get users in selected rooms</h3>
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

                                        <div id="get_all_uids">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">10. Get all uids</h3>
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

                                        <div id="get_rooms_for_given_uids">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">11. Get rooms for selected uids</h3>
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

                                        <div id="broadcast_message_to_everyone">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">12. Broadcast message to everyone</h3>
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

                                        <div id="broadcast_message_to_given_rooms">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">13. Broadcast message to given rooms</h3>
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

                                        <div id="broadcast_message_to_given_users">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">14. Broadcast message to given users</h3>
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

                                        <div id="ban_users_in_given_rooms">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">15. Ban users in given rooms</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to ban users from the given rooms, You can pass room ids as string array :
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

                                        <div id="ban_users_from_the_server">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">16. Ban users from the server</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to completely ban the users from the server :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.banUsersFromTheServer(["uid1", "uid2"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="unban_users_from_given_rooms">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">17. Unban users from given rooms</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to unban users from banned rooms :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.unbanUsersFromGivenRooms("pub-cache-test-groupchat", ["uid"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="unban_users_from_the_server">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">18. Unban users from the server</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to unban users from the server :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.unbanUsersFromTheServer(["uid"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="enable_disable_messaging_on_the_server">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">19. Enable/Disable messaging on the server</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to enable or disable the messaging for everyone connected to the server :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `/**
 * pass "enable" or "disable" to enable or disable messaging in server
 */
client.enableDisableMessagingInServer("enable").then((message) => {
    console.log("Enable/Disable messaging in server : ", message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="enable_disable_messaging_for_the_users_in_given_rooms">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">20. Enable/Disable messaging for the users in given rooms</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to enable or disable the messaging for selected users in selected rooms :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `/**
 * pass "enable" or "disable" to enable or disable messaging in server
 */
client.enableDisableMessagingInRoomsForGivenUsers("disable", "pub-cache-test-groupchat", ["uid"]).then((message) => {
    console.log("Enable/Disable messaging in server : ", message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="enable_disable_messaging_globally_for_the_given_users">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">21. Enable/Disable messaging globally for the given users</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to disable messaging for the given users across every room :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.enableDisableMessagingGloballyForGivenUsers("disable", ["uid"]).then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="get_banned_users">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">22. Get banned users</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all the banned users accross different rooms :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getBannedUsers().then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="get_users_with_messaging_disabled">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">23. Get users with messaging disabled</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch all the users with messaging disabled across all the rooms :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getUsersWithMessagingDisabled().then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="get_messages_for_cache_room">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">24. Get last message for cache room</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to fetch the last message for the subscribed cache room :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.getMessageForCacheRoom("pub-cache-test-groupchat", "uid").then((message) => {
    console.log(message);
}).catch((err) => {
    console.error(err.message);
});`
                                                }}
                                            />
                                        </div>

                                        <div id="truncate_local_database">
                                            <h3 className="text-2xl font-semibold dark:text-gray-300 text-gray-900 mb-4">25. Truncate local database</h3>
                                            <p className="dark:text-gray-300 text-gray-900 mb-5">
                                                You can use this method to clear the cache rooms database, All the stored messages will be deleted :
                                            </p>
                                            <CodeSnippet
                                                snippets={{
                                                    JavaScript: `client.deleteLocalDatabase().then((message) => {
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

                {/* Right Sidebar */}
                <aside
                    className={`w-64 
                        bg-gray-200 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#252525] 
                        p-8 pt-24 transition-all duration-300 ease-in-out 
                        ${isRightDrawerOpen ? "translate-x-0 z-10 shadow-lg" : "translate-x-64"} 
                        md:translate-x-0 fixed md:relative 
                        h-full overflow-y-auto 
                        border-l border-gray-300 dark:border-gray-700 
                        right-0 top-0`}
                >
                    <nav>
                        <ul className="space-y-6">
                            {[
                                {
                                    id: "overview",
                                    title: "Table of Contents",
                                    subcategories: [
                                        { name: "Installation", id: "installation" },
                                        { name: "Basic Connection", id: "basic_connection" },
                                        { name: "Subscribing to room", id: "subscribing_to_room" },
                                        { name: "Sending Messages", id: "sending_messages" },
                                        { name: "Unsubscribe from room", id: "unsubscribe_from_room" },
                                        { name: "Get server usage metrics", id: "server_usage_metrics" },
                                        { name: "Sync MySQL", id: "sync_mysql" },
                                        { name: "Fetch all rooms", id: "fetch_all_rooms" },
                                        { name: "Get orphan users", id: "get_orphan_users" },
                                        { name: "Get users in given rooms", id: "users_in_given_rooms" },
                                        { name: "Get rooms for all uids", id: "get_all_uids" },
                                        { name: "Get rooms for given uids", id: "get_rooms_for_given_uids" },
                                        { name: "Broadcast message to everyone", id: "broadcast_message_to_everyone" },
                                        { name: "Broadcast message to given rooms", id: "broadcast_message_to_given_rooms" },
                                        { name: "Broadcast message to given users", id: "broadcast_message_to_given_users" },
                                        { name: "Ban users in given rooms", id: "ban_users_in_given_rooms" },
                                        { name: "Ban users from the server", id: "ban_users_from_the_server" },
                                        { name: "Unban users from given rooms", id: "unban_users_from_given_rooms" },
                                        { name: "Unban users from the server", id: "unban_users_from_the_server" },
                                        { name: "Enable/Disable messaging on the server", id: "enable_disable_messaging_on_the_server" },
                                        { name: "Enable/Disable messaging for the users in given rooms", id: "enable_disable_messaging_for_the_users_in_given_rooms" },
                                        { name: "Enable/Disable messaging globally for the given users", id: "enable_disable_messaging_globally_for_the_given_users" },
                                        { name: "Get banned users", id: "get_banned_users" },
                                        { name: "Get users with messaging disabled", id: "get_users_with_messaging_disabled" },
                                        { name: "Get messages for cache room", id: "get_messages_for_cache_room" },
                                        { name: "Truncate local database", id: "truncate_local_database" },
                                    ]
                                }
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
                                                onClick={() => scrollToSection(sub.id)}
                                            >
                                                {sub.name}
                                            </li>
                                        ))}
                                    </ul>
                                    {index !== 0 && <hr className="border-gray-600 my-5" />}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Right Sidebar Toggle Button (Mobile) */}
                <button
                    className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1.5 rounded-full shadow-md md:hidden transition-all opacity-70 hover:opacity-100 z-50 ${isRightDrawerOpen ? "right-[17rem]" : "right-4"}`}
                    onClick={() => {
                        setIsRightDrawerOpen(!isRightDrawerOpen);
                        if (!isRightDrawerOpen) setIsSidebarOpen(false); // Close the left drawer if opening the right one
                    }}
                >
                    {isRightDrawerOpen ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </button>
            </div>
        </>
    );
}
