"use client";

import { useState } from "react";
import NavigationBar from "../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import CodeSnippet from "../components/codeSnippet";

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");

    const Overview = () => (
        <section id="overview" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Overview</h2>
            <p className="text-gray-400 mb-6">
                <strong>Welcome to the documentation for <em>socketlink.io</em>!</strong> <br /><br />
                This guide will help you understand the core concepts, features, and how to integrate real-time communication into your applications using our platform.
                <br /><br />
                🚀 <strong>What is socketlink.io?</strong><br /><br />
                <em>socketlink.io</em> is a powerful real-time communication platform built for developers. It offers super fast, highly scalable, and secure WebSocket connections, enabling instant messaging, live updates, and interactive experiences.
                <br /><br />
                📚 <strong>What You Will Find Here :</strong><br /><br />
                - <strong>Getting Started :</strong> Learn how to set up a WebSocket server and connect clients.<br />
                - <strong>Features :</strong> Explore advanced functionalities like rooms, event broadcasting, and presence tracking.<br />
                - <strong>API Reference :</strong> Get detailed information on WebSocket events and message formats.<br />
                - <strong>FAQ :</strong> Find solutions to common issues and best practices.<br /><br />
                💡 <strong>Who Should Read This?</strong><br /><br />
                - Developers building real-time applications (e.g., chat apps, live dashboards, multiplayer games).<br />
                - Teams integrating WebSockets into existing platforms.<br />
                - Anyone exploring socketlink.io’s capabilities.
            </p>
        </section>
    );

    const PurchasingGuide = () => (
        <section id="getting-started" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Purchasing Guide</h2>
            <div className="space-y-8">
                <p className="text-gray-400">
                    <b>Step 1 :</b> Go to our{" "}
                    <a
                        href="/pricing"
                        className="text-blue-400 hover:underline"
                    >
                        Pricing
                    </a>{" "}
                    page and select the plan suitable for your requirement.
                </p>

                <Image
                    src="/images/pricing.png"
                    alt="Pricing Page Preview"
                    width={800}
                    height={400}
                    className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
                />

                <p className="text-gray-400">
                    <b>Step 2 :</b> You will be asked to choose the region in which you want to setup your plan, It is advised to choose the region closest to your users for low latency.
                </p>

                <Image
                    src="/images/choose-plan-region.png"
                    alt="Choose Plan Region Preview"
                    width={800}
                    height={400}
                    className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
                />

                <p className="text-gray-400">
                    <b>Step 3 :</b> After choosing the suitable plan and upon completion of the payment,
                    you will be automatically redirected to the{" "}
                    <a
                        href="/my-plans"
                        className="text-blue-400 hover:underline"
                    >
                        My Plans
                    </a>{" "}
                    page, where you will be able to see the plan that you have chosen.
                </p>

                <Image
                    src="/images/my-plans.png"
                    alt="Pricing Page Preview"
                    width={800}
                    height={400}
                    className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
                />

                <p className="text-gray-400">
                    <b>Step 4 :</b> It will take a few minutes to get your plan ready and as soon as it will become ready the <b>Account Status</b> will become <b>Active</b>.
                </p>
            </div>
        </section>
    );

    const GettingStarted = () => (
        <section id="getting-started" className="mb-14">
            <h2 className="text-3xl font-bold text-gray-300 mb-4">Connecting to the Socketlink servers</h2>
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-gray-400">
                        <b>Step 1 :</b> Use any WebSocket library of your choice to connect to our servers. Below are some examples using some popular libraries in different languages.
                    </p>

                    <div className="flex items-start space-x-3 bg-blue-50 border border-blue-400 shadow-md p-4 rounded-lg">
                        <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M21 12a9 9 0 10-18 0 9 9 0 0018 0z"
                            />
                        </svg>
                        <div>
                            <p className="font-bold text-blue-600">Required Headers for WebSocket Connection</p>
                            <p className="mt-2 text-sm text-gray-700">
                                <ul className="list-disc list-inside ml-2 mt-2">
                                    <li><code>api-key</code> : Add your <b>Client API Key</b> in this header.</li>
                                    <li><code>uid</code> : Add an ID that uniquely defines the connection or the user, Cannot be reused.</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>

                <CodeSnippet
                    snippets={{
                        JavaScript: `
/** 
 * WebSocket Connection using Node.js and ws library 
 * Install: npm install ws 
 */

const WebSocket = require('ws');

/** WebSocket server URL */
const serverUrl = 'wss://your-websocket-server-url';

/** WebSocket headers */
const headers = {
  'api-key': 'client_api_key',
  'uid': 'user_unique_id' /** Unique identifier for the user */
};

/** Create WebSocket connection */
const socket = new WebSocket(serverUrl, { headers });

/** Handle WebSocket open event */
socket.on('open', () => {
  console.log('Connected to WebSocket server');
});

/** Handle WebSocket message event */
socket.on('message', (data) => {
  console.log('Received:', data);
});

/** Handle WebSocket error event */
socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

/** Handle WebSocket close event */
socket.on('close', () => {
  console.log('Connection closed');
});
    `,
                        Python: `
"""
WebSocket Connection using Python and websocket-client
Install: pip install websocket-client
"""

import websocket

# WebSocket server URL
server_url = "wss://your-websocket-server-url"

# Define WebSocket event handlers
def on_message(ws, message):
    """Handle incoming messages from the server"""
    print("Received:", message)

def on_open(ws):
    """Handle WebSocket connection open event"""
    print("Connected to WebSocket server")

# Set WebSocket headers
headers = {
    "api-key": "client_api_key",
    "uid": "user_unique_id"  # Unique identifier for the user
}

# Create WebSocket connection
ws = websocket.WebSocketApp(
    server_url, 
    header=headers, 
    on_message=on_message, 
    on_open=on_open
)

# Run WebSocket forever
ws.run_forever()
    `,
                        cURL: `
/**
 * WebSocket Connection using cURL
 * Note: WebSocket over cURL may be limited to initial handshake 
 */

curl \
  -H "api-key: client_api_key" \
  -H "uid: user_unique_id" \
  --include \
  --no-buffer \
  "wss://your-websocket-server-url"
    `,
                        Go: `
/**
 * WebSocket Connection using Go and Gorilla WebSocket library
 * Install: go get github.com/gorilla/websocket
 */

package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

/** Main function */
func main() {
	/** Set WebSocket headers */
	headers := http.Header{}
	headers.Set("api-key", "client_api_key")
	headers.Set("uid", "user_unique_id")

	/** WebSocket server URL */
	serverURL := "wss://your-websocket-server-url"

	/** Create WebSocket connection */
	conn, _, err := websocket.DefaultDialer.Dial(serverURL, headers)
	if err != nil {
		log.Fatal("Error connecting to WebSocket server:", err)
	}
	defer conn.Close()

	fmt.Println("Connected to WebSocket server")

	/** Read messages in a loop */
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}
		fmt.Println("Received:", string(message))
	}
}
    `,
                        Ruby: `
=begin
WebSocket Connection using Ruby and websocket-client-simple
Install: gem install websocket-client-simple
=end

require 'websocket-client-simple'

# WebSocket server URL
server_url = 'wss://your-websocket-server-url'

# Create WebSocket connection with headers
ws = WebSocket::Client::Simple.connect server_url, headers: {
  'api-key' => 'client_api_key',
  'uid' => 'user_unique_id'
}

# Handle WebSocket open event
ws.on :open do
  puts "Connected to WebSocket server"
end

# Handle WebSocket message event
ws.on :message do |msg|
  puts "Received: #{msg.data}"
end

# Handle WebSocket error event
ws.on :error do |e|
  puts "Error: #{e.message}"
end

# Handle WebSocket close event
ws.on :close do
  puts "Connection closed"
end

# Keep the connection alive
loop { sleep 1 }
    `
                    }}
                />

                <p className="text-gray-400">
                    This is all you need to do to connect to our servers, It is advised to perform this part when your application starts.
                </p>
            </div>
        </section>
    );


    const Features = () => (
        <section id="features" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Features</h2>
            <p className="text-gray-400 mb-6">
                Explore the various features and functionalities available in our application:<br /><br />
                - Real-time Messaging<br />
                - Private Rooms and Group Chats<br />
                - Typing Indicators and Presence Tracking<br />
                - Secure WebSocket Connections<br />
                - Event Broadcasting
            </p>
        </section>
    );

    const APIReference = () => (
        <section id="api" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">API Reference</h2>
            <p className="text-gray-400 mb-6">
                Detailed documentation on how to use our API endpoints effectively.<br /><br />
                <strong>WebSocket Events:</strong><br />
                - <code>connect</code>: Triggered when a client connects.<br />
                - <code>message</code>: Triggered when a message is sent.<br />
                - <code>disconnect</code>: Triggered when a client disconnects.<br /><br />
                <strong>Message Format:</strong><br />
                <code>{"{ event: 'message', data: 'Hello, world!' }"}</code>
            </p>
        </section>
    );

    const FAQ = () => (
        <section id="faq" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">FAQ</h2>
            <p className="text-gray-400 mb-6">
                Find answers to the most commonly asked questions about our platform.<br /><br />
                <strong>Q: What is socketlink.io?</strong><br />
                A: A real-time WebSocket communication platform.<br /><br />
                <strong>Q: Is socketlink.io free to use?</strong><br />
                A: We offer a free tier with premium plans for additional features.<br /><br />
                <strong>Q: How can I report an issue?</strong><br />
                A: Contact our support team via the help center.
            </p>
        </section>
    );

    const Rooms = () => (
        <section id="rooms" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Room Types</h2>
            <div className="space-y-8 text-gray-400 mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-6">Public Rooms</h3>
                    {/* <span className="font-mono text-green-400">Prefix: pub-</span><br /> */}
                    Anyone can join and participate in the public rooms.
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-6">Private Rooms</h3>
                    {/* <span className="font-mono text-green-400">Prefix: priv-</span><br /> */}
                    Restricted access rooms that require a verification from the <strong>Admin Server</strong>, Admin needs to enable <strong>ON_VERIFICATION_REQUEST</strong> webhook in order to use private rooms.
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-6">State Rooms</h3>
                    {/* <span className="font-mono text-green-400">Prefix: pub-state-</span><br /> */}
                    State rooms are useful when you want to want eveyone in the room to be aware of who is joining or leaving the room.
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-6">Cache Rooms</h3>
                    {/* <span className="font-mono text-green-400">Prefix: priv-state-</span><br /> */}
                    These rooms are useful when you want to retrieve last 10 messages that were sent in the room.
                </div>
            </div>
        </section>
    );

    const renderSection = () => {
        switch (activeSection) {
            case "Introduction":
                return <Overview />;
            case "How to Purchase":
                return <PurchasingGuide />;
            case "Connecting to the Socketlink servers":
                return <GettingStarted />;
            case "Room Types":
                return <Rooms />;
            case "features":
                return <Features />;
            case "api":
                return <APIReference />;
            case "faq":
                return <FAQ />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className={`w-64 bg-[#1a1a1a] p-10 pt-32 transition-transform ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} md:translate-x-0 fixed md:relative h-full shadow-md overflow-y-auto`}>
                <nav>
                    <ul className="space-y-5">
                        {[
                            {
                                id: "overview",
                                title: "Overview",
                                subcategories: ["Introduction", "Features", "Benefits"]
                            },
                            {
                                id: "purchasing-guide",
                                title: "Purchasing Guide",
                                subcategories: ["How to Purchase", "Payment Options", "Refund Policy"]
                            },
                            {
                                id: "getting-started",
                                title: "Getting Started",
                                subcategories: ["Connecting to the Socketlink servers", "Subscribing to a room", "Sending Messages", "Receiving Messages"]
                            },
                            {
                                id: "rooms",
                                title: "Rooms",
                                subcategories: ["Room Types", "Public Rooms", "Private Rooms", "State Rooms", "Cache Rooms"]
                            },
                            {
                                id: "api",
                                title: "API Reference",
                                subcategories: ["Authentication", "Endpoints", "Rate Limiting"]
                            },
                            {
                                id: "faq",
                                title: "FAQ",
                                subcategories: ["General Questions", "Technical Questions", "Billing Questions"]
                            }
                        ].map((item, index) => (
                            <li key={item.id}>
                                <div className="mb-2 text-gray-300 font-bold">
                                    {item.title}
                                </div>
                                <ul className="pl-4 space-y-2 text-sm">
                                    {item.subcategories.map((sub) => (
                                        <li
                                            key={sub}
                                            className={`cursor-pointer ${activeSection === sub ? "text-white font-bold" : "text-gray-500 hover:text-gray-300"}`}
                                            onClick={() => setActiveSection(sub)}
                                        >
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                                {index !== 5 && <hr className="border-gray-700 my-4" />}
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
                        {renderSection()}
                    </div>
                </main>
            </div>
        </div>
    );
}
