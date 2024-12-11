"use client";

import NavigationBar from "../components/navbar";

export default function Docs() {
    return (
        <div className="flex flex-col h-[100dvh] text-white dark:bg-gray-900 overflow-y-auto">
            <NavigationBar />
            <div className="flex h-full md:px-10 px-4 pt-20">
                {/* Documentation Content */}
                <div className="flex-grow md:p-8 mt-4 rounded-md shadow-md">
                    {/* Section 1: Overview */}
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-300 mb-2">Overview</h2>
                        <p className="text-gray-400 mb-4">
                            Socketlink is a platform where different types of businesses can buy managed websocket infrastructure and can make their realtime solutions over it.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
