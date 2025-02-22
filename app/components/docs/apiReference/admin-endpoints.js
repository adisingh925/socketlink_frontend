import { useState } from 'react';

const AdminEndpoints = () => {
    const [pingResponsesTab, setPingResponsesTab] = useState('200');
    const [metricsResponsesTab, setMetricsResponsesTab] = useState('200');
    const [syncResponsesTab, setSyncResponsesTab] = useState('200');
    const [roomsResponsesTab, setRoomsResponsesTab] = useState('200');
    const [roomsMembersResponsesTab, setRoomsMembersResponsesTab] = useState('200');
    const [broadcast, setBroadcast] = useState('200');
    const [roomBroadcast, setRoomBroadcast] = useState('200');
    const [connectionBroadcast, setConnectionBroadcast] = useState('200');
    const [banUser, setBanUser] = useState('200');
    const [unbanUser, setUnbanUser] = useState('200');
    const [enableMessaging, setEnableMessaging] = useState('200');
    const [disableMessaging, setDisableMessaging] = useState('200');
    const [disableRoomMessaging, setDisableRoomMessaging] = useState('200');
    const [enableRoomMessaging, setEnableRoomMessaging] = useState('200');
    const [bannedUsersResponsesTab, setBannedUsersResponsesTab] = useState('200');
    const [cacheResponsesTab, setCacheResponsesTab] = useState('200');

    const cacheResponses = {
        '200': {
            message: "Messaging successfully disabled for the members of the given rooms!",
            color: 'green-400'
        },
        '400': {
            message: 'Limit cannot be greater than 10!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '403': {
            message: 'Access denied!',
            color: 'orange-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const pingResponses = {
        '200': {
            status: 'success',
            message: 'Successfully updated the room for the uid!',
            color: 'green-400'
        },
    };

    const metricsResponses = {
        '200': {
            connections: 0,
            messages_sent: 0,
            average_payload_size: 0.000000,
            total_payload_sent: 1848562260,
            total_rejected_requests: 16,
            average_latency: 0.000000,
            dropped_messages: 0,
            color: 'green-400'
        },
        '400': {
            message: 'some error message',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '403': {
            message: 'some error message',
            color: 'orange-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    };

    const syncResponse = {
        '200': {
            message: "MySQL data synced successfully!",
            color: 'green-400'
        },
        '400': {
            message: 'some error message',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '403': {
            message: 'MySQL integration is disabled!',
            color: 'orange-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    };

    const roomResponse = {
        '200': {
            message: "MySQL data synced successfully!",
            color: 'green-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    };

    const roomMembersResponse = {
        '200': {
            message: "MySQL data synced successfully!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const broadcastResponse = {
        '200': {
            message: "Successfully broadcasted the message to the given room!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const roomBroadcastResponse = {
        '200': {
            message: "Successfully broadcasted the message to the given room!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const connectionBroadcastResponse = {
        '200': {
            message: "Successfully broadcasted the message to the given connections!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const banUserResponse = {
        '200': {
            message: "Given members are successfully banned from the given rooms!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const unbanUserResponse = {
        '200': {
            message: "Members are successfully unbanned from the given rooms!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const enableMessagingResponse = {
        '200': {
            message: "Messaging successfully enabled for everyone!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const disableMessagingResponse = {
        '200': {
            message: "Messaging successfully disabled for everyone!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const disableRoomMessagingResponse = {
        '200': {
            message: "Messaging successfully disabled for the given members in the given rooms!!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const enableRoomMessagingResponse = {
        '200': {
            message: "Messaging successfully enabled for the given members in the given rooms!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    const bannedUsersResponse = {
        '200': {
            message: "Messaging successfully disabled for the members of the given rooms!",
            color: 'green-400'
        },
        '400': {
            message: 'Invalid JSON format!',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access, Invalid API key!',
            color: 'red-400'
        },
        '404': {
            message: 'some error message',
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    }

    return (
        <section id="api" className="mb-14 space-y-10">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Admin Endpoints</h2>

            <p className="text-gray-300 mb-6">
                Detailed documentation on how to use our API endpoints effectively.
            </p>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">1. Test if server is running</h2>

                <p className="text-gray-300 mb-6">
                    Calling this api will return <code>Pong!</code>.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://adisingh925.socketlink.io/api/v1/ping
                        </pre>
                    </h4>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(pingResponses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${pingResponsesTab === code
                                        ? `bg-${pingResponses[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setPingResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${pingResponses[pingResponsesTab].color}`}>{pingResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${pingResponses[pingResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {"Pong!"}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{pingResponses[pingResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">2. Fetch usage metrics</h2>

                <p className="text-gray-300 mb-6">
                    You can fetch the latest usage metrics of the allocated resources.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://adisingh925.socketlink.io/api/v1/metrics
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(metricsResponses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${metricsResponsesTab === code
                                        ? `bg-${metricsResponses[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setMetricsResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${metricsResponses[metricsResponsesTab].color}`}>{metricsResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${metricsResponses[metricsResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        connections: metricsResponses[metricsResponsesTab].connections,
                                        messages_sent: metricsResponses[metricsResponsesTab].messages_sent,
                                        average_payload_size: metricsResponses[metricsResponsesTab].average_payload_size,
                                        total_payload_sent: metricsResponses[metricsResponsesTab].total_payload_sent,
                                        total_rejected_requests: metricsResponses[metricsResponsesTab].total_rejected_requests,
                                        average_latency: metricsResponses[metricsResponsesTab].average_latency,
                                        dropped_messages: metricsResponses[metricsResponsesTab].dropped_messages,
                                        message: metricsResponses[metricsResponsesTab].message,
                                        code: metricsResponses[metricsResponsesTab].code,
                                        ...(metricsResponses[metricsResponsesTab].roomId && { roomId: metricsResponses[metricsResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{metricsResponses[metricsResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">3. Sync MySQL buffers</h2>

                <p className="text-gray-300 mb-6">
                    You can sync all the data stored in the server buffers to integrated MySQL server.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://adisingh925.socketlink.io/api/v1/mysql/sync
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(syncResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${syncResponsesTab === code
                                        ? `bg-${syncResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setSyncResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${syncResponse[syncResponsesTab].color}`}>{syncResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${syncResponse[syncResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: syncResponse[syncResponsesTab].message,
                                        code: syncResponse[syncResponsesTab].code,
                                        ...(syncResponse[syncResponsesTab].roomId && { roomId: syncResponse[syncResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{syncResponse[syncResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">4. Fetch all the rooms and their members</h2>

                <p className="text-gray-300 mb-6">
                    This will give all the rooms that are present and all the members present in each of the rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://adisingh925.socketlink.io/api/v1/rooms
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(roomResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${roomsResponsesTab === code
                                        ? `bg-${roomResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setRoomsResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${roomResponse[roomsResponsesTab].color}`}>{roomsResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${roomResponse[roomsResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: roomResponse[roomsResponsesTab].message,
                                        code: roomResponse[roomsResponsesTab].code,
                                        ...(roomResponse[roomsResponsesTab].roomId && { roomId: roomResponse[roomsResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomResponse[roomsResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">5. Fetch all the members for the given rooms</h2>

                <p className="text-gray-300 mb-6">
                    This will fetch all the members present in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/connections
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;rid&quot;: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-2&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-3&quot;<br />
                            &nbsp;&nbsp;]<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Room ID for which you want to fetch the members.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(roomMembersResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${roomsMembersResponsesTab === code
                                        ? `bg-${roomMembersResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setRoomsMembersResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${roomMembersResponse[roomsMembersResponsesTab].color}`}>{roomsMembersResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${roomMembersResponse[roomsMembersResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: roomMembersResponse[roomsMembersResponsesTab].message,
                                        code: roomMembersResponse[roomsMembersResponsesTab].code,
                                        ...(roomMembersResponse[roomsMembersResponsesTab].roomId && { roomId: roomMembersResponse[roomsMembersResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[roomsMembersResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">6. Fetch all the members in a room.</h2>

                <p className="text-gray-300 mb-6">
                    This will fetch all the members present in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/connections
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;rid&quot;: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-2&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-3&quot;<br />
                            &nbsp;&nbsp;]<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Room ID for which you want to fetch the members.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(roomMembersResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${roomsMembersResponsesTab === code
                                        ? `bg-${roomMembersResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setRoomsMembersResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${roomMembersResponse[roomsMembersResponsesTab].color}`}>{roomsMembersResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${roomMembersResponse[roomsMembersResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: roomMembersResponse[roomsMembersResponsesTab].message,
                                        code: roomMembersResponse[roomsMembersResponsesTab].code,
                                        ...(roomMembersResponse[roomsMembersResponsesTab].roomId && { roomId: roomMembersResponse[roomsMembersResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[roomsMembersResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">7. Send a message to everyone connected on the server</h2>

                <p className="text-gray-300 mb-6">
                    This will fetch all the members present in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/broadcast
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;message&quot;: &quot;hello friends!&quot;<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>message :</code> Insert the message that you want to send to everyone on the server.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(broadcastResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${broadcast === code
                                        ? `bg-${broadcastResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setBroadcast(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${broadcastResponse[broadcast].color}`}>{broadcast} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${broadcastResponse[broadcast].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: broadcastResponse[broadcast].message,
                                        code: broadcastResponse[broadcast].code,
                                        ...(broadcastResponse[broadcast].roomId && { roomId: broadcastResponse[broadcast].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[broadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">8. Send a message to everyone connected in a room.</h2>

                <p className="text-gray-300 mb-6">
                    This will send message to all the members of the room.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/broadcast
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;message&quot;: &quot;hello friends!&quot;<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>message :</code> Insert the message that you want to send to a room on the server.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(broadcastResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${broadcast === code
                                        ? `bg-${broadcastResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setBroadcast(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${broadcastResponse[broadcast].color}`}>{broadcast} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${broadcastResponse[broadcast].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: broadcastResponse[broadcast].message,
                                        code: broadcastResponse[broadcast].code,
                                        ...(broadcastResponse[broadcast].roomId && { roomId: broadcastResponse[broadcast].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[broadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">9. Send a message to everyone connected in a room</h2>

                <p className="text-gray-300 mb-6">
                    This will send message to all the members of the room.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/broadcast
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;rid&quot;: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-3&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-2&quot;<br />
                            &nbsp;&nbsp;],<br />
                            &nbsp;&nbsp;&quot;message&quot;: &quot;this is for 3 and 2&quot;<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Insert all the rids you want to send the message to.</li>
                            <li><code>message :</code> Insert the message that you want to send to the given rooms.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(roomBroadcastResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${roomBroadcast === code
                                        ? `bg-${roomBroadcastResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setRoomBroadcast(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${roomBroadcastResponse[roomBroadcast].color}`}>{roomBroadcast} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${roomBroadcastResponse[roomBroadcast].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: roomBroadcastResponse[roomBroadcast].message,
                                        code: roomBroadcastResponse[roomBroadcast].code,
                                        ...(roomBroadcastResponse[roomBroadcast].roomId && { roomId: roomBroadcastResponse[roomBroadcast].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[roomBroadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">10. Send a message to a particular connection</h2>

                <p className="text-gray-300 mb-6">
                    This will send message to given connections.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/connections/broadcast
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;uid&quot;: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;test2&quot;<br />
                            &nbsp;&nbsp;],<br />
                            &nbsp;&nbsp;&quot;message&quot;: &quot;this is for test and test2&quot;<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>uid :</code> Insert all the uids you want to send the message to.</li>
                            <li><code>message :</code> Insert the message that you want to send to the given connections.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(connectionBroadcastResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${connectionBroadcast === code
                                        ? `bg-${connectionBroadcastResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setConnectionBroadcast(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${connectionBroadcastResponse[connectionBroadcast].color}`}>{connectionBroadcast} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${connectionBroadcastResponse[connectionBroadcast].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: connectionBroadcastResponse[connectionBroadcast].message,
                                        code: connectionBroadcastResponse[connectionBroadcast].code,
                                        ...(connectionBroadcastResponse[connectionBroadcast].roomId && { roomId: connectionBroadcastResponse[connectionBroadcast].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[connectionBroadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">11. Ban the user globally or in a room</h2>

                <p className="text-gray-300 mb-6">
                    This will ban the user globally or in the provided rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/ban
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            [<br />
                            &nbsp;&nbsp;&#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;rid&quot;: &quot;global&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;uid&quot;: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test2&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test3&quot;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;]<br />
                            &nbsp;&nbsp;&#125;<br />
                            ]
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Insert the rid where you want to ban the provided uids.</li>
                            <li><code>uid :</code> Insert all the uids you want to ban in a given room.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(banUserResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${banUser === code
                                        ? `bg-${banUserResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setBanUser(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${banUserResponse[banUser].color}`}>{banUser} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${banUserResponse[banUser].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: banUserResponse[banUser].message,
                                        code: banUserResponse[banUser].code,
                                        ...(banUserResponse[banUser].roomId && { roomId: banUserResponse[banUser].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[banUser].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">12. Unban the user globally or in a room</h2>

                <p className="text-gray-300 mb-6">
                    This will unban the user globally or in the provided rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/unban
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            [<br />
                            &nbsp;&nbsp;&#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;rid&quot;: &quot;global&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;uid&quot;: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test2&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;test3&quot;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;]<br />
                            &nbsp;&nbsp;&#125;<br />
                            ]
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Insert the rid where you want to unban the provided uids.</li>
                            <li><code>uid :</code> Insert all the uids you want to unban in a given room.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(unbanUserResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${unbanUser === code
                                        ? `bg-${unbanUserResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setUnbanUser(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${unbanUserResponse[unbanUser].color}`}>{unbanUser} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${unbanUserResponse[unbanUser].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: unbanUserResponse[unbanUser].message,
                                        code: unbanUserResponse[unbanUser].code,
                                        ...(unbanUserResponse[unbanUser].roomId && { roomId: unbanUserResponse[unbanUser].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[unbanUser].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">13. Enable messaging for everyone</h2>

                <p className="text-gray-300 mb-6">
                    This will enable the messaging for everyone on the server.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/server/messaging/enable
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(enableMessagingResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${enableMessaging === code
                                        ? `bg-${enableMessagingResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setEnableMessaging(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${enableMessagingResponse[enableMessaging].color}`}>{enableMessaging} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${enableMessagingResponse[enableMessaging].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: enableMessagingResponse[enableMessaging].message,
                                        code: enableMessagingResponse[enableMessaging].code,
                                        ...(enableMessagingResponse[enableMessaging].roomId && { roomId: enableMessagingResponse[enableMessaging].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[enableMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">14. Disable messaging for everyone</h2>

                <p className="text-gray-300 mb-6">
                    This will disable the messaging for everyone on the server.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/server/messaging/disable
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(disableMessagingResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${disableMessaging === code
                                        ? `bg-${disableMessagingResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setDisableMessaging(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${disableMessagingResponse[disableMessaging].color}`}>{disableMessaging} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${disableMessagingResponse[disableMessaging].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: disableMessagingResponse[disableMessaging].message,
                                        code: disableMessagingResponse[disableMessaging].code,
                                        ...(disableMessagingResponse[disableMessaging].roomId && { roomId: disableMessagingResponse[disableMessaging].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[disableMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">15. Disable the messaging for selected uids in selected rooms</h2>

                <p className="text-gray-300 mb-6">
                    This will prevent the given users from sending the messages in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/messaging/disable
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(
                                [
                                    {
                                        rid: "global",
                                        uid: ["test", "test2", "test3"]
                                    },
                                    {
                                        rid: "pub-state-cache-test-2",
                                        uid: ["test", "test2"]
                                    }
                                ],
                                null,
                                2
                            )}
                        </pre>

                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Insert the rid where you want to stop the message sending.</li>
                            <li><code>uid :</code> Insert all the uids that you want to prevent sending messages to the corresponding rid.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(disableRoomMessagingResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${disableRoomMessaging === code
                                        ? `bg-${disableRoomMessagingResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setDisableRoomMessaging(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${disableRoomMessagingResponse[disableRoomMessaging].color}`}>{disableRoomMessaging} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${disableRoomMessagingResponse[disableRoomMessaging].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: disableRoomMessagingResponse[disableRoomMessaging].message,
                                        code: disableRoomMessagingResponse[disableRoomMessaging].code,
                                        ...(disableRoomMessagingResponse[disableRoomMessaging].roomId && { roomId: disableRoomMessagingResponse[disableRoomMessaging].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[disableRoomMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">15. Enable the messaging for selected uids in selected rooms</h2>

                <p className="text-gray-300 mb-6">
                    This will allow the given users from sending the messages in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/rooms/messaging/enable
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(
                                [
                                    {
                                        rid: "global",
                                        uid: ["test", "test2", "test3"]
                                    },
                                    {
                                        rid: "pub-state-cache-test-2",
                                        uid: ["test", "test2"]
                                    }
                                ],
                                null,
                                2
                            )}
                        </pre>

                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Insert the rid where you want to enable the message sending and was previously disabled</li>
                            <li><code>uid :</code> Insert all the uids that you want to allow sending messages to the corresponding rid, where it was previously disabled</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(enableRoomMessagingResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${enableRoomMessaging === code
                                        ? `bg-${enableRoomMessagingResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setEnableRoomMessaging(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${enableRoomMessagingResponse[enableRoomMessaging].color}`}>{enableRoomMessaging} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${enableRoomMessagingResponse[enableRoomMessaging].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: enableRoomMessagingResponse[enableRoomMessaging].message,
                                        code: enableRoomMessagingResponse[enableRoomMessaging].code,
                                        ...(enableRoomMessagingResponse[enableRoomMessaging].roomId && { roomId: enableRoomMessagingResponse[enableRoomMessaging].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[enableRoomMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">15. Get all the banned users across different rooms on the server</h2>

                <p className="text-gray-300 mb-6">
                    This will return a json object containing all the banned users across different rooms on the server.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/connections/banned
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(bannedUsersResponse).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${bannedUsersResponsesTab === code
                                        ? `bg-${bannedUsersResponse[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setBannedUsersResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${bannedUsersResponse[bannedUsersResponsesTab].color}`}>{bannedUsersResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${bannedUsersResponse[bannedUsersResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: bannedUsersResponse[bannedUsersResponsesTab].message,
                                        code: bannedUsersResponse[bannedUsersResponsesTab].code,
                                        ...(bannedUsersResponse[bannedUsersResponsesTab].roomId && { roomId: bannedUsersResponse[bannedUsersResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{roomMembersResponse[bannedUsersResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">17. Fetch the messages for the cache rooms</h2>

                <p className="text-gray-300 mb-6">
                    This will fetch the messages for the cache room which the user is connected to.
                </p>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            http://localhost:9002/api/v1/messages/room
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            api-key: ADMIN_API_KEY
                        </pre>
                    </div>

                    <div className="space-y-4">
                        <strong className="text-blue-300">Path Parameters</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            rid
                        </pre>

                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Replace the rid with the one you are connected to.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <strong className="text-blue-300">Query Parameters</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            limit: 10<br />
                            offset: 0<br />
                        </pre>

                        {/* Body Key Descriptions */}
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            <li><code>limit :</code> Max number of latest messages you want to fetch, can't be more than 10</li>
                            <li><code>uid :</code> Use the offset if you want to fetch more previous messages.</li>
                        </ul>
                    </div>

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Response</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(cacheResponses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${cacheResponsesTab === code
                                        ? `bg-${cacheResponses[code].color} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setCacheResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${cacheResponses[cacheResponsesTab].color}`}>{cacheResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${cacheResponses[cacheResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: cacheResponses[cacheResponsesTab].message,
                                        code: cacheResponses[cacheResponsesTab].code,
                                        ...(cacheResponses[cacheResponsesTab].roomId && { roomId: cacheResponses[cacheResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{cacheResponses[cacheResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminEndpoints;