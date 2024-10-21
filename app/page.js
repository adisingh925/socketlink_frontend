"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import NavigationBar from "./components/navbar";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setLoading(false); // User is authenticated, set loading to false
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    ); // Show loading while checking auth
  }

  return (
    <>
      <div className="flex flex-col h-[100dvh]">
        <NavigationBar />
        <div className="relative flex flex-col items-center justify-center flex-grow p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {/* Main Content */}
          <div className="z-10 text-center">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to Your Awesome App!
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md mx-auto">
              Connect, chat, and share with people around the world. We bring you
              the best way to communicate.
            </p>

            {/* Call to Action Button */}
            <a
              href="/dashboard" // Redirect to the dashboard or another page
              className="rounded-full bg-blue-500 text-white px-6 py-3 text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}