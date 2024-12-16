"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../components/firebase"; // Adjust path as necessary
import { useRouter } from "next/navigation";
import NavigationBar from "../components/navbar";
import Toast from "../components/toast";
import axios from "axios";
import Script from "next/script";

function Billing() {
    const router = useRouter();

    const [walletBalance, setWalletBalance] = useState(null);
    const [outstandingBalance, setOutstandingBalance] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(true);

    const handleRedirect = () => {
        router.push("/pricing");
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            } else {
                getBillingDetails();
            }
        });
    }, [router]);

    const getBillingDetails = async () => {
        auth.currentUser.getIdToken().then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-balance`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const balance = response.data.balance;
                if (balance < 0) {
                    setOutstandingBalance(Math.abs(balance) / 100);
                    setWalletBalance(0);
                } else {
                    setWalletBalance(balance / 100);
                    setOutstandingBalance(0);
                }
            }).catch((error) => {
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
            }).finally(() => {
                setLoading(false);
            });
        });
    };

    const handlePayOutstanding = () => {
        auth.currentUser.getIdToken().then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/make-payment/-1`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                if (response.data.code == 2) {
                    const options = {
                        key: "rzp_test_3jWpiXDU2zdqah",
                        amount: response.data.amount,
                        currency: "USD",
                        order_id: response.data.order_id,
                        name: 'Socketlink',
                        description: "Custom Payment",
                        image: 'https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp',
                        handler: function (response) {
                            setSnackbarText(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                            setSeverity("success");
                            setSnackbarState(true);
                            getBillingDetails();
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
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
            });
        });
    };

    const handlePayCustomAmount = () => {
        const amount = parseFloat(customAmount);

        if (isNaN(amount) || amount <= outstandingBalance) {
            setSnackbarText(
                `Please enter a valid amount greater than the outstanding balance of $${outstandingBalance.toFixed(2)}`
            );
            setSeverity("error");
            setSnackbarState(true);
            return;
        }

        auth.currentUser.getIdToken().then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/make-payment/${amount}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                if (response.data.code == 2) {
                    const options = {
                        key: "rzp_test_3jWpiXDU2zdqah",
                        amount: response.data.amount,
                        currency: "USD",
                        order_id: response.data.order_id,
                        name: 'Socketlink',
                        description: "Custom Payment",
                        image: 'https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp',
                        handler: function (response) {
                            setSnackbarText(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                            setSeverity("success");
                            setSnackbarState(true);
                            getBillingDetails();
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
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
            });
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100dvh] text-white dark:bg-gray-900">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (walletBalance === null && outstandingBalance === null) {
        return (
            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <NavigationBar />
                <div className="flex items-center justify-center px-6 py-10 mt-20 flex-grow dark:bg-gray-900">
                    <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border border-white/20">
                        <div className="space-y-4">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Wallet Inactive
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your wallet is currently inactive. Buy a subscription to activate the wallet.
                            </p>
                            <button
                                onClick={handleRedirect}
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Buy Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <NavigationBar />
                <div className="flex items-center justify-center px-6 py-10 mt-20 flex-grow dark:bg-gray-900">
                    <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border border-white/20">
                        <div className="space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Billing Information
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="wallet-balance"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Wallet Balance
                                    </label>
                                    <input
                                        type="text"
                                        id="wallet-balance"
                                        value={`$${Number(walletBalance).toFixed(2)}`}
                                        disabled={true}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="outstanding-balance"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Outstanding Balance
                                    </label>
                                    <input
                                        type="text"
                                        id="outstanding-balance"
                                        value={`$${outstandingBalance.toFixed(2)}`}
                                        disabled={true}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handlePayOutstanding}
                                    disabled={outstandingBalance === 0 || outstandingBalance === null}
                                    className="w-full text-white bg-green-600 hover:bg-green-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-green-600 dark:hover:bg-green-700"
                                >
                                    Pay Outstanding Fees
                                </button>

                                <div>
                                    <label
                                        htmlFor="custom-amount"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Enter Custom Amount (greater than ${outstandingBalance.toFixed(2)})
                                    </label>
                                    <input
                                        type="number"
                                        id="custom-amount"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>

                                <button
                                    type="button"
                                    disabled={walletBalance === null && outstandingBalance === null}
                                    onClick={handlePayCustomAmount}
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Pay Custom Amount
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                message={snackbarText}
                severity={severity}
                setSnackbarState={setSnackbarState}
                snackbarState={snackbarState}
            />
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
        </>
    );
}

export default Billing;
