"use client";

import { useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { useRouter } from "next/navigation";
import NavigationBar from "../components/navbar";
import axios from "axios";
import Toast from "../components/toast";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from "moment/moment";

export default function Metrics() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [stats, setStats] = useState({
        messagesSent: [],
        connectedUsers: [],
        averagePayloadSize: [],
        totalPayloadSent: [],
        averageLatency: [],
        droppedMessages: [],
        totalSuccessAPICalls: [],
        totalFailedAPICalls: [],
        totalFailedConnectionAttempts: [],
        totalMySQLDBBatchWrites: [],
        totalLocalDBWrites: [],
        totalSuccessWebhookCalls: [],
        totalFailedWebhookCalls: [],
    });

    useEffect(() => {
        let intervalId;

        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
                fetchStats();

                intervalId = setInterval(fetchStats, 60 * 1000);
            }
        });

        return () => {
            clearInterval(intervalId);
        };
    }, [router]);

    useEffect(() => {
        document.title = "Metrics | Socketlink";
    });

    const fetchStats = async () => {
        if (auth.currentUser.emailVerified === false) {
            auth.currentUser.reload().then(() => {
                if (auth.currentUser.emailVerified === false) {
                    /* setSnackbarText("Please verify your email using the link sent to your email inbox!");
                    setSeverity("error");
                    setSnackbarState(true);
                    return; */
                } else {
                    getMetrics(true);
                }
            }).catch((error) => {
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
                return;
            });
        } else {
            getMetrics();
        }
    }

    const getMetrics = async (refreshToken = false) => {
        auth.currentUser.getIdToken(refreshToken).then((token) => {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/get-metrics`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                const { messages_sent, connections, total_payload_sent, average_latency, dropped_messages, total_failed_api_calls, total_success_api_calls, total_failed_connection_attempts, total_mysql_db_batch_writes, total_local_db_writes, total_success_webhook_calls, total_failed_webhook_calls } = response.data;

                setStats((prevStats) => ({
                    messagesSent: [...prevStats.messagesSent, { time: new Date().toLocaleTimeString(), value: messages_sent || 0 }],
                    connectedUsers: [...prevStats.connectedUsers, { time: new Date().toLocaleTimeString(), value: connections || 0 }],
                    averagePayloadSize: [...prevStats.averagePayloadSize, { time: new Date().toLocaleTimeString(), value: ((total_payload_sent / messages_sent) || 0) / 1024 }],
                    totalPayloadSent: [...prevStats.totalPayloadSent, { time: new Date().toLocaleTimeString(), value: (total_payload_sent / (1024 * 1024)) || 0 }],
                    averageLatency: [...prevStats.averageLatency, { time: new Date().toLocaleTimeString(), value: average_latency || 0 }],
                    droppedMessages: [...prevStats.droppedMessages, { time: new Date().toLocaleTimeString(), value: dropped_messages || 0 }],
                    totalSuccessAPICalls: [...prevStats.totalSuccessAPICalls, { time: new Date().toLocaleTimeString(), value: total_success_api_calls || 0 }],
                    totalFailedAPICalls: [...prevStats.totalFailedAPICalls, { time: new Date().toLocaleTimeString(), value: total_failed_api_calls || 0 }],
                    totalFailedConnectionAttempts: [...prevStats.totalFailedConnectionAttempts, { time: new Date().toLocaleTimeString(), value: total_failed_connection_attempts || 0 }],
                    totalMySQLDBBatchWrites: [...prevStats.totalMySQLDBBatchWrites, { time: new Date().toLocaleTimeString(), value: total_mysql_db_batch_writes || 0 }],
                    totalLocalDBWrites: [...prevStats.totalLocalDBWrites, { time: new Date().toLocaleTimeString(), value: total_local_db_writes || 0 }],
                    totalSuccessWebhookCalls: [...prevStats.totalSuccessWebhookCalls, { time: new Date().toLocaleTimeString(), value: total_success_webhook_calls || 0 }],
                    totalFailedWebhookCalls: [...prevStats.totalFailedWebhookCalls, { time: new Date().toLocaleTimeString(), value: total_failed_webhook_calls || 0 }],
                }));
            }).catch((error) => {
                if (error.response && error.response.status === 404) {
                    /** Metrics not found */
                } else {
                    setSnackbarText(
                        error?.response?.data?.message ||
                        error?.message ||
                        "An error occurred while fetching metrics!"
                    );
                    setSeverity("error");
                    setSnackbarState(true);
                }
            });
        }).catch((error) => {
            setSnackbarText(error.message);
            setSeverity("error");
            setSnackbarState(true);
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
            <div className="flex flex-col h-[100dvh] text-white dark:bg-gray-900">
                <NavigationBar />
                <div className="flex flex-col items-center justify-center flex-grow p-6 md:p-8 mt-20 dark:bg-gray-900">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-wide">
                            Metrics
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
                            Real-time overview of your WebSocket server performance and user activity.
                        </p>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                        <MetricsChart
                            title="Connected Users"
                            data={stats.connectedUsers}
                            color="#10b981" // Emerald
                        />
                        <MetricsChart
                            title="Total Messages Sent Over Websocket"
                            data={stats.messagesSent}
                            color="#4f46e5" // Indigo
                        />
                        <MetricsChart
                            title="Dropped Websocket Messages"
                            data={stats.droppedMessages}
                            color="#14b8a6" // Teal
                        />
                        <MetricsChart
                            title="Average Latency for Message Transfer (ms)"
                            data={stats.averageLatency}
                            color="#f97316" // Orange
                        />
                        <MetricsChart
                            title="Total Data Sent Over Websockets in MB"
                            data={stats.totalPayloadSent}
                            color="#ef4444" // Red
                        />
                        <MetricsChart
                            title="Average Payload Size Sent Over Websockets in KB"
                            data={stats.averagePayloadSize}
                            color="#3b82f6" // Blue
                        />
                        <MetricsChart
                            title="Total Success API Calls"
                            data={stats.totalSuccessAPICalls}
                            color="#8b5cf6" // Violet
                        />
                        <MetricsChart
                            title="Total Failed API Calls"
                            data={stats.totalFailedAPICalls}
                            color="#f43f5e" // Rose
                        />
                        <MetricsChart
                            title="Total MySQL Batch Writes"
                            data={stats.totalMySQLDBBatchWrites}
                            color="#10b981" // Emerald (reused subtly)
                        />
                        <MetricsChart
                            title="Total Local DB Writes"
                            data={stats.totalLocalDBWrites}
                            color="#eab308" // Yellow
                        />
                        <MetricsChart
                            title="Total Success Webhook Calls"
                            data={stats.totalSuccessWebhookCalls}
                            color="#06b6d4" // Cyan
                        />
                        <MetricsChart
                            title="Total Failed Webhook Calls"
                            data={stats.totalFailedWebhookCalls}
                            color="#be123c" // Crimson
                        />
                        <MetricsChart
                            title="Total Failed Connection Attempts"
                            data={stats.totalFailedAPICalls}
                            color="#7c3aed" // Purple
                        />
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

function MetricsChart({ title, data, color }) {
    const [hovered, setHovered] = useState(false);
    const interval = Math.ceil(data.length / 10);

    return (
        <div className="bg-gray-800 rounded-2xl shadow-md p-3 border-2 border-white/20">
            <h2 className="text-md text-center text-white mb-3 font-semibold tracking-wide">
                {title}
            </h2>

            {data.length === 0 ? (
                <div className="flex items-center justify-center h-[250px] text-gray-400 text-sm">
                    No data available
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis
                            dataKey="time"
                            interval={interval}
                            tick={{ fill: '#ccc', fontSize: 12 }}
                            dy={6}
                            tickFormatter={(t) =>
                                moment(t, "HH:mm:ss").format('HH:mm')
                            }
                        />
                        <YAxis
                            tick={{ fill: '#ccc', fontSize: 12 }}
                            tickFormatter={(v) =>
                                v >= 1_000_000
                                    ? `${(v / 1_000_000).toFixed(1)}M`
                                    : v >= 1_000
                                        ? `${(v / 1_000).toFixed(1)}K`
                                        : v
                            }
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f1f1f', borderColor: '#444' }}
                            labelStyle={{ color: '#eee' }}
                            itemStyle={{ color: '#fff', fontSize: 12 }}
                            formatter={(v) => new Intl.NumberFormat().format(v)}
                        />
                        <Legend
                            verticalAlign="top"
                            height={24}
                            wrapperStyle={{ color: '#bbb', fontSize: 12 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            dot={hovered ? { stroke: color, strokeWidth: 2, r: 4 } : false}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}


