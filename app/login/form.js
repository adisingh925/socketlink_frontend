"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getMultiFactorResolver, TotpMultiFactorGenerator, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import Toast from "../components/toast";
import NavigationBar from "../components/navbar";
import Mfa from "../components/inputTotpDialog";

function Login() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [emailPasswordLoading, setEmailPasswordLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const authError = useRef(null);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/");
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    useEffect(() => {
        document.title = "Login | Socketlink";
    });

    const handleLoginClicked = async (e) => {
        e.preventDefault();
        setEmailPasswordLoading(true);

        try {
            await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

            await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

            setEmailPasswordLoading(false);
        } catch (error) {
            setEmailPasswordLoading(false);

            if (error.code === "auth/multi-factor-auth-required") {
                authError.current = error;
                setIsOpen(true);
            } else {
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);

            const provider = new GoogleAuthProvider();

            await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

            const result = await signInWithPopup(auth, provider);

            setGoogleLoading(false);
        } catch (error) {
            setGoogleLoading(false); // Ensure loading state is reset

            if (error.code === "auth/multi-factor-auth-required") {
                authError.current = error;
                setIsOpen(true);
            } else {
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            }
        }
    };

    const handleMFASubmit = async (e) => {
        e.preventDefault();

        try {
            const mfaResolver = getMultiFactorResolver(auth, authError.current);
            const multiFactorAssertion = TotpMultiFactorGenerator.assertionForSignIn(
                mfaResolver.hints[0].uid,
                code
            );

            await mfaResolver.resolveSignIn(multiFactorAssertion);

            setSeverity("success");
            setSnackbarText("MFA verification successful!");
            setSnackbarState(true);
        } catch (error) {
            setSeverity("error");
            setSnackbarText(error.message);
            setSnackbarState(true);
        } finally {
            closeDialog();
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

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
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
                    <div className="rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 bg-gray-200 w-full max-w-md border-2 dark:border-white/20 border-gray-500/20">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginClicked}>
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
                                        autoComplete="on"
                                        required
                                        minLength={6}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 bg-blue-600 dark:hover:bg-blue-700 hover:bg-blue-700 transition-transform duration-150"
                                    disabled={emailPasswordLoading || googleLoading}
                                >
                                    {emailPasswordLoading ? 'Signing in...' : 'Sign in'}
                                </button>

                                {/* Google Sign In Button */}
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center mt-2 text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                                    disabled={emailPasswordLoading || googleLoading}
                                >
                                    <FcGoogle className="text-xl mr-2" />
                                    {googleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />

            <Mfa handleSubmit={handleMFASubmit} code={code} setCode={setCode} isOpen={isOpen} setIsOpen={setIsOpen} closeDialog={closeDialog} />
        </>
    );
}

export default Login;