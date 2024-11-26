"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import Toast from "../components/toast";
import { useRouter } from "next/navigation";
import { FiDollarSign, FiUsers, FiClock, FiKey, FiAlertCircle, FiMessageSquare, FiLink, FiDelete } from "react-icons/fi";
import axios from "axios";
import FloatingNavigationBar from "../components/navbar";

function SubscribedPlans() {
    const router = useRouter();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");

    const statusMapping = [
        { codes: new Set([6]), text: "Active", color: "text-green-600" },
        { codes: new Set([1, 2, 3, 4, 5]), text: "Initializing Infrastructure", color: "text-gray-500" },
        { codes: new Set([-1, -2, -3]), text: "Destroying Infrastructure", color: "text-gray-500" },
        { codes: new Set([-4]), text: "Inactive", color: "text-red-500" },
        { codes: new Set([100, 101, 102, 103, 104, 105]), text: "Upgrading Infrastructure", color: "text-gray-500" },
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Call getSubscriptionDetails every second
                const intervalId = setInterval(() => {
                    getSubscriptionDetails();
                }, 2000); // 1000ms = 1 second

                // Cleanup the interval when the component unmounts or when the user logs out
                return () => clearInterval(intervalId);
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

    const deletePlan = async () => {
        auth.currentUser.getIdToken().then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/delete-subscription`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => {
                setSnackbarText("Subscription deleted successfully");
                setSeverity("success");
                setSnackbarState(true);
                getSubscriptionDetails();
            }).catch((error) => {
                setSnackbarText(error.response.data.message);
                setSeverity("error");
                setSnackbarState(true);
            });
        });
    }

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
        <>
            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <FloatingNavigationBar />
                <div className="flex items-center justify-center px-6 py-10 mt-20 flex-grow">
                    <div className="w-full max-w-lg p-8 bg-gray-800 text-white rounded-2xl shadow-xl border border-white/20">
                        {plan ? (
                            <>
                                <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6 glow">
                                    {plan.plan.plan_name} Plan
                                </h2>
                                <div className="space-y-3">
                                    <InfoRow icon={<FiDollarSign />} label="Price" value={
                                        plan.plan?.price !== null && plan.plan?.price !== undefined
                                            ? `$ ${plan.plan?.price}`
                                            : <span className="text-gray-500">Initializing</span>
                                    } />
                                    <InfoRow icon={<FiUsers />} label="Max Connections" value={
                                        plan.plan?.connections !== null && plan.plan?.connections !== undefined
                                            ? plan.plan?.connections
                                            : <span className="text-gray-500">Initializing</span>
                                    } valueColor="text-white" />
                                    <InfoRow icon={<FiMessageSquare />} label="Messages per Second" value="10 / connection" valueColor="text-white" />
                                    <InfoRow icon={<FiClock />} label="Plan Duration" value={
                                        plan.plan?.duration !== null && plan.plan?.duration !== undefined
                                            ? `${plan.plan?.duration} days`
                                            : <span className="text-gray-500">Initializing</span>
                                    } valueColor="text-white" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 flex items-center">
                                            <FiLink className="mr-2 text-xl text-yellow-400" /> Connection URL :
                                        </span>
                                        <div className="flex items-center">
                                            <span className={`font-semibold ${plan.subdomain ? "text-yellow-400 glow" : "text-gray-500"}`}>
                                                {plan.subdomain ? `${plan.subdomain}.socketlink.io` : "Initializing"}
                                            </span>
                                        </div>
                                    </div>
                                    <InfoRow
                                        icon={<FiClock />}
                                        label="Started On"
                                        value={new Date(plan.start_time)
                                            .toLocaleDateString('en-GB')
                                            .split('/')
                                            .join(' - ')}
                                        valueColor="text-white"
                                    />
                                    <InfoRow
                                        icon={<FiClock />}
                                        label="Expiring On"
                                        value={new Date(new Date(plan.start_time).setDate(new Date(plan.start_time).getDate() + plan.plan.duration))
                                            .toLocaleDateString('en-GB')
                                            .split('/')
                                            .join(' - ')}
                                        valueColor="text-white"
                                    />
                                    <InfoRow
                                        icon={<FiAlertCircle />}
                                        label="Account Status"
                                        value={statusMapping.find((status) => status.codes.has(plan.status))?.text || "Unknown"}
                                        valueColor={statusMapping.find((status) => status.codes.has(plan.status))?.color || "text-gray-300"}
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 flex items-center">
                                            <FiKey className="mr-2 text-xl text-yellow-400" /> API Key :
                                        </span>
                                        <div className="flex items-center">
                                            {plan.apiKey ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <span className="font-semibold text-gray-500">Initializing</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <div className="flex-1">
                                        <Link href="/pricing">
                                            <button className="flex-1 w-full text-white bg-primary-600 hover:bg-primary-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition-transform duration-150">
                                                Change Plan
                                            </button>
                                        </Link>
                                        {plan.plan.price !== 0 && (
                                            <Link href="/renew">
                                                <button className="flex-1 w-full mt-5 text-white bg-green-600 hover:bg-green-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform duration-150">
                                                    Renew Plan
                                                </button>
                                            </Link>
                                        )}
                                        {plan.status !== -4 && (
                                            <button
                                                onClick={deletePlan}
                                                className="flex-1 w-full mt-5 text-white bg-red-600 hover:bg-red-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform duration-150"
                                            >
                                                Delete Plan
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-300">
                                <h2 className="text-3xl font-bold mb-4">No Subscription Found</h2>
                                <p className="mb-4">It seems you haven&apos;t subscribed to any plans yet.</p>
                                <Link href="/pricing">
                                    <button className="flex-1 w-full text-black bg-yellow-600 hover:bg-yellow-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-transform duration-150">
                                        Choose a Plan
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
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
