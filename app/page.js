"use client";

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
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100dvh] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] text-white">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center flex-grow p-6 md:p-8 mt-20">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-wide">
            Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
            You can now easily integrate real-time communication into your applications using our powerful WebSocket infrastructure. With the API key we provide, you will have access to fast, reliable, and scalable WebSocket connections for building chat apps, live notifications, gaming, and more!

            Purchase a subscription today and start building amazing real-time applications with ease.
          </p>
        </div>

        {/* Service Description Section */}
        {/* <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Welcome to WebSocket-as-a-Service
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            You can now easily integrate real-time communication into your applications using our powerful WebSocket infrastructure.
            With the API key we provide, you will have access to fast, reliable, and scalable WebSocket connections for building chat apps, live notifications, gaming, and more!
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Purchase a subscription today and start building amazing real-time applications with ease.
          </p>
        </div> */}
      </div>
    </div>
  );
}
