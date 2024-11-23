"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import Toast from "../components/toast";
import { useRouter } from "next/navigation";
import { FiDollarSign, FiUsers, FiClock, FiKey, FiAlertCircle, FiMessageSquare, FiLink, FiDelete } from "react-icons/fi";
import axios from "axios";

function SubscribedPlans() {
    const router = useRouter();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");

    function convertSecondsToDate(seconds) {
        const milliseconds = seconds * 1000;
        return new Date(milliseconds);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await getSubscriptionDetails();
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    const getSubscriptionDetails = async () => {
        auth.currentUser.getIdToken().then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/my-subscription`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setPlan(response.data);
            }).catch((error) => {
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
            }).finally(() => {
                setLoading(false);
            });
        });
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100dvh] bg-gray-900 text-white">
                <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen px-6 py-10 bg-gray-900">
                <div className="w-full max-w-lg p-8 bg-gray-800 text-white rounded-2xl shadow-xl border border-white/20">
                    {plan ? (
                        <>
                            <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6 glow">
                                {plan.plan.plan_name} Plan
                            </h2>
                            <div className="space-y-6">
                                <InfoRow icon={<FiDollarSign />} label="Price" value={"$ " + plan.plan.price} />
                                <InfoRow icon={<FiUsers />} label="Max Connections" value={`${plan.plan.connections}`} valueColor="text-white" />
                                <InfoRow icon={<FiMessageSquare />} label="Messages per Second" value="10 / connection" valueColor="text-white" />
                                <InfoRow icon={<FiClock />} label="Plan Duration" value={`${plan.plan.duration} days`} valueColor="text-white" />
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 flex items-center">
                                        <FiLink className="mr-2 text-xl text-yellow-400" /> Connection URL :
                                    </span>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-yellow-400 truncate glow">
                                            {`${plan.subdomain}.socketlink.io`}
                                        </span>
                                    </div>
                                </div>
                                <InfoRow
                                    icon={<FiClock />}
                                    label="Started On"
                                    value={new Date(plan.start_time)
                                        .toLocaleDateString('en-GB')  // This formats the date as dd/mm/yyyy
                                        .split('/')
                                        .join(' - ')}  // Replaces slashes with hyphens to achieve dd-mm-yyyy format
                                    valueColor="text-white"
                                />
                                <InfoRow
                                    icon={<FiClock />}
                                    label="Expiring On"
                                    value={new Date(new Date(plan.start_time).setDate(new Date(plan.start_time).getDate() + 30))
                                        .toLocaleDateString('en-GB')
                                        .split('/')
                                        .join(' - ')}
                                    valueColor="text-white"
                                />
                                <InfoRow
                                    icon={<FiAlertCircle />}
                                    label="Account Status"
                                    value={plan.status === 6 ? "Active" : "Paused"}
                                    valueColor={plan.status === 6 ? "text-white" : "text-white"}
                                />
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 flex items-center">
                                        <FiKey className="mr-2 text-xl text-yellow-400" /> API Key :
                                    </span>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-yellow-400 truncate glow">
                                            {plan.apiKey.slice(0, 4)}••••••{plan.apiKey.slice(-4)}
                                        </span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(plan.apiKey)}
                                            className="ml-2 px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded hover:bg-gray-600 transition duration-200"
                                            title="Copy API Key"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 text-center">
                                <div className="flex-1">
                                    <Link href="/choose-region">
                                        <button className="flex-1 w-full text-white bg-yellow-600 hover:bg-yellow-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform duration-150">
                                            Change Plan
                                        </button>
                                    </Link>
                                    <Link href="/delete-plan">
                                        <button className="flex-1 w-full mt-5 text-white bg-red-500 hover:bg-red-600 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform duration-150">
                                            Delete Plan
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-300">
                            <h2 className="text-3xl font-bold mb-4">No Subscription Found</h2>
                            <p className="mb-4">It seems you haven&apos;t subscribed to any plans yet.</p>
                            <Link href="/choose-region">
                                <button className="px-6 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition-transform duration-200 transform hover:scale-105 shadow-lg">
                                    Choose a Plan
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

const InfoRow = ({ icon, label, value, valueColor = "text-white" }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-400 flex items-center">
            {icon && <span className="mr-2 text-xl text-blue-500">{icon}</span>}
            {label} :
        </span>
        <span className={`font-semibold ${valueColor}`}>{value}</span>
    </div>
);

export default SubscribedPlans;
