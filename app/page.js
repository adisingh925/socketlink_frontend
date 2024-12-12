"use client";

import { useEffect, useState } from "react";
import { auth } from "./components/firebase";
import { useRouter } from "next/navigation";
import NavigationBar from "./components/navbar";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center h-[100dvh] text-white dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
      <NavigationBar />
      <div className="flex items-center justify-center px-6 py-10 mt-20 flex-grow dark:bg-gray-900">
        {/* Main Header */}
        {/* <div className="text-center mb-12"> */}
        {/* <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-wide">
            Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
            You can now easily integrate real-time communication into your applications using our powerful WebSocket infrastructure. Purchase a subscription today and start building amazing real-time applications with ease.
          </p> */}
        {/* </div> */}

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Existing Cards */}
          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Chat</h3>
            <p className="text-gray-400">Build powerful chat applications with minimal setup.</p>
          </div>

          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-5a2 2 0 112 0v5m3-5v10m-3-5a2 2 0 11-4 0m7-4v-2a4 4 0 10-8 0v2a4 4 0 008 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Connections</h3>
            <p className="text-gray-400">Experience top-notch security for your data and users.</p>
          </div>

          {/* New Cards */}
          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 3v12m6-12v12m6-8v8m-6-4h-6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Live Streaming</h3>
            <p className="text-gray-400">Stream video and audio in real-time to large audiences.</p>
          </div>

          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V9m0 0l-5 5m5-5l5 5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaborative Editing</h3>
            <p className="text-gray-400">Edit documents in real-time with multiple participants.</p>
          </div>

          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18l6-6m0 0l6-6m-6 6l6 6m-6-6H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Gaming</h3>
            <p className="text-gray-400">Enable fast-paced multiplayer gaming experiences.</p>
          </div>

          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Stock Market Feeds</h3>
            <p className="text-gray-400">Stream stock market updates instantly to your users.</p>
          </div>

          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">IoT Communication</h3>
            <p className="text-gray-400">Control IoT devices and receive live updates effortlessly.</p>
          </div>

          <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-center text-white rounded-2xl shadow-xl border border-white/20">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12m-6-6v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sports Updates</h3>
            <p className="text-gray-400">Provide live sports scores and commentary to fans.</p>
          </div>
        </div>
      </div>
    </div>
  );
}