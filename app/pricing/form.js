"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FiUsers, FiTrendingUp, FiZap, FiDollarSign, FiLink, FiClock, FiShield, FiDatabase, FiFastForward, FiSend, FiUserCheck, FiHome, FiCheck, FiMessageCircle, FiSliders } from "react-icons/fi";
import axios from "axios";
import { auth } from "../components/firebase";
import Toast from "../components/toast";
import Script from "next/script";
import NavigationBar from "../components/navbar";
import RegionSelectionDialog from "../components/region";

function SelectWebSocketPlan() {
    const router = useRouter();

    /** states */
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [isRegionDialogOpen, setIsRegionDialogOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const handleRegionDialogOpen = () => setIsRegionDialogOpen(true);
    const handleRegionDialogClose = () => setIsRegionDialogOpen(false);

    useEffect(() => {
        document.title = "Pricing | Socketlink";
    });

    useEffect(() => {
        const fetchPlans = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-plans`, {
                        headers: {
                            'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
                        }
                    }).then((response) => {
                        setPlans(response.data);
                    }).catch((error) => {
                        setSnackbarText(error?.response?.data?.message ?? "An error occurred while fetching Plans!");
                        setSeverity("error");
                        setSnackbarState(true);
                    }).finally(() => {
                        setLoading(false);
                    });
                } else {
                    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-plans`).then((response) => {
                        setPlans(response.data);
                    }).catch((error) => {
                        setSnackbarText(error.message);
                        setSeverity("error");
                        setSnackbarState(true);
                    }).finally(() => {
                        setLoading(false);
                    });
                }
            });
        }

        fetchPlans();
    }, [router]);

    const checkEmailVerificationAndCreateResource = (region) => {
        if (auth.currentUser.emailVerified === false) {
            auth.currentUser.reload().then(() => {
                if (auth.currentUser.emailVerified === false) {
                    setSnackbarText("Please verify your email using the link sent to your email inbox!");
                    setSeverity("error");
                    setSnackbarState(true);
                    return;
                } else {
                    createResource(region, true);
                }
            }).catch((error) => {
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
                return;
            });
        } else {
            createResource(region);
        }
    };

    const handleRegionSelection = (region) => {
        handleRegionDialogClose();
        setSnackbarState(true);
        setSnackbarText("Creating your resource, please wait...");
        setSeverity("info");

        checkEmailVerificationAndCreateResource(region);
    };

    const createResource = async (region, refreshToken = false) => {
        auth.currentUser.getIdToken(refreshToken).then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/subscription/${selectedPlanId}/${region}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                if (response.data.code === 0) {
                    setSnackbarText(response.data.message);
                    setSeverity("warning");
                    setSnackbarState(true);
                } else if (response.data.code === 1) {
                    setSnackbarText(response.data.message);
                    setSeverity("success");
                    setSnackbarState(true);

                    setTimeout(() => {
                        router.push("/my-plans");
                    }, 3000);
                } else if (response.data.code === -1) {
                    setSnackbarText(response.data.message);
                    setSeverity("error");
                    setSnackbarState(true);
                } else if (response.data.code === 2) {
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
                            setTimeout(() => {
                                router.push("/my-plans");
                            }, 3000);
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
                setSnackbarText(error.response.data.message);
                setSeverity("error");
                setSnackbarState(true);
            });
        }).catch((error) => {
            setSnackbarText(error.message);
            setSeverity("error");
            setSnackbarState(true);
        });
    }

    const handlePlanSelection = (plan) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setSelectedPlanId(plan.plan_id);
                handleRegionDialogOpen();
            } else {
                router.push("/login");
            }
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
                <NavigationBar />
                <div className="flex flex-col flex-grow items-center justify-center px-4 py-6 mt-[100px] dark:bg-gray-900">
                    <div className="text-white w-full max-w-screen">
                        <div className="flex flex-wrap justify-center gap-4">
                            {plans && plans.map((plan) => (
                                <div
                                    key={plan.plan_id}
                                    className={`w-[400px] max-w-lg h-[500px] flex-grow flex flex-col justify-between p-4 sm:p-8 m-2 rounded-2xl shadow-xl border-2 transition transform ${plan.is_featured
                                        ? "bg-indigo-700 border-indigo-400 text-white"
                                        : "bg-gray-800 border-white/20 text-white"
                                        } sm:hover:scale-105`}

                                >
                                    <div className="flex flex-col justify-between flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3
                                                className={`text-xl font-bold ${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                    }`}
                                            >
                                                {plan.plan_name}
                                                {plan.is_featured && (
                                                    <span className="text-xs font-semibold bg-yellow-500 text-gray-900 py-1 px-2 rounded-lg ml-2 align-middle">
                                                        Free for 3 Days
                                                    </span>
                                                )}
                                            </h3>
                                            <div
                                                className={`flex items-center text-lg font-semibold ${plan.is_featured ? "text-yellow-300" : "text-blue-300"
                                                    }`}
                                            >
                                                <FiDollarSign /> {plan.price / 100 + " / month"}
                                            </div>
                                        </div>

                                        <div className="text-gray-300 text-sm flex-1 flex flex-col justify-evenly">
                                            <div className="flex items-center">
                                                <FiUsers
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Max Connections :</strong>{" "}
                                                    {parseInt(plan.connections, 10).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiTrendingUp
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-yellow-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Messages / Day :</strong> {"Unlimited"}{" "}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiZap
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-yellow-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Messages / Second :</strong> {"Upto 50,000 / second"}{" "}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiMessageCircle
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Max Message Size :</strong>{" "}
                                                    {"Upto " + 10 + " KB"}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiSend
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Monthly Data Transfer :</strong>{" "}
                                                    {(plan.max_monthly_payload_in_bytes / (1024 * 1024 * 1024 * 1024)).toLocaleString() + " TB"}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiDatabase
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Data Storage :</strong>{" "}
                                                    {(plan.max_storage_allowed_in_gb).toLocaleString() + " GB"}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiHome
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Max Rooms :</strong>{" "}
                                                    {"Unlimited"}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiUsers
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-blue-400"
                                                        } mr-2`}
                                                />
                                                <p>
                                                    <strong>Max Members per Room :</strong>{" "}
                                                    {parseInt(plan.connections, 10).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <FiLink
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-purple-400"
                                                        } mr-2`}
                                                />
                                                <p className="flex items-center">
                                                    <strong>Custom Subdomain :</strong>{" "}
                                                    <FiCheck className="ml-2 text-green-500 text-xl font-bold" /> {/* Enlarged and bold */}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    <FiClock className={`${plan.is_featured ? "text-yellow-300" : "text-orange-400"} mr-2`} />
                                                    <p>
                                                        <strong>Support :</strong>
                                                        {plan.price <= 8000 ? " Standard Support (8hr SLA)" :
                                                            plan.price <= 12000 ? " Priority Support (24/7, 4hr SLA)" :
                                                                plan.price <= 50000 ? " Premium Support (24/7, 1hr SLA)" :
                                                                    " Enterprise Support (24/7, 30min SLA)"}
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="flex items-center">
                                                <FiSliders
                                                    className={`${plan.is_featured ? "text-yellow-300" : "text-purple-400"} mr-2`}
                                                />
                                                <p>
                                                    <strong>SLO :</strong> {"99.9% Uptime Guaranteed"}
                                                </p>
                                            </div>
                                            <div>
                                                {plan.price === 2900 && (
                                                    <div className="mt-6 text-sm text-gray-300 text-center border-t border-gray-600 pt-4">
                                                        <p>
                                                            <strong>Our most generous plan yet! Ideal for small businesses and startups.</strong>
                                                        </p>
                                                    </div>
                                                )}

                                                {plan.price === 4900 && (
                                                    <div className="mt-6 text-sm text-gray-300 text-center border-t border-gray-600 pt-4">
                                                        <p>
                                                            <strong>This plan is perfect for small to medium-sized businesses.</strong>
                                                        </p>
                                                    </div>
                                                )}
                                                {plan.price === 9900 && (
                                                    <div className="mt-6 text-sm text-gray-300 text-center border-t border-gray-600 pt-4">
                                                        <p>
                                                            <strong>A great plan for medium to large businesses.</strong>
                                                        </p>
                                                    </div>
                                                )}

                                                {plan.price === 19900 && (
                                                    <div className="mt-6 text-sm text-gray-300 text-center border-t border-gray-600 pt-4">
                                                        <p>
                                                            <strong>The best plan for large businesses and enterprises.</strong>
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handlePlanSelection(plan)}
                                        className={`mt-6 w-full ${plan.is_featured
                                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                            } font-medium rounded-lg text-sm px-4 py-2 active:scale-95 transition-transform duration-150 focus:outline-none`}
                                    >
                                        {plan.name === "Trial"
                                            ? "Start 3-Day Trial"
                                            : `Select ${plan.plan_name} Plan`}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RegionSelectionDialog isOpen={isRegionDialogOpen} onClose={handleRegionDialogClose} handleRegionSelection={handleRegionSelection} />

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
        </>
    );
}

export default SelectWebSocketPlan;
