"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Toast from "../components/toast";
import { auth } from "../components/firebase"; // Adjust the path as necessary
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc"; // Import the Google icon
import NavigationBar from "../components/navbar";

function Signup() {
    const router = useRouter();
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [emailPasswordLoading, setEmailPasswordLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const authError = useRef(null);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        retypePassword: "",
    });

    useEffect(() => {
        document.title = "Signup | Socketlink";
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/");
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSignupClicked = async (e) => {
        e.preventDefault();
        setEmailPasswordLoading(true);

        if (credentials.password !== credentials.retypePassword) {
            setSnackbarState(true);
            setSnackbarText("Passwords do not match.");
            setSeverity("error");
            return resetLoading();
        }

        try {
            /** persistence disabled */
            await setPersistence(auth, browserSessionPersistence);

            const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            await sendEmailVerification(result.user);
            router.push("/login");
        } catch (error) {
            setSnackbarState(true);
            setSnackbarText(error.message);
            setSeverity("error");
        } finally {
            resetLoading();
        }
    };

    const handleGoogleSignup = async () => {
        setGoogleLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            /** persistence disabled */
            await setPersistence(auth, browserSessionPersistence);
            
            await signInWithPopup(auth, provider);
        } catch (error) {
            if (error.code === "auth/multi-factor-auth-required") {
                authError.current = error;
                setIsOpen(true);
            } else {
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const resetLoading = () => {
        setEmailPasswordLoading(false);
        setGoogleLoading(false);
    }

    const closeDialog = () => {
        setIsOpen(false);
        setCode('');
        resetLoading();
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
                <NavigationBar />
                <div className="flex flex-col items-center justify-center flex-grow px-6 py-8 lg:py-0 mt-20">
                    <div className="bg-white rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 w-full max-w-md border-2 border-white/20">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSignupClicked}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={onChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={onChange}
                                        autoComplete="off"
                                        minLength={6}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="retypePassword"
                                        id="confirm-password"
                                        onChange={onChange}
                                        minLength={6}
                                        autoComplete="off"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300"
                                        >
                                            I accept the{" "}
                                            <Link
                                                href="/terms-conditions"
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                Terms and Conditions
                                            </Link>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition-transform duration-150"
                                    disabled={emailPasswordLoading && googleLoading}
                                >
                                    {emailPasswordLoading ? 'Signing up...' : 'Sign up'}
                                </button>

                                {/* Google Signup Button */}
                                <button
                                    type="button"
                                    onClick={handleGoogleSignup}
                                    className="w-full flex items-center justify-center mt-2 text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                                    disabled={googleLoading && emailPasswordLoading}
                                >
                                    <FcGoogle className="text-xl mr-2" />
                                    {googleLoading ? 'Signing up with Google...' : 'Sign up with Google'}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

export default Signup;
