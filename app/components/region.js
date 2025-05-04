"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa'; 

async function fetchRegions() {
    const response = await fetch("https://api.digitalocean.com/v2/regions", {
        headers: {
            Authorization: `Bearer dop_v1_cecd9893e313950498189919f239e9e5187fd2e6c4e42d724c65ebfa1ae896ac`,
        },
    });
    const data = await response.json();
    console.log(data);
    return data.regions || [];
}

function RegionSelectionDialog({ isOpen, onClose, handleRegionSelection }) {
    const router = useRouter();
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
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
            handleRegionSelection(selectedRegion);
        }
    };

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
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                <div className="relative p-4 sm:p-6 dark:bg-gray-800 bg-gray-200 text-white rounded-lg w-full max-w-lg sm:max-w-3xl mx-4 sm:mx-6 pt-4 pb-4">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 dark:text-white text-gray-900 text-2xl mr-3 mt-1"
                    >
                        &times;
                    </button>

                    {spinner ? (
                        <div className="flex justify-center items-center h-48">
                            <FaSpinner className="animate-spin text-blue-600 text-3xl" />
                            <span className="ml-2 text-blue-600">Loading regions...</span>
                        </div>
                    ) : (
                        <div className="overflow-y-auto max-h-[70vh] sm:max-h-[75vh] mt-10 sm:mt-10 px-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {regions
                                    .filter(region => region.available)
                                    .map((region) => (
                                        <div
                                            key={region.slug}
                                            onClick={() => handleSelectRegion(region.slug)}
                                            className={`p-3 sm:p-4 rounded-lg cursor-pointer transition duration-200 border-2 dark:border-white/20 border-gray-500/20 ${selectedRegion === region.slug
                                                ? "bg-blue-600 border-blue-500"
                                                : "dark:bg-gray-700 bg-gray-300 border-gray-600 dark:hover:bg-gray-600 hover:bg-gray-400"
                                                }`}
                                        >
                                            <h3 className={`font-semibold text-sm sm:text-base  dark:text-white text-gray-900 ${selectedRegion === region.slug
                                                ? "text-white"
                                                : "dark:text-white text-gray-900"
                                                }`}>{region.name}</h3>
                                            <p className={`text-xs sm:text-sm ${selectedRegion === region.slug
                                                ? "text-white"
                                                : "dark:text-white text-gray-600"
                                                }`}>Slug : {region.slug}</p>
                                            <p className={`text-xs sm:text-sm ${selectedRegion === region.slug
                                                ? "text-white"
                                                : "dark:text-white text-gray-600"
                                                }`}>Available : {region.available ? "Yes" : "No"}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!selectedRegion || loading}
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700 mt-6 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
    );
}

export default RegionSelectionDialog;
