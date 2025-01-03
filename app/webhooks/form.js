"use client";

import React, { useState, useEffect } from "react";
import FloatingNavigationBar from "../components/navbar";
import Toast from "../components/toast";
import { FiCheckSquare, FiKey, FiLink, FiSave } from "react-icons/fi";
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

    const Webhooks = {
        ON_CONNECTION_INIT: 1 << 0,
        ON_CONNECTION_OPEN: 1 << 1,
        ON_CONNECTION_CLOSE: 1 << 2,
        ON_MESSAGE: 1 << 3,
        ON_RATE_LIMIT_EXCEEDED: 1 << 4,
        ON_RATE_LIMIT_LIFTED: 1 << 5,
        ON_MESSAGE_DROPPED: 1 << 6,
        ON_DAILY_MESSAGE_LIMIT_EXHAUSTED: 1 << 7,
        ON_MESSAGE_SIZE_EXCEEDED: 1 << 8,
        ON_MAX_CONNECTION_LIMIT_REACHED: 1 << 9,
        ON_VERIFICATION_REQUEST: 1 << 10,
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
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/update-webhook`,
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
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-webhook`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    const { webhook_url, webhook_secret, webhooks } = response.data;

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
                        error.response.data.message || "An error occurred while fetching webhooks!"
                    );
                    setSeverity("error");
                    setSnackbarState(true);
                });
            } catch (error) {
                setSnackbarText("Failed to load webhook config!");
                setSeverity("error");
                setSnackbarState(true);
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
                                            <span className="text-sm text-gray-300">
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
