import { useState } from 'react';

const ClientEndpoints = () => {
    const [activeTab, setActiveTab] = useState('200');
    const [activeUnsubscribeTab, setActiveUnsubscribeTab] = useState('200');

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

    const responses = {
        '200': {
            status: 'success',
            message: 'Successfully updated the room for the uid!',
            color: 'green-400'
        },
        '400': {
            message: 'some error message',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access. Invalid API key!',
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

    const unsubscribeResponses = {
        '200': {
            status: 'success',
            message: 'Successfully unsubscribed from the given room!',
            color: 'green-400'
        },
        '400': {
            message: 'some error message',
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access. Invalid API key!',
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

    return (
        <section id="api" className="mb-14">
            <h2 className="text-3xl font-bold dark:text-gray-300 text-gray-900 mb-8">Client Endpoints</h2>

            <p className="dark:text-gray-300 text-gray-900 mb-6">
                Detailed documentation on how to use our API endpoints effectively.
            </p>

            <div id="subscribe_to_room" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">1. Subscribe to a room</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    If the specified room does not exist, it will be created automatically. If the room already exists, the user will join it.
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
                        <p className="font-bold text-blue-600 items-center">One user can join multiple rooms by calling this API multiple times!</p>
                    </div>
                </div>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 dark:border-white/20 border-gray-500/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/users/subscribe/room/<span className="text-green-400">$RID</span>
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="dark:text-blue-300 text-blue-500">Headers</strong>
                        <pre className="dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 dark:border-white/20 border-gray-500/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: <span className="text-green-400">$CLIENT_API_KEY</span><br />
                            uid: <span className="text-green-400">$CLIENT_UID</span>
                        </pre>
                    </div>

                    {/* Request Body */}


                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="dark:text-purple-300 text-purple-500 text-lg font-semibold mb-2">Responses</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(responses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${activeTab === code
                                        ? `${bgColorClasses[responses[code].color]} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setActiveTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${responses[activeTab].color}`}>{activeTab} Response</strong>
                            <pre className={`mt-2 dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 ${colorClasses[responses[activeTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: responses[activeTab].message,
                                        code: responses[activeTab].code,
                                        ...(responses[activeTab].roomId && { roomId: responses[activeTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{responses[activeTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="unsubscribe_from_room" className="mb-6">
                <h2 className="text-2xl font-bold dark:text-gray-300 text-gray-900 mb-8">2. Unsubscribe from a room</h2>

                <p className="dark:text-gray-300 text-gray-900 mb-6">
                    This will unsubscribe the user from the given room.
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
                        <p className="font-bold text-blue-600 items-center">If the user disconnects he will be automatically unsibscribed from all the rooms!</p>
                    </div>
                </div>

                {/* Endpoint URL */}
                <div className="dark:bg-gray-900 bg-white rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-green-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            GET
                        </span>
                        <pre className="dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 dark:border-white/20 border-gray-500/20 overflow-x-auto whitespace-nowrap">
                            https://test.socketlink.io/api/v1/users/unsubscribe/room<span className="text-green-400">$RID</span>
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="dark:text-blue-300 text-blue-500">Headers</strong>
                        <pre className="dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 dark:border-white/20 border-gray-500/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            api-key: <span className="text-green-400">$CLIENT_API_KEY</span><br />
                            uid: <span className="text-green-400">$CLIENT_UID</span>
                        </pre>
                    </div>

                    {/* Request Body */}
                    

                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="dark:text-purple-300 text-purple-500 text-lg font-semibold mb-2">Responses</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(unsubscribeResponses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${activeUnsubscribeTab === code
                                        ? `${bgColorClasses[unsubscribeResponses[code].color]} border border-white`
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => setActiveUnsubscribeTab(code)}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>

                        {/* Display Active Response */}
                        <div>
                            <strong className={`text-${unsubscribeResponses[activeUnsubscribeTab].color}`}>{activeUnsubscribeTab} Response</strong>
                            <pre className={`mt-2 dark:bg-gray-800 bg-gray-200 p-2 rounded-2xl text-sm dark:text-gray-200 text-gray-900 border-2 ${colorClasses[unsubscribeResponses[activeUnsubscribeTab].color] || ''} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        message: unsubscribeResponses[activeUnsubscribeTab].message,
                                        code: unsubscribeResponses[activeUnsubscribeTab].code,
                                        ...(unsubscribeResponses[activeUnsubscribeTab].roomId && { roomId: unsubscribeResponses[activeUnsubscribeTab].roomId })
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                            <p className="text-gray-400 text-sm mt-2">{unsubscribeResponses[activeUnsubscribeTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientEndpoints;
