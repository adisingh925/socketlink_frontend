"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon
import { auth } from "../components/firebase";

// Fetch regions function
async function fetchRegions() {
    const response = await fetch("https://api.digitalocean.com/v2/regions", {
        headers: {
            Authorization: `Bearer dop_v1_dd073bfcad81e17ee65e5c34d0d2ae3b139fd10e6ec6071634f578f0a035def1`,
        },
    });
    const data = await response.json();
    return data.regions || [];
}

function RegionSelectionForm() {
    const router = useRouter();
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [spinner, setSpinner] = useState(true);
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

    useEffect(() => {
        setSpinner(true);
        fetchRegions().then((regionsData) => {
            setRegions(regionsData);
            setSpinner(false);
        }).catch((error) => {
            console.error(error);
            setSpinner(false);
        });
    }, []);

    const handleSelectRegion = (regionSlug) => {
        setSelectedRegion(regionSlug);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedRegion) {
            router.push(`/select-plan?region=${selectedRegion}`);
        }
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
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-gray-800 text-white rounded-lg w-full max-w-3xl">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">Select a region closest to your users</h2>

                {spinner ? (
                    <div className="flex justify-center items-center h-48">
                        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
                        <span className="ml-2 text-blue-600">Loading regions...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {regions
                            .filter(region => region.available)
                            .map((region) => (
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
                )}

                <button
                    type="submit"
                    disabled={!selectedRegion || loading}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default RegionSelectionForm;
