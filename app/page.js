"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Show loading while checking auth
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-2xl font-bold">Welcome to Your App!</h1>
      <button
        onClick={handleLogout}
        className="rounded-full border border-solid border-black transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-red-700 text-sm px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}