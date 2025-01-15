"use client";

import React, { useState, useEffect } from "react";
import FloatingNavigationBar from "../components/navbar";
import Toast from "../components/toast";
import axios from "axios";
import { auth } from "../components/firebase";
import { useRouter } from "next/navigation";

function WebhookManagement() {
    const router = useRouter();

    const [selectedWebhooks, setSelectedWebhooks] = useState(new Set());
    const [webhookUrl, setWebhookUrl] = useState("");
    const [webhookSecret, setWebhookSecret] = useState("");
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);

    const Webhooks = {
        /** Connection-related events */
        ON_CONNECTION_UPGRADE_REJECTED: 1 << 0, // 1 (binary 00000001)

        /** Message-related events */
        ON_MESSAGE_PUBLIC_ROOM: 1 << 1,        // 2 (binary 00000010)
        ON_MESSAGE_PRIVATE_ROOM: 1 << 2,       // 4 (binary 00000100)
        ON_MESSAGE_PRIVATE_STATE_ROOM: 1 << 3, // 8 (binary 00001000)
        ON_MESSAGE_PUBLIC_STATE_ROOM: 1 << 4,  // 16 (binary 00010000)

        /** Common webhooks */
        ON_RATE_LIMIT_EXCEEDED: 1 << 5,            // 32 (binary 00100000)
        ON_RATE_LIMIT_LIFTED: 1 << 6,              // 64 (binary 01000000)
        ON_MESSAGE_DROPPED: 1 << 7,               // 128 (binary 10000000)
        ON_MONTHLY_DATA_TRANSFER_LIMIT_EXHAUSTED: 1 << 8, // 256 (binary 100000000)
        ON_MESSAGE_SIZE_EXCEEDED: 1 << 9,         // 512 (binary 1000000000)
        ON_MAX_CONNECTION_LIMIT_REACHED: 1 << 10,  // 1024 (binary 10000000000)
        ON_VERIFICATION_REQUEST: 1 << 11,          // 2048 (binary 100000000000)

        /** Connection open events */
        ON_CONNECTION_OPEN_PUBLIC_ROOM: 1 << 12,        // 4096 (binary 10000000000000)
        ON_CONNECTION_OPEN_PRIVATE_ROOM: 1 << 13,       // 8192 (binary 100000000000000)
        ON_CONNECTION_OPEN_PRIVATE_STATE_ROOM: 1 << 14, // 16384 (binary 1000000000000000)
        ON_CONNECTION_OPEN_PUBLIC_STATE_ROOM: 1 << 15,  // 32768 (binary 10000000000000000)

        /** Connection close events */
        ON_CONNECTION_CLOSE_PUBLIC_ROOM: 1 << 16,        // 65536 (binary 100000000000000000)
        ON_CONNECTION_CLOSE_PRIVATE_ROOM: 1 << 17,       // 131072 (binary 1000000000000000000)
        ON_CONNECTION_CLOSE_PRIVATE_STATE_ROOM: 1 << 18, // 262144 (binary 10000000000000000000)
        ON_CONNECTION_CLOSE_PUBLIC_STATE_ROOM: 1 << 19,  // 524288 (binary 100000000000000000000)

        /** Room occupied events */
        ON_ROOM_OCCUPIED_PUBLIC_ROOM: 1 << 20,        // 1048576 (binary 1000000000000000000000)
        ON_ROOM_OCCUPIED_PRIVATE_ROOM: 1 << 21,       // 2097152 (binary 10000000000000000000000)
        ON_ROOM_OCCUPIED_PRIVATE_STATE_ROOM: 1 << 22, // 4194304 (binary 100000000000000000000000)
        ON_ROOM_OCCUPIED_PUBLIC_STATE_ROOM: 1 << 23,  // 8388608 (binary 1000000000000000000000000)

        /** Room vacated events */
        ON_ROOM_VACATED_PUBLIC_ROOM: 1 << 24,        // 16777216 (binary 10000000000000000000000000)
        ON_ROOM_VACATED_PRIVATE_ROOM: 1 << 25,       // 33554432 (binary 100000000000000000000000000)
        ON_ROOM_VACATED_PRIVATE_STATE_ROOM: 1 << 26, // 67108864 (binary 1000000000000000000000000000)
        ON_ROOM_VACATED_PUBLIC_STATE_ROOM: 1 << 27   // 134217728 (binary 10000000000000000000000000000)
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
                fetchWebhooks();
            }
        });
    }, [router]);

    const handleRedirect = () => {
        router.push("/pricing");
    };

    function createWebhookBitmask(selectedWebhooks) {
        let bitmask = 0;

        selectedWebhooks.forEach((webhook) => {
            if (Webhooks[webhook] !== undefined) {
                bitmask |= Webhooks[webhook];
            }
        });

        return bitmask;
    }

    const handleWebhookToggle = (id) => {
        setSelectedWebhooks((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    };

    const saveWebhooks = () => {
        if (!webhookUrl || selectedWebhooks.size === 0) {
            setSnackbarText("Please fill all fields and select at least one webhook!");
            setSeverity("error");
            setSnackbarState(true);
            return;
        }

        const webhookBitmask = createWebhookBitmask(selectedWebhooks);

        auth.currentUser.getIdToken().then((token) => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/update-webhooks`,
                {
                    webhook_url: webhookUrl,
                    webhook_secret: webhookSecret,
                    webhooks: webhookBitmask,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => {
                setSnackbarState(true);
                setSeverity("success");
                setSnackbarText("Webhooks saved successfully!");
            }).catch((error) => {
                setSnackbarState(true);
                setSeverity("error");
                setSnackbarText(
                    error.response.data.message || "An error occurred while saving webhooks!"
                );
            });
        });
    };

    const fetchWebhooks = async () => {
        auth.currentUser.getIdToken().then((token) => {
            try {
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-webhooks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.data.code === 0) {
                        setSnackbarText(response.data.message);
                        setSeverity("info");
                        setSnackbarState(true);
                        setIsActive(false);
                        return;
                    }

                    setIsActive(true);

                    const { webhook_url, webhook_secret, webhooks } = response.data.subscription;

                    setWebhookUrl(webhook_url || "");
                    setWebhookSecret(webhook_secret || "");

                    const selected = new Set();
                    Object.entries(Webhooks).forEach(([key, value]) => {
                        if (webhooks & value) {
                            selected.add(key);
                        }
                    });
                    setSelectedWebhooks(selected);
                }).catch((error) => {
                    setSnackbarText(
                        error?.response?.data?.message ?? "An error occurred while fetching webhooks!"
                    );
                    setSeverity("error");
                    setSnackbarState(true);
                });
            } catch (error) {
                setSnackbarText("Failed to load webhook config!");
                setSeverity("error");
                setSnackbarState(true);
            } finally {
                setLoading(false);
            }
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

    return (
        <>
            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <FloatingNavigationBar />
                <div className="flex items-center justify-center px-6 py-10 mt-20 flex-grow dark:bg-gray-900">
                    <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border-2 border-white/20 overflow-hidden">
                        {isActive ? (
                            <>
                                <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6 glow">
                                    Webhook Management
                                </h2>
                                <div className="space-y-6">
                                    {/* Webhook URL */}
                                    <InfoRow
                                        input={
                                            <input
                                                type="url"
                                                value={webhookUrl}
                                                onChange={(e) => setWebhookUrl(e.target.value)}
                                                placeholder="Enter your webhook URL"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="Enter the URL of the webhook"
                                    />

                                    {/* Webhook Secret */}
                                    <InfoRow
                                        input={
                                            <input
                                                type="text"
                                                value={webhookSecret}
                                                onChange={(e) => setWebhookSecret(e.target.value)}
                                                placeholder="Enter your webhook secret"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="Enter your webhook secret for authentication"
                                    />

                                    {/* Webhook Selection */}
                                    <div className="space-y-2">
                                        <div className="flex flex-col gap-4">
                                            {Object.entries(Webhooks).map(([key, value]) => (
                                                <label
                                                    key={key}
                                                    className="flex items-center space-x-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedWebhooks.has(key)}
                                                        onChange={() => handleWebhookToggle(key)}
                                                        className="text-yellow-400 focus:ring-yellow-400"
                                                    />
                                                    <span className="text-xs font-bold text-gray-300">
                                                        {key} {/* Displaying the key in capital letters with underscores */}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <button
                                        onClick={saveWebhooks}
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Save Webhooks
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Webhooks Inactive
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    It seems you haven&apos;t subscribed to any plans yet.
                                </p>
                                <button
                                    onClick={handleRedirect}
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Choose a Plan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Snackbar */}
            <Toast
                message={snackbarText}
                severity={severity}
                setSnackbarState={setSnackbarState}
                snackbarState={snackbarState}
            />
        </>
    );
}

const InfoRow = ({ input, hint }) => (
    <div className="flex flex-col gap-2">
        <div className="flex-grow">{input}</div>
        <span className="text-xs text-gray-400">{hint}</span>
    </div>
);

export default WebhookManagement;
