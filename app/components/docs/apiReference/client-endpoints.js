const ClientEndpoints = () => (
    <section id="api" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-300 mb-8">Client Endpoints</h2>

        <p className="text-gray-300 mb-6">
            Detailed documentation on how to use our API endpoints effectively.
        </p>

        <div className="mb-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">API Requests</h3>

            <div className="bg-gray-900 rounded-lg mb-4 space-y-4">
                <h4 className="text-green-300 text-base mb-4 flex flex-row items-center">
                    <span className="bg-pink-800 text-white px-2 py-1 rounded">POST</span>
                    <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20 ml-5">
                        /api/sendMessage
                    </pre>
                </h4>
                <p className="text-gray-300 mb-2">Send a message to a chat.</p>
                <div className="space-y-4">
                    <strong className="text-blue-300">Headers</strong>
                    <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20">
                        Content-Type: application/json<br />
                        Authorization: Bearer &lt;token&gt;
                    </pre>
                </div>
                <div className="space-y-4">
                    <strong className="text-yellow-300">Body</strong>
                    <pre className="bg-gray-800 p-2 rounded-2xl text-sm text-gray-200 border-2 border-white/20">
                        &#123;<br />
                        &nbsp;&nbsp;"recipient": "user123",<br />
                        &nbsp;&nbsp;"message": "Hello!"<br />
                        &#125;
                    </pre>
                </div>
            </div>
        </div>
    </section>
);

export default ClientEndpoints;
