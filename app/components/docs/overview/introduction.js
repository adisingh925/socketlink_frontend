const Introduction = () => (
    <section id="overview" className="mb-16 p-6 text-white">
        <h2 className="text-3xl font-extrabold mb-6">🚀 Introduction</h2>

        <p className="text-lg mb-6">
            <strong>Welcome to the official documentation for <em className="text-blue-400">socketlink.io</em>!</strong>
            <br /><br />
            This guide will help you understand the core concepts, key features, and how to integrate real-time communication into your applications using our platform.
        </p>

        {/* Important Note */}
        <h3 className="text-lg font-semibold text-yellow-400">⚠️ Important Note</h3>
        <p className="mt-2">
            We do not provide any client-side libraries. This ensures developers have full flexibility in choosing their own WebSocket implementations, 
            preventing vendor lock-in and promoting an open ecosystem.
        </p>

        {/* What is socketlink.io? */}
        <h3 className="text-xl font-bold text-blue-400 mt-6">⚡ What is <em>socketlink.io</em>?</h3>
        <p className="mt-2">
            <strong><em>socketlink.io</em></strong> is a high-performance real-time communication platform designed for developers. 
            It provides ultra-fast, scalable, and secure WebSocket connections, enabling seamless instant messaging, 
            live updates, and interactive experiences.
        </p>

        {/* What You'll Learn */}
        <h3 className="text-xl font-bold text-green-400 mt-6">📚 What You’ll Learn</h3>
        <ul className="mt-2 space-y-2 list-disc list-inside">
            <li><strong>Getting Started -</strong> Set up a WebSocket server and connect clients effortlessly.</li>
            <li><strong>Features -</strong> Explore advanced functionalities like rooms, event broadcasting, presence tracking, and more.</li>
            <li><strong>API Reference -</strong> Understand WebSocket events and message formats in detail.</li>
            <li><strong>FAQ -</strong> Get answers to common questions and best practices.</li>
        </ul>

        {/* Who Should Read This? */}
        <h3 className="text-xl font-bold text-yellow-400 mt-6">💡 Who Should Read This?</h3>
        <ul className="mt-2 space-y-2 list-disc list-inside">
            <li>Developers building real-time applications like chat apps, live dashboards, or multiplayer games.</li>
            <li>Teams looking to integrate WebSockets into their platforms.</li>
            <li>Anyone interested in harnessing the power of <em>socketlink.io</em>.</li>
        </ul>
    </section>
);

export default Introduction;
