"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import Toast from "../components/toast";
import { useRouter } from "next/navigation";
import { FiDollarSign, FiUsers, FiClock, FiKey, FiAlertCircle, FiMessageSquare, FiLink, FiDelete, FiGlobe, FiMaximize, FiInfo, FiMessageCircle, FiCpu } from "react-icons/fi";
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
        { codes: new Set([1, 2, 3, 4, 5]), text: "Initializing", color: "text-gray-500" },
        { codes: new Set([-1, -2, -3]), text: "Destroying", color: "text-gray-500" },
        { codes: new Set([-4]), text: "Inactive", color: "text-red-500" },
        { codes: new Set([100, 101, 102, 103, 104, 105]), text: "Upgrading", color: "text-gray-500" },
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Call getSubscriptionDetails every second
                const intervalId = setInterval(() => {
                    getSubscriptionDetails();
                }, 5000);

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

    function numberToWords(num) {
        const units = ["", "Thousand", "Million", "Billion", "Trillion", "quadrillion", "quintillion"];
        let i = 0;

        // Convert number to absolute value and handle zero
        let absNum = Math.abs(num);
        if (absNum === 0) return "zero";

        // Continue dividing the number by 1000 to reduce its size and track the units
        while (absNum >= 1000 && i < units.length - 1) {
            absNum /= 1000;
            i++;
        }

        // Format the result to 1 decimal place and append the appropriate unit
        const formattedNum = absNum.toFixed(1).replace(/\.0$/, ""); // Remove trailing .0 if any
        const result = `${formattedNum} ${units[i]}`;

        // Add "negative" if the original number was negative
        return num < 0 ? `negative ${result}` : result;
    }

    return (
        <>
            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <FloatingNavigationBar />
                <div className="flex items-center justify-center px-6 py-10 mt-20 flex-grow dark:bg-gray-900">
                    <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border border-white/20">
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
                                    <InfoRow icon={<FiClock />} label="Plan Duration" value={
                                        plan.plan?.duration !== null && plan.plan?.duration !== undefined
                                            ? `${plan.plan?.duration} days`
                                            : <span className="text-gray-500">Initializing</span>
                                    } valueColor="text-white" />
                                    <InfoRow icon={<FiUsers />} label="Max Connections" value={
                                        plan.plan?.connections !== null && plan.plan?.connections !== undefined
                                            ? plan.plan?.connections
                                            : <span className="text-gray-500">Initializing</span>
                                    } valueColor="text-white" />
                                    <InfoRow icon={<FiMessageCircle />} label="Messages per Second" value="10 / connection" valueColor="text-white" />
                                    <InfoRow icon={<FiMessageCircle />} label="Messages per Day" value={numberToWords(plan.plan.msg_per_day)} valueColor="text-white" />
                                    <InfoRow icon={<FiInfo />} label="Max Payload Size" value={numberToWords(plan.plan.max_payload_size_in_kb) + "Kb"} valueColor="text-white" />
                                    <InfoRow icon={<FiGlobe />} label="Region" value={
                                        plan.region !== null && plan.region !== undefined
                                            ? `${plan.region}`
                                            : <span className="text-gray-500">Initializing</span>
                                    } valueColor="text-white" />
                                    <InfoRow
                                        icon={<FiAlertCircle />}
                                        label="Account Status"
                                        value={
                                            plan.status === 6 && plan.health_status == null
                                                ? "Resolving DNS"
                                                : statusMapping.find((status) => status.codes.has(plan.status))?.text || "Unknown"
                                        }
                                        valueColor={
                                            plan.status === 6 && plan.health_status == null
                                                ? "text-gray-500"
                                                : statusMapping.find((status) => status.codes.has(plan.status))?.color || "text-gray-300"
                                        }
                                    />
                                    <InfoRow
                                        icon={<FiLink className="text-yellow-400" />}
                                        label="Connection URL"
                                        value={
                                            plan.subdomain ? (
                                                <>
                                                    <span className="font-semibold text-yellow-400 truncate glow">
                                                        {`${plan.subdomain}.socketlink.io`.slice(0, 4)}••••••{`${plan.subdomain}.socketlink.io`.slice(-4)}
                                                    </span>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(`${plan.subdomain}.socketlink.io`)}
                                                        className="ml-2 px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded hover:bg-gray-600 transition duration-200"
                                                        title="Copy Connection URL"
                                                    >
                                                        Copy
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="font-semibold text-gray-500">Initializing</span>
                                            )
                                        }
                                    />
                                    {plan.plan.price === 0 && (
                                        <>
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
                                        </>
                                    )}
                                    <InfoRow
                                        icon={<FiKey className="text-yellow-400" />}
                                        label="API Key"
                                        value={
                                            plan.apiKey ? (
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
                                            )
                                        }
                                    />
                                    <div className="mt-6 text-sm text-gray-300 text-center border-t border-gray-600 pt-4">
                                        <p>
                                            <strong className="text-yellow-400">Note :</strong> Our pay-per-minute billing ensures you only pay for what you use.
                                            This is perfect for reducing costs and maximizing flexibility for your usage needs.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <div className="flex-1">
                                        <Link href="/pricing">
                                            <button className="flex-1 w-full text-white bg-primary-600 hover:bg-primary-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition-transform duration-150">
                                                Change Plan
                                            </button>
                                        </Link>
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
    <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="text-gray-400 flex items-center">
            {icon && <span className="mr-2 text-xl text-blue-500">{icon}</span>}
            {label} :
        </span>
        <span className={`font-semibold ${valueColor}`}>{value}</span>
    </div>
);


export default SubscribedPlans;
