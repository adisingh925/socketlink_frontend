"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Fetch regions function
async function fetchRegions() {
    const response = await fetch("https://api.digitalocean.com/v2/regions", {
        headers: {
            Authorization: `Bearer dop_v1_dd073bfcad81e17ee65e5c34d0d2ae3b139fd10e6ec6071634f578f0a035def1`, // Replace with your DigitalOcean API token
        },
    });
    const data = await response.json();
    return data.regions || [];
}

function RegionSelectionForm() {
    const router = useRouter(); // Initialize router for navigation
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(() => {
        // Fetch regions on component mount
        fetchRegions().then(setRegions).catch(console.error);
    }, []);

    const handleSelectRegion = (regionSlug) => {
        setSelectedRegion(regionSlug);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to the WebSocket plan selection page with the selected region as a query parameter
        if (selectedRegion) {
            router.push(`/select-plan?region=${selectedRegion}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-gray-800 text-white rounded-lg w-full max-w-3xl">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">Select a region closest to your users</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {regions.map((region) => (
                        <div
                            key={region.slug}
                            onClick={() => handleSelectRegion(region.slug)}
                            className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition duration-200 ${selectedRegion === region.slug
                                ? "bg-blue-600 border-blue-500"
                                : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                                }`}
                        >
                            <h3 className="font-semibold text-sm sm:text-base">{region.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-300">Slug: {region.slug}</p>
                            <p className="text-xs sm:text-sm text-gray-400">Available: {region.available ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    disabled={!selectedRegion}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-6 sm:mt-8"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default RegionSelectionForm;
