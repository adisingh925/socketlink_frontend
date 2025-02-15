import { useState } from 'react';

const ClientEndpoints = () => {
    const [activeTab, setActiveTab] = useState('200');

    const responses = {
        '200': {
            status: 'success',
            message: 'Room subscription updated successfully',
            roomId: 'abc123',
            description: 'This response indicates that the room subscription was successful.',
            color: 'green-400'
        },
        '400': {
            status: 'error',
            message: 'Invalid request body',
            description: 'Occurs when required fields are missing or have invalid types.',
            color: 'yellow-400'
        },
        '401': {
            status: 'error',
            message: 'Invalid or missing authorization token',
            description: 'Occurs when the Authorization header is missing or invalid.',
            color: 'red-400'
        },
        '403': {
            status: 'error',
            message: 'You do not have permission to access this room',
            description: 'Occurs when the user is authenticated but lacks access to the requested room.',
            color: 'orange-400'
        },
        '404': {
            status: 'error',
            message: 'Room not found',
            description: 'Occurs when the specified room ID does not exist.',
            color: 'pink-400'
        },
        '500': {
            status: 'error',
            message: 'An unexpected error occurred. Please try again later',
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    };

    return (
        <section id="api" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Client Endpoints</h2>

            <p className="text-gray-300 mb-6">
                Detailed documentation on how to use our API endpoints effectively.
            </p>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-300 mb-8">1. Subscribe to a room</h2>

                {/* Endpoint URL */}
                <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                    <h4 className="text-green-300 text-base mb-4 flex flex-row items-center flex-nowrap">
                        <span className="bg-pink-800 text-white px-2 py-1 rounded mr-3 shrink-0">
                            POST
                        </span>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            https://adisingh925.socketlink.io/api/v1/connections/update/room
                        </pre>
                    </h4>

                    {/* Headers */}
                    <div className="space-y-4">
                        <strong className="text-blue-300">Headers</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            Content-Type: application/json<br />
                            Authorization: Bearer &lt;token&gt;
                        </pre>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-4">
                        <strong className="text-yellow-300">Body</strong>
                        <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 overflow-x-auto whitespace-nowrap">
                            &#123;<br />
                            &nbsp;&nbsp;&quot;recipient&quot;: &quot;user123&quot;,<br />
                            &nbsp;&nbsp;&quot;message&quot;: &quot;Hello!&quot;<br />
                            &#125;
                        </pre>
                    </div>

                    {/* Response Tabs */}
                    {/* Response Tabs */}
                    <div className="space-y-4 mt-6">
                        <h3 className="text-purple-300 text-lg font-semibold mb-2">Responses</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.keys(responses).map((code) => (
                                <button
                                    key={code}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-colors ${activeTab === code
                                        ? `bg-${responses[code].color} border border-white`
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
                            <pre className={`mt-2 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${responses[activeTab].color} overflow-x-auto whitespace-pre-wrap`}>
                                {JSON.stringify(
                                    {
                                        status: responses[activeTab].status,
                                        message: responses[activeTab].message,
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
        </section>
    );
};

export default ClientEndpoints;
