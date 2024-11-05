"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import Toast from "../components/toast";
import { useRouter } from "next/navigation";
import { FiDollarSign, FiUsers, FiClock, FiKey, FiAlertCircle } from "react-icons/fi";

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
                try {
                    const userDocs = doc(db, "subscriptions", user.email);
                    const userDocSnap = await getDoc(userDocs);

                    if (userDocSnap.exists()) {
                        const planDocSnap = await getDoc(userDocSnap.data().planRef);

                        if (planDocSnap.exists()) {
                            setPlan({
                                plan_name: planDocSnap.data().plan_name,
                                connections: planDocSnap.data().connections,
                                max_payload_size_in_kb: planDocSnap.data().max_payload_size_in_kb,
                                msg_per_day: planDocSnap.data().msg_per_day,
                                msg_per_second_per_connection: planDocSnap.data().msg_per_second_per_connection,
                                apiKey: userDocSnap.data().apiKey,
                                start_time: userDocSnap.data().start_time,
                                end_time: userDocSnap.data().end_time,
                                status: userDocSnap.data().status,
                                price: planDocSnap.data().price,
                            });
                        } else {
                            setPlan(null);
                            setSnackbarText("No subscribed plan found!");
                            setSeverity("warning");
                            setSnackbarState(true);
                        }
                    } else {
                        setPlan(null);
                        setSnackbarText("No subscribed plan found!");
                        setSeverity("warning");
                        setSnackbarState(true);
                    }
                } catch (err) {
                    setSnackbarText(err.message);
                    setSeverity("error");
                    setSnackbarState(true);
                } finally {
                    setLoading(false);
                }
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100dvh] bg-gray-900 text-white">
                <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen px-6 py-10">
                <div className="w-full max-w-lg p-8 bg-gray-800 text-white rounded-2xl shadow-xl border border-white/20">
                    {plan ? (
                        <>
                            <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6 glow">
                                {plan.plan_name} Plan
                            </h2>
                            <div className="space-y-6">
                                <InfoRow icon={<FiDollarSign />} label="Price" value={"$ " + plan.price} />
                                <InfoRow icon={<FiUsers />} label="Max Connections" value={`${plan.connections}`} valueColor="text-green-400" />
                                <InfoRow icon={<FiClock />} label="Messages per Second" value="10 / connection" valueColor="text-blue-500" />
                                <InfoRow
                                    icon={<FiClock />}
                                    label="Started On"
                                    value={convertSecondsToDate(plan.start_time.seconds).toLocaleDateString() + " " + convertSecondsToDate(plan.start_time.seconds).toLocaleTimeString()}
                                    valueColor="text-purple-400"
                                />
                                <InfoRow
                                    icon={<FiClock />}
                                    label="Expiring On"
                                    value={convertSecondsToDate(plan.end_time.seconds).toLocaleDateString() + " " + convertSecondsToDate(plan.end_time.seconds).toLocaleTimeString()}
                                    valueColor="text-red-400"
                                />
                                <InfoRow
                                    icon={<FiAlertCircle />}
                                    label="Account Status"
                                    value={plan.status === 1 ? "Active" : "Paused"}
                                    valueColor={plan.status === 1 ? "text-green-400" : "text-red-400"}
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
                                <Link href="/choose-region">
                                    <button className="px-6 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition-transform duration-200 transform hover:scale-105 shadow-lg">
                                        Change Plan
                                    </button>
                                </Link>
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

const InfoRow = ({ icon, label, value, valueColor = "text-gray-200" }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-400 flex items-center">
            {icon && <span className="mr-2 text-xl text-blue-500">{icon}</span>}
            {label} :
        </span>
        <span className={`font-semibold ${valueColor}`}>{value}</span>
    </div>
);

export default SubscribedPlans;
