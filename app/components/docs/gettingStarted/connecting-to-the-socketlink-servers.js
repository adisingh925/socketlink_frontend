import CodeSnippet from "../../codeSnippet";

const ConnectingToTheSocketlinkServers = () => (
    <section id="getting-started" className="mb-14">
        <h2 className="text-3xl font-bold text-gray-300 mb-8">Connecting to the Socketlink servers</h2>
        <div className="space-y-8">
            {/* Step 1 */}
            <div className="space-y-4">
                <p className="text-gray-400">
                    <b>Step 1 :</b> Use any WebSocket library of your choice to connect to our servers. Below are some examples using popular libraries in different languages.
                </p>

                {/* Header Info */}
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
                        <ul className="list-disc list-inside ml-2 mt-2 text-sm text-gray-700">
                            <li><code>api-key</code> : Your <b>Client API Key</b>.</li>
                            <li><code>uid</code> : Unique ID for the connection/user (cannot be reused).</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Code Snippets */}
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

            {/* Connection Advice */}
            <p className="text-gray-400">
                This is all you need to do to connect to our servers. It is recommended to establish the connection when your application starts.
            </p>

            {/* Error Codes Section */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-red-400 mb-4">Possible Error Codes & Their Causes</h3>

                <div className="space-y-4">
                    {/* 400 */}
                    <div className="p-4 bg-yellow-800/20 border border-yellow-400 rounded-lg">
                        <strong className="text-yellow-300">400 - Bad Request</strong>
                        <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                            <li><code>uid</code> length must be between 1 and 4096 characters.</li>
                        </ul>
                    </div>

                    {/* 401 */}
                    <div className="p-4 bg-red-800/20 border border-red-400 rounded-lg">
                        <strong className="text-red-300">401 - Unauthorized</strong>
                        <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                            <li><code>api-key</code> is invalid.</li>
                        </ul>
                    </div>

                    {/* 403 */}
                    <div className="p-4 bg-orange-800/20 border border-orange-400 rounded-lg">
                        <strong className="text-orange-300">403 - Forbidden</strong>
                        <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                            <li><code>uid</code> is globally banned by the admin.</li>
                        </ul>
                    </div>

                    {/* 404 */}
                    <div className="p-4 bg-pink-800/20 border border-pink-400 rounded-lg">
                        <strong className="text-pink-300">409 Conflict</strong>
                        <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                            <li><code>uid</code> already exists.</li>
                        </ul>
                    </div>

                    {/* 503 */}
                    <div className="p-4 bg-pink-800/20 border border-pink-400 rounded-lg">
                        <strong className="text-pink-300">503 Service Unavailable</strong>
                        <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                            <li>Max websocket connections limit reached, try again after sometime!</li>
                        </ul>
                    </div>

                    {/* 500 */}
                    <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
                        <strong className="text-red-500">500 - Internal Server Error</strong>
                        <ul className="text-sm text-gray-300 mt-2 list-disc list-inside">
                            <li>Unexpected server issue.</li>
                            <li>Temporary outages or maintenance.</li>
                        </ul>
                        <p className="text-xs text-gray-500 mt-2">If this persists, contact support.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ConnectingToTheSocketlinkServers;
