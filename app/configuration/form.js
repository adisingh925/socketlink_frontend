"use client";

import React, { useState, useEffect } from "react";
import FloatingNavigationBar from "../components/navbar";
import Toast from "../components/toast";
import axios from "axios";
import { auth } from "../components/firebase";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Script from "next/script";

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

    /** server configuration */
    const [idleTimeout, setIdleTimeout] = useState(0);
    const [maxLifetime, setMaxLifetime] = useState(0);

    const handleSQLIntegrationToggle = () => {
        const newSQLIntegrationState = !isSQLIntegrationEnabled;
        setIsSQLIntegrationEnabled(!isSQLIntegrationEnabled);

        auth.currentUser.getIdToken().then((token) => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/update-sql-integration`,
                {
                    is_sql_integration_enabled: newSQLIntegrationState,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => {
                if (newSQLIntegrationState) {
                    setSnackbarState(true);
                    setSeverity("success");
                    setSnackbarText("SQL Integration Enabled!");
                } else {
                    setSnackbarState(true);
                    setSeverity("success");
                    setSnackbarText("SQL Integration Disabled!");
                }
            }).catch((error) => {
                setIsSQLIntegrationEnabled(!newSQLIntegrationState);
                setSnackbarState(true);
                setSeverity("error");
                setSnackbarText(
                    error?.response?.data?.message || `An error occurred while ${newSQLIntegrationState ? "enabling" : "disabling"} MySQL integration!`
                );
            });
        });
    };

    const Webhooks = Object.freeze({
        /** Message-related events */
        ON_MESSAGE: 1n << 1n,

        /** Connection verification events */
        ON_VERIFICATION_REQUEST: 1n << 2n,

        /** Connection open events */
        ON_SUBSCRIBE: 1n << 3n,

        /** Connection close events */
        ON_UNSUBSCRIBE: 1n << 4n,

        /** Room occupancy events */
        ON_ROOM_OCCUPIED: 1n << 5n,

        /** Room vacancy events */
        ON_ROOM_VACATED: 1n << 6n
    });

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function createWebhookBitmask(selectedWebhooks) {
        let bitmask = 0n;
        selectedWebhooks.forEach((webhook) => {
            if (Webhooks[webhook] !== undefined) {
                bitmask |= Webhooks[webhook];
            }
        });

        return bitmask;
    }

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
                    webhooks: webhookBitmask.toString(),
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
                    error?.response?.data?.message ||
                    error?.message ||
                    "An error occurred while saving webhooks!"
                );
            });
        });
    };

    const saveServerConfigs = () => {
        if (idleTimeout == null || maxLifetime == null) {
            setSnackbarText("Please fill all server configuration fields!");
            setSeverity("error");
            setSnackbarState(true);
            return;
        }

        auth.currentUser.getIdToken().then((token) => {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/update-server-config`,
                {
                    idle_timeout_in_seconds: idleTimeout,
                    max_lifetime_in_minutes: maxLifetime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => {
                setSnackbarState(true);
                setSeverity("success");
                setSnackbarText("Server configurations saved successfully!");
            }).catch((error) => {
                setSnackbarState(true);
                setSeverity("error");
                setSnackbarText(
                    error?.response?.data?.message ||
                    error?.message ||
                    "An error occurred while saving server configurations!"
                );
            });
        });
    }

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
                setSeverity("success");
                setSnackbarText("SQL credentials saved successfully!");
                setSnackbarState(true);
            }).catch((error) => {
                setSeverity("error");
                setSnackbarText(
                    error?.response?.data?.message ||
                    error?.message ||
                    "An error occurred while saving SQL credentials!"
                );
                setSnackbarState(true);
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
                    fetchServerConfig(true);
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
            fetchServerConfig();
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

                    setIsActive(true);

                    const { db_host, db_user, db_password, db_name, db_port, is_sql_integration_enabled, db_commit_batch_size } = response.data.subscription;

                    console.log(is_sql_integration_enabled);

                    setDbHost(db_host || "");
                    setDbName(db_name || "");
                    setDbPassword(db_password || "");
                    setDbUser(db_user || "");
                    setDbPort(db_port || "");
                    setDbCommitBatchSize(db_commit_batch_size || -1);
                    setIsSQLIntegrationEnabled(is_sql_integration_enabled || false);
                }).catch((error) => {
                    if (error.response && error.response.status === 404) {
                        /** SQL configs not found not found */
                    } else {
                        setSnackbarText(
                            error?.response?.data?.message ||
                            error?.message ||
                            "An error occurred while fetching webhooks!"
                        );
                        setSeverity("error");
                        setSnackbarState(true);
                    }
                });
            } catch (error) {
                setSnackbarText("Something went wrong, please try again later!");
                setSeverity("error");
                setSnackbarState(true);
            } finally {
                setLoading(false);
            }
        });
    };

    const fetchServerConfig = async (refreshToken = false) => {
        try {
            const token = await auth.currentUser.getIdToken(refreshToken);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-server-config`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.code === 0) {
                /* setSnackbarText(response.data.message);
                setSeverity("info");
                setSnackbarState(true); */
                setIsActive(false);
                return;
            }

            setIsActive(true);

            const { idle_timeout_in_seconds, max_lifetime_in_minutes } = response.data.subscription;

            setIdleTimeout(idle_timeout_in_seconds || 60);
            setMaxLifetime(max_lifetime_in_minutes || 0);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                /** Server configs not found not found */
            } else {
                setSnackbarText(
                    error?.response?.data?.message ||
                    error?.message ||
                    "An error occurred while fetching server configurations!"
                );
                setSeverity("error");
                setSnackbarState(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchWebhooks = async (refreshToken = false) => {
        try {
            const token = await auth.currentUser.getIdToken(refreshToken);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-webhooks`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.code === 0) {
                /* setSnackbarText(response.data.message);
                setSeverity("info");
                setSnackbarState(true); */
                setIsActive(false);
                return;
            }

            setIsActive(true);

            const { webhook_url, webhook_secret, webhooks } = response.data.subscription;

            setWebhookUrl(webhook_url || "");
            setWebhookSecret(webhook_secret || "");

            const selected = new Set();
            if (webhooks !== null) {
                Object.entries(Webhooks).forEach(([key, value]) => {
                    if ((BigInt(webhooks) & BigInt(value)) !== 0n) {
                        selected.add(key);
                    }
                });
            }

            setSelectedWebhooks(selected);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                /** webhooks not found not found */
            } else {
                setSnackbarText(
                    error?.response?.data?.message ||
                    error?.message ||
                    "An error occurred while fetching webhooks!"
                );
                setSeverity("error");
                setSnackbarState(true);
            }
        } finally {
            setLoading(false);
        }
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
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-SGP3J8PTY5" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="worker">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'G-SGP3J8PTY5');
                `}
            </Script>

            <FloatingNavigationBar />
            {isActive ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10 mt-20 dark:bg-gray-900 justify-items-center">

                        <div className="w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border-2 border-white/20 flex flex-col self-start">
                            <h2 className="grow text-3xl font-extrabold text-center mb-5 text-yellow-400 glow">
                                Webhooks
                            </h2>

                            <div className="grow mb-3">
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
                            </div>

                            <div className="grow mb-3">
                                {/* Webhook Secret */}
                                <InfoRow
                                    input={
                                        <input
                                            type="text"
                                            value={webhookSecret}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 128) {
                                                    setWebhookSecret(e.target.value);
                                                }
                                            }}
                                            placeholder="Enter your webhook secret"
                                            maxLength={128}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    }
                                    hint="Enter your webhook secret for authentication (max 128 bytes)"
                                />
                            </div>

                            {/* Webhook Selection (Dropdown) */}
                            <div className="grow mb-3">
                                <div className="relative">
                                    <div className="bg-white border border-gray-300 rounded-2xl shadow-sm p-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                                        <div className="bg-white rounded-2xl shadow-sm pr-3.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                            {Object.entries(Webhooks).map(([key, value]) => (
                                                <label
                                                    key={key}
                                                    className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={key}
                                                        checked={selectedWebhooks.has(key)}
                                                        onChange={() => {
                                                            const updatedSelection = new Set(selectedWebhooks);
                                                            if (updatedSelection.has(key)) {
                                                                updatedSelection.delete(key);
                                                            } else {
                                                                updatedSelection.add(key);
                                                            }
                                                            setSelectedWebhooks(updatedSelection);
                                                        }}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-xs">{key.toUpperCase().replace(/_/g, " ")}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-2 text-xs text-gray-400">Select the required webhooks</p>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={saveWebhooks}
                                className="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Save Webhooks
                            </button>
                        </div>

                        {/* SQL Integration Card (No fixed height, only grows as needed) */}
                        <div className="flex flex-col w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border-2 border-white/20 overflow-hidden self-start">
                            <h2 className="grow mb-5 text-3xl font-extrabold text-center text-yellow-400 glow">
                                SQL Integration
                            </h2>

                            <div className="grow mb-3">
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
                            </div>

                            <div className="grow mb-3">
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
                            </div>

                            <div className="grow mb-3">
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
                            </div>

                            <div className="grow mb-3">
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
                            </div>

                            <div className="grow mb-3">
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
                            </div>

                            <div className="grow mb-3">
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
                                            placeholder="1000"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    }
                                    hint="MySQL commit batch size (1 to 5000)"
                                />
                            </div>

                            <div className="grow mb-3">
                                <div className="flex items-center space-x-2">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isSQLIntegrationEnabled}
                                            onChange={handleSQLIntegrationToggle}
                                        />
                                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                                    </label>
                                    <span
                                        className={`font-bold ${isSQLIntegrationEnabled ? 'text-blue-500' : 'text-red-500'}`}
                                    >
                                        {isSQLIntegrationEnabled ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={saveDbCredentials}
                                className="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Save Credentials
                            </button>
                        </div>

                        {/** server configs */}
                        <div className="flex flex-col w-full max-w-lg p-4 sm:p-8 bg-gray-800 text-white rounded-2xl shadow-xl border-2 border-white/20 overflow-hidden self-start">
                            <h2 className="grow mb-5 text-3xl font-extrabold text-center text-yellow-400 glow">
                                Server Configuration
                            </h2>

                            <div className="grow mb-3">
                                <InfoRow
                                    input={
                                        <input
                                            type="number"
                                            value={idleTimeout}
                                            required
                                            min="0"
                                            max="960"
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                if (value >= 0 && value <= 960) {
                                                    setIdleTimeout(value);
                                                } else if (e.target.value === '') {
                                                    setIdleTimeout('');
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (["e", "E", "+", "-"].includes(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="0"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    }
                                    hint="Idle timeout in seconds (0 to disable, otherwise 8 - 960)"
                                />
                            </div>

                            <div className="grow mb-3">
                                <InfoRow
                                    input={
                                        <input
                                            type="number"
                                            value={maxLifetime}
                                            required
                                            min="0"
                                            max="240"
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                if (value >= 0 && value <= 240) {
                                                    setMaxLifetime(value);
                                                } else if (e.target.value === '') {
                                                    setMaxLifetime('');
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (["e", "E", "+", "-"].includes(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="0"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    }
                                    hint="Max lifetime in minutes (0 to disable, max 240)"
                                />
                            </div>

                            <button
                                onClick={saveServerConfigs}
                                className="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Save Configuration
                            </button>
                        </div>

                    </div>
                </>
            ) : (
                <div className="flex h-[100dvh] justify-center items-center px-6">
                    <div className="space-y-4 p-4 sm:p-8 mt-20 bg-gray-800 text-white rounded-2xl shadow-xl border-2 border-white/20 overflow-hidden max-w-lg w-full">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            Configurations Inactive
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
                </div>
            )}

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
