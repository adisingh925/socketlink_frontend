"use client";

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { FiUsers, FiTrendingUp, FiZap, FiDollarSign } from "react-icons/fi";

function SelectWebSocketPlan() {
    const searchParams = useSearchParams();
    const [region] = useState(searchParams.get('region'));
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Define WebSocket plans
    const plans = [
        { id: 1, name: "Trial", maxConnections: 500, scalableUpTo: "No Scaling", messagesPerSecond: 10, price: "Free" },
        { id: 2, name: "Basic", maxConnections: 5000, scalableUpTo: "10,000 connections", messagesPerSecond: 10, price: "50/month" },
        { id: 3, name: "Standard", maxConnections: 10000, scalableUpTo: "20,000 connections", messagesPerSecond: 10, price: "100/month" },
        { id: 4, name: "Pro", maxConnections: 20000, scalableUpTo: "40,000 connections", messagesPerSecond: 10, price: "150/month" },
    ];

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
        alert(`You selected the ${plan.name} plan for region ${region} with ${plan.maxConnections} connections.`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">
            <div className="text-white w-full max-w-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Choose Your WebSocket Plan</h2>
                <p className="text-center text-gray-400 mb-8">Region : {region}</p>

                <div className="space-y-6">
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className={`p-6 rounded-lg shadow-lg transition transform ${plan.name === "Trial" ? "bg-indigo-700 border border-indigo-400" : "bg-gray-800"} sm:hover:scale-105`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-xl font-bold ${plan.name === "Trial" ? "text-yellow-300" : "text-blue-400"}`}>
                                    {plan.name} Plan
                                    {plan.name === "Trial" && (
                                        <span className="text-xs font-semibold bg-yellow-500 text-gray-900 py-1 px-2 rounded-lg ml-2 align-middle">Free for 3 Days</span>
                                    )}
                                </h3>
                                <div className={`flex items-center text-lg font-semibold ${plan.name === "Trial" ? "text-yellow-300" : "text-blue-300"}`}>
                                    <FiDollarSign /> {plan.price}
                                </div>
                            </div>

                            <div className="text-gray-300 text-sm space-y-3">
                                <div className="flex items-center">
                                    <FiUsers className={`${plan.name === "Trial" ? "text-yellow-300" : "text-blue-400"} mr-2`} />
                                    <p><strong>Max Connections :</strong> {plan.maxConnections.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <FiTrendingUp className={`${plan.name === "Trial" ? "text-yellow-300" : "text-green-400"} mr-2`} />
                                    <p><strong>Scalable Up To :</strong> {plan.scalableUpTo}</p>
                                </div>
                                <div className="flex items-center">
                                    <FiZap className={`${plan.name === "Trial" ? "text-yellow-300" : "text-yellow-400"} mr-2`} />
                                    <p><strong>Messages per Second :</strong> {plan.messagesPerSecond} per connection</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handlePlanSelection(plan)}
                                className={`mt-6 w-full ${plan.name === "Trial" ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-600 hover:bg-blue-700 text-white"} font-medium rounded-lg text-sm px-4 py-2`}
                            >
                                {plan.name === "Trial" ? "Start 3-Day Trial" : `Select ${plan.name} Plan`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SelectWebSocketPlan;
