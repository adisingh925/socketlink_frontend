"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

function SelectWebSocketPlan() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [region] = useState(searchParams.get('region'));

    const [selectedPlan, setSelectedPlan] = useState(null);

    // Define WebSocket plans with unique color themes
    const plans = [
        { id: 1, name: "Basic", maxConnections: 5000, scalableUpTo: 10000, messagesPerSecond: 10, price: "$50/month", color: "bg-blue-700", buttonColor: "bg-blue-500 hover:bg-blue-600" },
        { id: 2, name: "Standard", maxConnections: 10000, scalableUpTo: 20000, messagesPerSecond: 10, price: "$100/month", color: "bg-green-700", buttonColor: "bg-green-500 hover:bg-green-600" },
        { id: 3, name: "Pro", maxConnections: 20000, scalableUpTo: 40000, messagesPerSecond: 10, price: "$150/month", color: "bg-purple-700", buttonColor: "bg-purple-500 hover:bg-purple-600" },
    ];

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
        alert(`You selected the ${plan.name} plan for region ${region} with ${plan.maxConnections} connections.`);
        // Navigate to a confirmation or checkout page if desired
        // router.push('/checkout');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">
            <div className="p-4 sm:p-6 bg-gray-800 text-white rounded-lg w-full max-w-lg">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">Select a Plan</h2>
                <p className="text-center mb-6">Region : {region}</p>

                <div className="grid gap-4">
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className={`p-4 rounded-lg border ${plan.color} text-white border-gray-600`}
                        >
                            <h4 className="font-bold text-lg mb-2">{plan.name}</h4>
                            <p><strong>Connections :</strong> {plan.maxConnections}</p>
                            <p><strong>Scalable Up To :</strong> {plan.scalableUpTo} connections</p>
                            <p><strong>Messages :</strong> {plan.messagesPerSecond} messages / connection / second</p>
                            <p className="mt-2"><strong>Price :</strong> {plan.price}</p>
                            <button
                                onClick={() => handlePlanSelection(plan)}
                                className={`mt-4 w-full text-white ${plan.buttonColor} focus:ring-4 focus:outline-none focus:ring-opacity-50 font-medium rounded-lg text-sm px-4 py-2`}
                            >
                                Select Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SelectWebSocketPlan;
