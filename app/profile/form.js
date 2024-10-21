"use client";

import React, { use, useEffect, useState } from "react";
import { auth } from "../components/firebase"; // Adjust the path as necessary
import { updateEmail, sendEmailVerification } from "firebase/auth"; // For changing email and sending email verification
import Toast from "../components/toast";
import NavigationBar from "../components/navbar";
import { useRouter } from "next/navigation";

function Profile() {
    const router = useRouter();

    const [email, setEmail] = useState(""); // Fetch current user's email
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login"); // Redirect to login if not authenticated
            } else {
                setEmail(user.email);
                setIsEmailVerified(user.emailVerified);
                setLoading(false); // User is authenticated, set loading to false
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router]);

    const handleSendVerificationEmail = async () => {
        auth.currentUser.reload().then(() => {
            if (!auth.currentUser.emailVerified) {
                sendEmailVerification(auth.currentUser).then(() => {
                    setSeverity("success");
                    setSnackbarText("Verification email sent!");
                    setSnackbarState(true);
                }).catch((error) => {
                    setSeverity("error");
                    setSnackbarText(error.message);
                    setSnackbarState(true);
                });
            } else {
                setIsEmailVerified(true);
                setSeverity("info");
                setSnackbarText("Email is already verified!");
                setSnackbarState(true);
            }
        }).catch((error) => {
            setSeverity("error");
            setSnackbarText(error.message);
            setSnackbarState(true);
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                Loading...
            </div>
        ); // Show loading while checking auth
    }

    return (
        <>
            <div className="flex flex-col h-[100dvh]">
                <NavigationBar />
                <div className="flex flex-col items-center justify-center flex-grow px-6 py-8 lg:py-0">
                    <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 w-full max-w-md">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Profile Settings
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSendVerificationEmail}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className="flex items-center"> {/* Flex container for horizontal alignment */}
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        disabled={true}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendVerificationEmail}
                                        className="ml-2 h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        disabled={isEmailVerified}
                                    >
                                        {isEmailVerified ? "Verified" : "Verify"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

export default Profile;
