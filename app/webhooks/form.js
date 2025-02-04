"use client";

import React, { useState, useEffect } from "react";
import FloatingNavigationBar from "../components/navbar";
import Toast from "../components/toast";
import axios from "axios";
import { auth } from "../components/firebase";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

    /** Database Credentials State */
    const [dbHost, setDbHost] = useState("");
    const [dbUser, setDbUser] = useState("");
    const [dbPassword, setDbPassword] = useState("");
    const [dbName, setDbName] = useState("");
    const [dbPort, setDbPort] = useState("");
    const [dbCommitBatchSize, setDbCommitBatchSize] = useState(-1);
    const [isSQLIntegrationEnabled, setIsSQLIntegrationEnabled] = useState(false);

    const handleSQLIntegrationToggle = () => {
        setIsSQLIntegrationEnabled(!isSQLIntegrationEnabled);

        auth.currentUser.getIdToken().then((token) => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/update-sql-integration`,
                {
                    is_sql_integration_enabled: !isSQLIntegrationEnabled,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => {
                if (isSQLIntegrationEnabled) {
                    setSnackbarState(true);
                    setSeverity("success");
                    setSnackbarText("SQL Integration Disabled!");
                } else {
                    setSnackbarState(true);
                    setSeverity("success");
                    setSnackbarText("SQL Integration Enabled!");
                }
            }).catch((error) => {
                setSnackbarState(true);
                setSeverity("error");
                setSnackbarText(
                    error?.response?.data?.message || "An error occurred while saving SQL credentials!"
                );
            });
        });
    };

    const Webhooks = {
        /** Connection-related events */
        ON_CONNECTION_UPGRADE_REJECTED: 1 << 0,            // 1

        /** Message-related events */
        ON_MESSAGE_PUBLIC_ROOM: 1 << 1,                    // 2
        ON_MESSAGE_PRIVATE_ROOM: 1 << 2,                   // 4
        ON_MESSAGE_PUBLIC_STATE_ROOM: 1 << 3,              // 8
        ON_MESSAGE_PRIVATE_STATE_ROOM: 1 << 4,             // 16
        ON_MESSAGE_PUBLIC_CACHE_ROOM: 1 << 5,              // 32
        ON_MESSAGE_PRIVATE_CACHE_ROOM: 1 << 6,             // 64
        ON_MESSAGE_PUBLIC_STATE_CACHE_ROOM: 1 << 7,        // 128
        ON_MESSAGE_PRIVATE_STATE_CACHE_ROOM: 1 << 8,       // 256

        /** Common webhooks */
        ON_RATE_LIMIT_EXCEEDED: 1 << 9,                    // 512
        ON_RATE_LIMIT_LIFTED: 1 << 10,                     // 1024
        ON_MESSAGE_DROPPED: 1 << 11,                       // 2048
        ON_MONTHLY_DATA_TRANSFER_LIMIT_EXHAUSTED: 1 << 12, // 4096
        ON_MESSAGE_SIZE_EXCEEDED: 1 << 13,                 // 8192
        ON_MAX_CONNECTION_LIMIT_REACHED: 1 << 14,          // 16384
        ON_VERIFICATION_REQUEST: 1 << 15,                  // 32768

        /** Connection open events */
        ON_CONNECTION_OPEN_PUBLIC_ROOM: 1 << 16,           // 65536
        ON_CONNECTION_OPEN_PRIVATE_ROOM: 1 << 17,          // 131072
        ON_CONNECTION_OPEN_PUBLIC_STATE_ROOM: 1 << 18,     // 262144
        ON_CONNECTION_OPEN_PRIVATE_STATE_ROOM: 1 << 19,    // 524288
        ON_CONNECTION_OPEN_PUBLIC_CACHE_ROOM: 1 << 20,     // 1048576
        ON_CONNECTION_OPEN_PRIVATE_CACHE_ROOM: 1 << 21,    // 2097152
        ON_CONNECTION_OPEN_PUBLIC_STATE_CACHE_ROOM: 1 << 22, // 4194304
        ON_CONNECTION_OPEN_PRIVATE_STATE_CACHE_ROOM: 1 << 23, // 8388608

        /** Connection close events */
        ON_CONNECTION_CLOSE_PUBLIC_ROOM: 1 << 24,          // 16777216
        ON_CONNECTION_CLOSE_PRIVATE_ROOM: 1 << 25,         // 33554432
        ON_CONNECTION_CLOSE_PUBLIC_STATE_ROOM: 1 << 26,    // 67108864
        ON_CONNECTION_CLOSE_PRIVATE_STATE_ROOM: 1 << 27,   // 134217728
        ON_CONNECTION_CLOSE_PUBLIC_CACHE_ROOM: 1 << 28,    // 268435456
        ON_CONNECTION_CLOSE_PRIVATE_CACHE_ROOM: 1 << 29,   // 536870912
        ON_CONNECTION_CLOSE_PUBLIC_STATE_CACHE_ROOM: 1 << 30, // 1073741824
        ON_CONNECTION_CLOSE_PRIVATE_STATE_CACHE_ROOM: 1 << 31, // 2147483648

        /** Room occupancy events */
        ON_ROOM_OCCUPIED_PUBLIC_ROOM: 1 << 32,             // 4294967296
        ON_ROOM_OCCUPIED_PRIVATE_ROOM: 1 << 33,            // 8589934592
        ON_ROOM_OCCUPIED_PUBLIC_STATE_ROOM: 1 << 34,       // 17179869184
        ON_ROOM_OCCUPIED_PRIVATE_STATE_ROOM: 1 << 35,      // 34359738368
        ON_ROOM_OCCUPIED_PUBLIC_CACHE_ROOM: 1 << 36,       // 68719476736
        ON_ROOM_OCCUPIED_PRIVATE_CACHE_ROOM: 1 << 37,      // 137438953472
        ON_ROOM_OCCUPIED_PUBLIC_STATE_CACHE_ROOM: 1 << 38, // 274877906944
        ON_ROOM_OCCUPIED_PRIVATE_STATE_CACHE_ROOM: 1 << 39, // 549755813888

        /** Room vacancy events */
        ON_ROOM_VACATED_PUBLIC_ROOM: 1 << 40,              // 1099511627776
        ON_ROOM_VACATED_PRIVATE_ROOM: 1 << 41,             // 2199023255552
        ON_ROOM_VACATED_PUBLIC_STATE_ROOM: 1 << 42,        // 4398046511104
        ON_ROOM_VACATED_PRIVATE_STATE_ROOM: 1 << 43,       // 8796093022208
        ON_ROOM_VACATED_PUBLIC_CACHE_ROOM: 1 << 44,        // 17592186044416
        ON_ROOM_VACATED_PRIVATE_CACHE_ROOM: 1 << 45,       // 35184372088832
        ON_ROOM_VACATED_PUBLIC_STATE_CACHE_ROOM: 1 << 46,  // 70368744177664
        ON_ROOM_VACATED_PRIVATE_STATE_CACHE_ROOM: 1 << 47  // 140737488355328
    };

    const features = {
        /** In-Memory Data Storing */
        IN_MEMORY_DATA_STORING: 1 << 0, // 1 (binary 00000001)
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
                checkEmailVerificationAndFetchWebhookDetails();
            }
        });
    }, [router]);

    useEffect(() => {
        document.title = "Webhooks | Socketlink";
    });

    const handleRedirect = () => {
        router.push("/pricing");
    };

    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
        if (!webhookUrl) {
            setSnackbarText("Webhook URL is a required field!");
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

    const saveDbCredentials = () => {
        if (!dbHost || !dbUser || !dbPassword || !dbName || !dbPort) {
            setSnackbarText("Please fill all database fields!");
            setSeverity("error");
            setSnackbarState(true);
            return;
        }

        auth.currentUser.getIdToken().then((token) => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/update-sql-integration`,
                {
                    db_host: dbHost,
                    db_user: dbUser,
                    db_password: dbPassword,
                    db_name: dbName,
                    db_port: dbPort,
                    db_commit_batch_size: dbCommitBatchSize,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => {
                setSnackbarState(true);
                setSeverity("success");
                setSnackbarText("SQL credentials saved successfully!");
            }).catch((error) => {
                setSnackbarState(true);
                setSeverity("error");
                setSnackbarText(
                    error?.response?.data?.message || "An error occurred while saving SQL credentials!"
                );
            });
        });
    };

    const checkEmailVerificationAndFetchWebhookDetails = async () => {
        if (auth.currentUser.emailVerified === false) {
            auth.currentUser.reload().then(() => {
                if (auth.currentUser.emailVerified === false) {
                    /* setSnackbarText("Please verify your email using the link sent to your email inbox!");
                    setSeverity("error");
                    setSnackbarState(true);
                    return; */
                } else {
                    fetchWebhooks(true);
                    fetchSQLIntegration(true);
                }
            }).catch((error) => {
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
                return;
            });
        } else {
            fetchWebhooks();
            fetchSQLIntegration();
        }
    }

    const fetchSQLIntegration = async (refreshToken = false) => {
        auth.currentUser.getIdToken(refreshToken).then((token) => {
            try {
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-sql-integration`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.data.code === 0) {
                        /* setSnackbarText(response.data.message);
                        setSeverity("info");
                        setSnackbarState(true); */
                        setIsActive(false);
                        return;
                    }

                    console.log(response.data.subscription);

                    setIsActive(true);

                    const { db_host, db_user, db_password, db_name, db_port, is_sql_integration_enabled, db_commit_batch_size } = response.data.subscription;

                    setDbHost(db_host || "");
                    setDbName(db_name || "");
                    setDbPassword(db_password || "");
                    setDbUser(db_user || "");
                    setDbPort(db_port || "");
                    setDbCommitBatchSize(db_commit_batch_size || -1);
                    setIsSQLIntegrationEnabled(is_sql_integration_enabled || false);
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

    const fetchWebhooks = async (refreshToken = false) => {
        auth.currentUser.getIdToken(refreshToken).then((token) => {
            try {
                axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-webhooks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.data.code === 0) {
                        /* setSnackbarText(response.data.message);
                        setSeverity("info");
                        setSnackbarState(true); */
                        setIsActive(false);
                        return;
                    }

                    console.log(response.data.subscription);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10 mt-20 dark:bg-gray-900">
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

                    {/* SQL Integration Card (No fixed height, only grows as needed) */}
                    <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border-2 border-white/20 overflow-hidden self-start">
                        {isActive ? (
                            <>
                                <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6 glow">
                                    SQL Integration
                                </h2>
                                <div className="space-y-6">
                                    <InfoRow
                                        input={
                                            <input
                                                type="url"
                                                value={dbHost}
                                                required
                                                onChange={(e) => setDbHost(e.target.value)}
                                                placeholder="your-instance-name.region.cloudsql.com"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="Enter the MySQL DB Hostname"
                                    />

                                    <InfoRow
                                        input={
                                            <input
                                                type="text"
                                                value={dbUser}
                                                required
                                                onChange={(e) => setDbUser(e.target.value)}
                                                placeholder="username"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="Enter your MySQL DB Username"
                                    />

                                    <InfoRow
                                        input={
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"} // Conditionally set type
                                                    value={dbPassword}
                                                    required
                                                    onChange={(e) => setDbPassword(e.target.value)}
                                                    placeholder="password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                                {/* Toggle button for showing/hiding password */}
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    {showPassword ? (
                                                        <FaEyeSlash className="text-gray-500" />
                                                    ) : (
                                                        <FaEye className="text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
                                        }
                                        hint="Enter your MySQL DB Password"
                                    />

                                    <InfoRow
                                        input={
                                            <input
                                                type="number"
                                                required
                                                value={dbPort}
                                                min="0"
                                                max="65535"
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value, 10);
                                                    if (value >= 0 && value < 65536) {
                                                        setDbPort(value);
                                                    } else if (e.target.value === '') {
                                                        setDbPort('');
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                placeholder="port"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="Enter your MySQL DB Port (0 - 65535)"
                                    />

                                    <InfoRow
                                        input={
                                            <input
                                                type="text"
                                                value={dbName}
                                                required
                                                onChange={(e) => setDbName(e.target.value)}
                                                placeholder="database"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="Enter your MySQL DB Database"
                                    />

                                    <InfoRow
                                        input={
                                            <input
                                                type="number"
                                                value={dbCommitBatchSize}
                                                required
                                                min="1"
                                                max="5000"
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value, 10);
                                                    if (value >= 1 && value <= 5000) {
                                                        setDbCommitBatchSize(value);
                                                    } else if (e.target.value === '') {
                                                        setDbCommitBatchSize('');
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                placeholder="database"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        }
                                        hint="MySQL commit batch size (1 to 5000)"
                                    />

                                    <div className="flex items-center space-x-2">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={isSQLIntegrationEnabled}
                                                onChange={handleSQLIntegrationToggle}
                                            />
                                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
                                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                                        </label>
                                        <span
                                            className={`font-bold ${isSQLIntegrationEnabled ? 'text-blue-500' : 'text-red-500'}`}
                                        >
                                            {isSQLIntegrationEnabled ? "Integration ON" : "Integration OFF"}
                                        </span>
                                    </div>

                                    <button
                                        onClick={saveDbCredentials}
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Save Credentials
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    MYSQL Integration Inactive
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
