"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Toast from "../components/toast";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc"; // Import the Google icon

function Signup() {
    const router = useRouter();
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [emailPasswordLoading, setEmailPasswordLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        retypePassword: "",
    });

    const firebaseConfig = {
        apiKey: "AIzaSyACZU__jbP-tw6x8D81A2NrmH7E1yn8aTI",
        authDomain: "socketlink-830db.firebaseapp.com",
        projectId: "socketlink-830db",
        storageBucket: "socketlink-830db.appspot.com",
        messagingSenderId: "361357261532",
        appId: "1:361357261532:web:d706d1883ab5a593051219",
        measurementId: "G-SGP3J8PTY5"
    };

    /** Initialize Firebase */
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSignupClicked = async (e) => {
        e.preventDefault();
        setEmailPasswordLoading(true);

        if (credentials.password !== credentials.retypePassword) {
            setEmailPasswordLoading(false);
            setSeverity("error");
            setSnackbarText("Passwords do not match.");
            setSnackbarState(true);
            return;
        }

        const { email, password } = credentials;

        createUserWithEmailAndPassword(auth, email, password).then((result) => {
            const user = result.user;
            sendEmailVerification(user);
            setEmailPasswordLoading(false);
            router.push("/login");
        }).catch((error) => {
            setSeverity("error");
            setSnackbarText(error.message);
            setSnackbarState(true);
            setEmailPasswordLoading(false);
        });
    };

    const handleGoogleSignup = async () => {
        setGoogleLoading(true);

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then((_result) => {
            setGoogleLoading(false);
            router.push("/");
        }).catch((error) => {
            setSeverity("error");
            setSnackbarText(error.message);
            setSnackbarState(true);
            setGoogleLoading(false);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                                            href="/terms"
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={emailPasswordLoading && googleLoading}
                            >
                                {emailPasswordLoading ? 'Signing up...' : 'Sign up'}
                            </button>

                            {/* Google Signup Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="w-full flex items-center justify-center mt-2 text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
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

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

export default Signup;
