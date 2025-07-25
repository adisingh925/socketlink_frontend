"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/toast";
import FloatingNavigationBar from "../components/navbar";
import { auth } from "../components/firebase";

function ContactUs() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");

    useEffect(() => {
        document.title = "Contact Us | Socketlink";
    });

    const checkEmailVerificationAndSendQuery = async (query) => {
        const user = auth.currentUser;

        if (!user) {
            setSnackbarText("You must be logged in to perform this action.");
            setSeverity("error");
            setSnackbarState(true);
            return;
        }

        if (!user.emailVerified) {
            try {
                await user.reload();
                if (!auth.currentUser.emailVerified) {
                    setSnackbarText("Please verify your email using the link sent to your inbox!");
                    setSeverity("error");
                    setSnackbarState(true);
                    return;
                } else {
                    sendQuery(query, true);
                }
            } catch (error) {
                setSnackbarText(error.message);
                setSeverity("error");
                setSnackbarState(true);
                return;
            }
        } else {
            sendQuery(query);
        }
    };

    const sendQuery = async (message, refreshToken = false) => {
        auth.currentUser.getIdToken(refreshToken).then((token) => {
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/query`;

            const body = {
                query: message,
            };

            axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((response) => {
                if (response.status === 200) {
                    setSnackbarText('Thankyou! We\'ve received your query, and we\'ll get back to you shortly.');
                    setSeverity('success');
                    setSnackbarState(true);
                    setQuery('');
                }
            }).catch((error) => {
                setSnackbarText(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong, please try again later!"
                );
                setSeverity('error');
                setSnackbarState(true);
            });
        }).catch((error) => {
            setSnackbarText(error.message);
            setSeverity('error');
            setSnackbarState(true);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            checkEmailVerificationAndSendQuery(query);
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
            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <FloatingNavigationBar />
                <div className="isolate h-[100dvh] px-6 py-8 sm:py-8 lg:px-8 dark:text-white mt-20">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="mb-8 text-5xl tracking-tight font-extrabold">
                            Contact Us
                        </h1>
                        <p className="mt-2 text-xl leading-8">
                            In case you have any queries or suggestions, send us your query using the form below or reach out to us at{" "}
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@socketlink.io"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="text-blue-300 hover:underline hover:underline-offset-4 cursor-pointer">
                                    support@socketlink.io
                                </span>
                            </a>
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <textarea
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = e.target.scrollHeight + "px";
                                }}
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = e.target.scrollHeight + "px";
                                }}
                                className="w-full min-h-[120px] p-4 border-2 border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-white overflow-hidden resize-none transition-all"
                                rows="4"
                                maxLength={1000}
                                placeholder="Write your query here..."
                            ></textarea>

                            <button
                                type="submit"
                                className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

export default ContactUs;
