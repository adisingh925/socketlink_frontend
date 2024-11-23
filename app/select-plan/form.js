"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { FiUsers, FiTrendingUp, FiZap, FiDollarSign } from "react-icons/fi";
import axios from "axios";
import { auth } from "../components/firebase";
import Toast from "../components/toast";
import Script from "next/script";

function SelectWebSocketPlan() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [region] = useState(searchParams.get('region'));

    /** states */
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    router.push("/login");
                } else {
                    auth.currentUser.getIdToken().then((token) => {
                        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-plans`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            console.log(response.data);
                            setPlans(response.data);
                        }).catch((error) => {
                            setSnackbarText(error.message);
                            setSeverity("error");
                            setSnackbarState(true);
                        }).finally(() => {
                            setLoading(false);
                        });
                    });
                }
            } catch (error) {
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handlePlanSelection = (plan) => {
        setSnackbarState(true);
        setSnackbarText("Processing...");
        setSeverity("info");

        auth.currentUser.getIdToken(/* forceRefresh */ true).then((token) => {
            console.log(plan);
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/subscription/${plan.plan_id}/${region}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data);
                if (response.data.code === 0) {
                    setSnackbarText(response.data.message);
                    setSeverity("warning");
                    setSnackbarState(true);
                } else if (response.data.code === 1) {
                    setSnackbarText(response.data.message);
                    setSeverity("success");
                    setSnackbarState(true);
                    router.push("/my-plans");
                } else if (response.data.code === -1) {
                    setSnackbarText(response.data.message);
                    setSeverity("error");
                    setSnackbarState(true);
                } else if (response.data.code === 2) {
                    console.log(auth.currentUser.phoneNumber);
                    const options = {
                        key: "rzp_test_3jWpiXDU2zdqah",
                        amount: response.data.amount,
                        currency: "USD",
                        order_id: response.data.order_id,
                        name: 'Socketlink',
                        description: response.data.plan_name,
                        image: 'https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp',
                        handler: function (response) {
                            setSnackbarText(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                            setSeverity("success");
                            setSnackbarState(true);
                        },
                        modal: {
                            ondismiss: function () {
                                setSnackbarText("Payment was cancelled by the user");
                                setSeverity("warning");
                                setSnackbarState(true);
                            }
                        },
                        prefill: {
                            name: auth.currentUser.displayName,
                            email: auth.currentUser.email,
                            contact: auth.currentUser.phoneNumber
                        },
                        theme: {
                            color: '#F37254'
                        },
                        notes: {
                            plan_id: response.data.plan_id,
                            region: response.data.region
                        }
                    };

                    const rzp = new Razorpay(options);
                    rzp.open();

                    rzp.on('payment.failed', function (response) {
                        setSnackbarText(response.error.description);
                        setSeverity("error");
                        setSnackbarState(true);
                    });
                }
            }).catch((error) => {
                console.error(error);
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
            });
        }).catch((error) => {
            setSnackbarText(error.message);
            setSeverity("error");
            setSnackbarState(true);
        });
    };

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
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">
                <div className="text-white w-full max-w-lg">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Choose Your Plan</h2>
                    <p className="text-center text-gray-400 mb-8">Region : {region}</p>

                    <div className="space-y-6">
                        {plans.map(plan => (
                            <div
                                key={plan.plan_id}
                                className={`p-6 rounded-lg shadow-lg transition transform ${plan.is_featured === true ? "bg-indigo-700 border border-indigo-400" : "bg-gray-800"} sm:hover:scale-105`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-xl font-bold ${plan.is_featured === true ? "text-yellow-300" : "text-blue-400"}`}>
                                        {plan.plan_name + " Plan"}
                                        {plan.is_featured === true && (
                                            <span className="text-xs font-semibold bg-yellow-500 text-gray-900 py-1 px-2 rounded-lg ml-2 align-middle">Free for 3 Days</span>
                                        )}
                                    </h3>
                                    <div className={`flex items-center text-lg font-semibold ${plan.is_featured === true ? "text-yellow-300" : "text-blue-300"}`}>
                                        <FiDollarSign /> {plan.price}
                                    </div>
                                </div>

                                <div className="text-gray-300 text-sm space-y-3">
                                    <div className="flex items-center">
                                        <FiUsers className={`${plan.is_featured === true ? "text-yellow-300" : "text-blue-400"} mr-2`} />
                                        <p><strong>Max Connections :</strong> {parseInt(plan.connections, 10).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FiTrendingUp className={`${plan.is_featured === true ? "text-yellow-300" : "text-green-400"} mr-2`} />
                                        <p><strong>Scalable Up To :</strong> {plan.is_scalable === true ? (plan.connections * 2).toLocaleString() : "No Scaling"}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FiZap className={`${plan.is_featured === true ? "text-yellow-300" : "text-yellow-400"} mr-2`} />
                                        <p><strong>Messages per Day :</strong> {numberToWords(plan.msg_per_day)} </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handlePlanSelection(plan)}
                                    className={`mt-6 w-full ${plan.is_featured
                                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                        } font-medium rounded-lg text-sm px-4 py-2 active:scale-95 transition-transform duration-150 focus:outline-none`}                                >
                                    {plan.name === "Trial" ? "Start 3-Day Trial" : `Select ${plan.plan_name} Plan`}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
        </>
    );
}

export default SelectWebSocketPlan;
