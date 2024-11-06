"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "../components/firebase"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import NavigationBar from "../components/navbar";

export default function Metrics() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Loading state
    const [stats, setStats] = useState({
        totalMessages: 0,
        connectedUsers: 0,
        averagePayloadSize: 0,
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
                fetchStats();
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchStats = async () => {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setStats(data);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100dvh] bg-gray-900 text-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-900 text-white">
                <NavigationBar />
                <div className="flex flex-col items-center justify-center flex-grow p-6 md:p-8">
                    {/* Main Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-wide">
                            Metrics
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
                            Real-time overview of your WebSocket server performance and user activity.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                        <StatCard
                            title="Messages Sent"
                            stat={stats.totalMessages}
                            color="bg-gradient-to-r from-blue-500 to-blue-700"
                        />
                        <StatCard
                            title="Connected Users"
                            stat={stats.connectedUsers}
                            color="bg-gradient-to-r from-green-500 to-green-700"
                        />
                        <StatCard
                            title="Average Payload Size"
                            stat={`${stats.averagePayloadSize} KB`}
                            color="bg-gradient-to-r from-purple-500 to-purple-700"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

// Reusable StatCard component
function StatCard({ title, stat, color }) {
    return (
        <div className={`${color} rounded-lg shadow-md p-6 transition-transform transform hover:scale-105`}>
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">{title}</h2>
            <p className="text-4xl md:text-5xl font-bold text-center">{stat}</p>
        </div>
    );
}
