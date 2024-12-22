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

    const fetchStats = async () => {
        if (auth.currentUser.emailVerified === false) {
            auth.currentUser.reload().then(() => {
                if (auth.currentUser.emailVerified === false) {
                    setSnackbarText("Please verify your email using the link sent to your email inbox!");
                    setSeverity("error");
                    setSnackbarState(true);
                    return;
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
                const { messages_sent, connections, averagePayloadSize } = response.data;

                setStats((prevStats) => ({
                    messagesSent: [...prevStats.messagesSent, { time: new Date().toLocaleTimeString(), value: messages_sent || 0 }],
                    connectedUsers: [...prevStats.connectedUsers, { time: new Date().toLocaleTimeString(), value: connections || 0 }],
                    averagePayloadSize: [...prevStats.averagePayloadSize, { time: new Date().toLocaleTimeString(), value: averagePayloadSize || 0 }],
                }));
            }).catch((error) => {
                setSnackbarText(error.message);
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                        <MetricsChart
                            title="Messages Sent Over Time"
                            data={stats.messagesSent}
                            color="#4f46e5"
                        />
                        <MetricsChart
                            title="Connected Users Over Time"
                            data={stats.connectedUsers}
                            color="#10b981"
                        />
                        <MetricsChart
                            title="Average Payload Size Over Time"
                            data={stats.averagePayloadSize}
                            color="#a855f7"
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

    // Calculate how many intervals should be displayed
    const interval = Math.ceil(data.length / 10);

    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-4 border-2 border-white/20">
            <h2 className="text-2xl font-semibold text-center text-white mb-6 shadow-sm">
                {title}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                        dataKey="time"
                        tick={{ fill: '#bbb' }}
                        dy={10}
                        tickFormatter={(timeStr) => moment(timeStr, "HH:mm:ss").format('HH:mm')}
                        interval={interval} // Control the number of intervals shown
                    />
                    <YAxis
                        tickFormatter={(value) => {
                            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
                            if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
                            return value;
                        }}
                        tick={{ fill: '#bbb' }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value) => new Intl.NumberFormat().format(value)}
                    />
                    <Legend
                        layout="horizontal"
                        align="center"
                        wrapperStyle={{
                            color: '#bbb',
                            paddingTop: '20px',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        dot={hovered ? { stroke: color, strokeWidth: 2, r: 5 } : false} // Show dots only when hovered
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
