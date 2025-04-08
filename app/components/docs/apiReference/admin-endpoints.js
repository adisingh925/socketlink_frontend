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
    const [truncateDataResponsesTab, setTruncateDataResponsesTab] = useState('200');

    const colorClasses = {
        'green-400': 'border-green-800',
        'yellow-400': 'border-yellow-800',
        'red-400': 'border-red-800',
        'orange-400': 'border-orange-800',
        'pink-400': 'border-pink-800',
        'red-500': 'border-red-800',
    };

    const bgColorClasses = {
        'green-400': 'bg-green-800',
        'yellow-400': 'bg-yellow-800',
        'red-400': 'bg-red-800',
        'orange-400': 'bg-orange-800',
        'pink-400': 'bg-pink-800',
        'red-500': 'bg-red-800',
    };

    const truncateResponses = {
        '200': {
            message: "Database truncated successfully!",
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
    }

    const cacheResponses = {
        '200': {
            message: "Messaging successfully disabled for the users of the given rooms!",
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
            color: 'green-400',
            data: [
                {
                    rid: "pub-state-cache-test-0",
                    uid: [
                        "c901c777-31ff-4e5c-afb2-f67d9bf75059",
                        "cf38a9e4-d873-43a2-8bef-b9c40c8284f2"
                    ]
                }
            ]
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
            color: 'green-400',
            data: [
                {
                    rid: "pub-state-cache-test-0",
                    uid: [
                        "c901c777-31ff-4e5c-afb2-f67d9bf75059",
                        "cf38a9e4-d873-43a2-8bef-b9c40c8284f2"
                    ]
                },
                {
                    rid: "pub-state-cache-test-3",
                    uid: []
                }
            ]
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
    };

    const broadcastResponse = {
        '200': {
            message: "Successfully broadcasted the message to everyone on the server!",
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
            message: "Successfully broadcasted the message to the given rooms!",
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
            message: "Given users are successfully banned from the given rooms!",
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
            message: "Given users are successfully unbanned from the given rooms!",
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
            message: "Messaging successfully disabled for the given users in the given rooms!",
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
            message: "Messaging successfully enabled for the given users in the given rooms!",
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
            message: "Messaging successfully disabled for the users of the given rooms!",
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
        <section id="api" className="mb-14">
            <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">Admin Endpoints</h2>

            <p className="dark:text-gray-300 text-gray-900 mb-6">
                Detailed documentation on how to use our API endpoints effectively.
            </p>

            <div id="test_the_server" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">1. Test if server is running</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    Calling this api will return <code>Pong!</code>.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/ping
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
                                        ? `${bgColorClasses[pingResponses[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[pingResponses[pingResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
                                {"Pong!"}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{pingResponses[pingResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="fetch_resources" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">2. Fetch usage metrics</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    You can fetch the latest usage metrics of the allocated resources.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/metrics
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
                                        ? `${bgColorClasses[metricsResponses[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[metricsResponses[metricsResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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

            <div id="sync_mysql" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">3. Sync MySQL buffers</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    You can sync all the data stored in the server buffers to integrated MySQL server.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/mysql/sync
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
                                        ? `${bgColorClasses[syncResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[syncResponse[syncResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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

            <div id="fetch_all_rooms" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">4. Fetch all the rooms and their users</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will give all the rooms that are present and all the users present in each of the rooms.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/users/all
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
                                        ? `${bgColorClasses[roomResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[roomResponse[roomsResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    roomResponse[roomsResponsesTab].data
                                        ? roomResponse[roomsResponsesTab].data
                                        : {
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

            <div id="fetch_member_in_given_room" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">5. Fetch all the users for the given rooms</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will fetch all the users present in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/users
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
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-0&quot;,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&quot;pub-state-cache-test-3&quot;<br />
                            &nbsp;&nbsp;]<br />
                            &#125;
                        </pre>
                        {/* Body Key Descriptions */}
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
                            <li><code>rid :</code> Room ID for which you want to fetch the users.</li>
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
                                        ? `${bgColorClasses[roomMembersResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[roomMembersResponse[roomsMembersResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    roomMembersResponse[roomsMembersResponsesTab].data
                                        ? roomMembersResponse[roomsMembersResponsesTab].data
                                        : {
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

            <div id="send_message_to_everyone" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">6. Send a message to everyone connected on the server</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will send the given message to everyone connected to the server.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/broadcast
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[broadcastResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[broadcastResponse[broadcast].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{broadcastResponse[broadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="send_message_to_everyone_in_room" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">7. Send a message to everyone connected in a room</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will send message to all the users of the room.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/broadcast
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[roomBroadcastResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[roomBroadcastResponse[roomBroadcast].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{roomBroadcastResponse[roomBroadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="send_message_to_connection" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">8. Send a message to a particular connection</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will send message to given users.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/connections/broadcast
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[connectionBroadcastResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[connectionBroadcastResponse[connectionBroadcast].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{connectionBroadcastResponse[connectionBroadcast].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="ban_the_user" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">9. Ban the user globally or in a room</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will ban the user globally or in multiple rooms.
                </p>

                <div className="flex items-center space-x-3 bg-blue-50 border border-blue-400 shadow-md p-4 rounded-lg mb-6">
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
                        <p className="font-bold text-blue-600 items-center">
                            If a user is banned globally, he won&apos;t be able to connect to the server until he is unbanned. If the user is banned from some rooms, he will simply be unsubscribed from those rooms with a WebSocket message.
                        </p>
                    </div>
                </div>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/users/ban
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[banUserResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[banUserResponse[banUser].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{banUserResponse[banUser].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="unban_the_user" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">10. Unban the user globally or in a room</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will unban the user globally or in the provided rooms.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/users/unban
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[unbanUserResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[unbanUserResponse[unbanUser].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{unbanUserResponse[unbanUser].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="enable_messaging_for_everyone" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">11. Enable messaging for everyone</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will enable the messaging for everyone on the server.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/server/messaging/enable
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
                                        ? `${bgColorClasses[enableMessagingResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[enableMessagingResponse[enableMessaging].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{enableMessagingResponse[enableMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="disable_messaging_for_everyone" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">12. Disable messaging for everyone</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will disable the messaging for everyone on the server.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/server/messaging/disable
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
                                        ? `${bgColorClasses[disableMessagingResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[disableMessagingResponse[disableMessaging].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{disableMessagingResponse[disableMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="disable_messaging_in_rooms" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">13. Disable the messaging for selected uids in selected rooms</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will prevent the given users from sending the messages in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/messaging/disable
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[disableRoomMessagingResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[disableRoomMessagingResponse[disableRoomMessaging].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{disableRoomMessagingResponse[disableRoomMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="enable_messaging_in_rooms" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">14. Enable the messaging for selected uids in selected rooms</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will allow the given users from sending the messages in the given rooms.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-yellow-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/rooms/messaging/enable
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                                        ? `${bgColorClasses[enableRoomMessagingResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[enableRoomMessagingResponse[enableRoomMessaging].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{enableRoomMessagingResponse[enableRoomMessaging].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="fetch_the_banned_users" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">15. Get all the banned users across different rooms on the server</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will return a json object containing all the banned users across different rooms on the server.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/users/banned
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
                                        ? `${bgColorClasses[bannedUsersResponse[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[bannedUsersResponse[bannedUsersResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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
                            <p className="text-gray-400 text-sm mt-2">{bannedUsersResponse[bannedUsersResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="fetch_messages" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">16. Fetch the messages for the cache rooms</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will fetch the messages for the cache room which the user is connected to.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/messages/room
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
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
                        <ul className="dark:text-gray-300 text-gray-900 text-sm mt-2 space-y-1">
                            <li><code>limit :</code> Max number of latest messages you want to fetch, can&apos;t be more than 10</li>
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
                                        ? `${bgColorClasses[cacheResponses[code].color]} border border-white`
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
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[cacheResponses[cacheResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
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

            <div id="truncate_database" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">17. Truncate the cache rooms database</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will delete all the messages from the cache rooms database, It should only be used when all the space is filled up.
                </p>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            DEL
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/database
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
                            {Object.keys(truncateResponses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${truncateDataResponsesTab === code
                                        ? `${bgColorClasses[truncateResponses[code].color]} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setTruncateDataResponsesTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${truncateResponses[truncateDataResponsesTab].color}`}>{truncateDataResponsesTab} Response</strong>
                            <pre className={`mt-4 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 ${colorClasses[truncateResponses[truncateDataResponsesTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: truncateResponses[truncateDataResponsesTab].message,
                                        code: truncateResponses[truncateDataResponsesTab].code,
                                        ...(truncateResponses[truncateDataResponsesTab].roomId && { roomId: truncateResponses[truncateDataResponsesTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{truncateResponses[truncateDataResponsesTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminEndpoints;