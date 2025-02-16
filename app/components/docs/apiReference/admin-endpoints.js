import { useState } from 'react';

const AdminEndpoints = () => {
    const [pingResponsesTab, setPingResponsesTab] = useState('200');
    const [metricsResponsesTab, setMetricsResponsesTab] = useState('200');


    const pingResponses = {
        '200': {
            status: 'success',
            message: 'Successfully updated the room for the uid!',
            code: 7481,
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
            code: 7598,
            color: 'green-400'
        },
        '400': {
            message: 'some error message',
            code: "some code",
            color: 'yellow-400'
        },
        '401': {
            message: 'Unauthorized access. Invalid API key!',
            code: 3203,
            color: 'red-400'
        },
        '403': {
            message: 'some error message',
            code: "some code",
            color: 'orange-400'
        },
        '404': {
            message: 'some error message',
            code: "some code",
            color: 'pink-400'
        },
        '500': {
            message: 'Internal server error!',
            code: 5000,
            description: 'Occurs when an unexpected server error happens.',
            color: 'red-500'
        }
    };

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
                            <pre className={`mt-2 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${pingResponses[pingResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
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
                            Content-Type: application/json<br />
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
                            <pre className={`mt-2 bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-${metricsResponses[metricsResponsesTab].color} overflow-x-auto whitespace-pre-wrap`}>
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
        </section>
    );
};

export default AdminEndpoints;