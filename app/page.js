"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import NavigationBar from "./components/navbar";

export default function Home() {
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
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setLoading(false); // User is authenticated, set loading to false
        fetchStats(); // Fetch stats once user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  // Function to fetch dashboard stats
  const fetchStats = async () => {
    const response = await fetch("/api/stats"); // Replace with your actual API call to fetch stats
    const data = await response.json();
    setStats(data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    ); // Show loading while checking auth
  }

  return (
    <>
      <div className="flex flex-col h-[100dvh] bg-gray-900">
        <NavigationBar />
        <div className="flex flex-col items-center justify-center flex-grow p-6 md:p-8">
          {/* Main Content */}
          <div className="z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Dashboard</h1>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-sm md:max-w-md mx-auto">
              Overview of your WebSocket server statistics.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-10 max-w-md sm:max-w-3xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">Total Messages Sent</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-300 mt-2">{stats.totalMessages}</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">Connected Users</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-300 mt-2">{stats.connectedUsers}</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-white text-center">Average Payload Size</h2>
              <p className="text-3xl md:text-4xl font-semibold text-gray-300 mt-2">{stats.averagePayloadSize} KB</p>
            </div>
            {/* Add more stat cards as needed */}
          </div>
        </div>
      </div>
    </>
  );
}
