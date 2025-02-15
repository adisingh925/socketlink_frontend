const RoomTypes = () => (
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

export default RoomTypes;