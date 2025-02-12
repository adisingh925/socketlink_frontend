"use client";

import { useState } from "react";
import NavigationBar from "../components/navbar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const sections = [
    { id: "overview", title: "Overview" },
    { id: "getting-started", title: "Getting Started" },
    { id: "features", title: "Features" },
    { id: "api", title: "API Reference" },
    { id: "faq", title: "FAQ" }
];

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-[100dvh] text-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className={`w-64 bg-gray-800 p-10 pt-24 transition-transform ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} md:translate-x-0 fixed md:relative h-full shadow-md`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Documentation</h2>
                </div>
                <nav>
                    <ul className="space-y-5">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a href={`#${section.id}`} className="block text-gray-300 hover:text-white">
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Sidebar Toggle Button */}
            <button
                className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md md:hidden transition-all ${isSidebarOpen ? "left-[17rem]" : "left-4"}`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
            </button>

            {/* Main Content */}
            <div className="flex flex-col flex-grow overflow-y-auto">
                <NavigationBar />
                <main className="flex-grow md:px-16 px-8 pt-[10rem]">
                    <div className="max-w-3xl mx-auto">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="mb-14">
                                <h2 className="text-2xl font-bold text-gray-300 mb-8">{section.title}</h2>
                                <p className="text-gray-400">Content for {section.title} goes here...</p>
                            </section>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
