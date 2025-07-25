const Introduction = () => (
    <section id="overview" className="mb-16 text-white">
        <h2 className="text-3xl font-bold dark:dark:text-gray-300 text-gray-900 mb-8">🚀 Introduction</h2>

        {/* Overview */}
        <div className="mb-10">
            <p className="dark:text-gray-300 text-gray-900">
                <strong>Welcome to the official documentation for <em className="dark:text-blue-400 text-blue-500">socketlink.io</em>!</strong>
                <br /><br />
                This guide will help you understand the core concepts, key features, and how to integrate real-time communication into your applications using our platform.
            </p>
        </div>

        {/* Important Note */}
        {/* <div className="mb-10 p-5 bg-yellow-500/10 border-l-4 border-yellow-400 rounded-xl">
            <h3 className="text-lg font-semibold dark:text-yellow-400 text-yellow-500">⚠️ Important Note</h3>
            <p className="mt-2 dark:text-gray-300 text-gray-900">
                We do not provide any client-side libraries. This ensures developers have full flexibility in choosing their own WebSocket implementations,
                preventing vendor lock-in and promoting an open ecosystem.
            </p>
        </div> */}

        {/* What is socketlink.io? */}
        <div className="mb-10">
            <h3 className="text-xl font-bold dark:text-blue-400 text-blue-500">⚡ What is <em>socketlink.io</em>?</h3>
            <p className="mt-2 dark:text-gray-300 text-gray-900">
                <strong><em>socketlink.io</em></strong> is a high-performance real-time communication platform designed for developers.
                It provides ultra-fast, scalable, and secure WebSocket connections, enabling seamless instant messaging,
                live updates, and interactive experiences.
            </p>
        </div>

        {/* What You'll Learn */}
        <div className="mb-10">
            <h3 className="text-xl font-bold dark:text-green-400 text-green-500">📚 What You’ll Learn</h3>
            <ul className="mt-2 space-y-3 list-disc list-inside dark:text-gray-300 text-gray-900">
                <li><strong>Getting Started -</strong> Set up a WebSocket server and connect clients effortlessly.</li>
                <li><strong>Features -</strong> Explore advanced functionalities like rooms, event broadcasting, presence tracking, and more.</li>
                <li><strong>API Reference -</strong> Understand the APIs and there usage in detail.</li>
                <li><strong>FAQ -</strong> Get answers to common questions and best practices.</li>
            </ul>
        </div>

        {/* Who Should Read This? */}
        <div>
            <h3 className="text-xl font-bold dark:text-yellow-400 text-yellow-500">💡 Who Should Read This?</h3>
            <ul className="mt-2 space-y-3 list-disc list-inside dark:text-gray-300 text-gray-900">
                <li>Developers building real-time applications like chat apps, live dashboards, or multiplayer games.</li>
                <li>Teams looking to integrate WebSockets into their platforms.</li>
                <li>Anyone interested in harnessing the power of <em>socketlink.io</em>.</li>
            </ul>
        </div>
    </section>
);

export default Introduction;
