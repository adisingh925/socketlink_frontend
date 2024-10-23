"use client";

import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../components/firebase";
import { confirmPasswordReset, applyActionCode } from 'firebase/auth';
import Toast from "../../components/toast";
import { useSearchParams } from "next/navigation";

function UpdatePassword() {
    const searchParams = useSearchParams()

    const [password, setPassword] = useState({
        password: "",
        retype_password: "",
    });
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [isVerified, setIsVerified] = useState(0); // To track verification 
    const [isReverted, setIsReverted] = useState(0); // To track second factor addition

    useEffect(() => {
        if (searchParams.get("mode") === "verifyEmail") {
            applyActionCode(auth, searchParams.get("oobCode")).then(() => {
                setIsVerified(1);
            }).catch((error) => {
                setIsVerified(-1);
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            });
        } else if (searchParams.get("mode") === "revertSecondFactorAddition") {
            applyActionCode(auth, searchParams.get("oobCode")).then(() => {
                setIsReverted(1);
            }).catch((error) => {
                setIsReverted(-1);
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            });
        }
    }, []);

    const handleUpdatePasswordClicked = async (e) => {
        e.preventDefault();
        if (password.password !== password.retype_password) {
            setSeverity("error");
            setSnackbarText("Passwords do not match");
            setSnackbarState(true);
            return;
        }

        confirmPasswordReset(auth, searchParams.get("oobCode"), password.password).then(() => {
            setSeverity("success");
            setSnackbarText("Password updated successfully!");
            setSnackbarState(true);
        }).catch((error) => {
            setSeverity("error");
            setSnackbarText(error.message);
            setSnackbarState(true);
        });
    };

    const onChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value });
    };

    const getStatusMessage = () => {
        switch (isVerified) {
            case 0: return "Verifying Email...";
            case 1: return "Email Verified Successfully!";
            case -1: return "Verification Failed. Please try again.";
            default: return "Verification Failed. Please try again.";
        }
    };

    const getStatusMessageRevert = () => {
        switch (isReverted) {
            case 0: return "Reverting Second Factor Addition...";
            case 1: return "Second Factor Addition Reverted Successfully!";
            case -1: return "Reverting Failed. Please try again.";
            default: return "Reverting Failed. Please try again.";
        }
    };

    return (
        <>
            {searchParams.get("mode") === "resetPassword" && <section className="bg-blue dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form
                            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            action="#"
                            onSubmit={handleUpdatePasswordClicked}
                        >
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    minLength="6"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                    name="retype_password"
                                    id="confirm-password"
                                    onChange={onChange}
                                    autoComplete="off"
                                    minLength="6"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Update password
                            </button>
                        </form>
                    </div>
                </div>
            </section>}

            {searchParams.get("mode") === "verifyEmail" && (
                <section className="bg-blue dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {getStatusMessage()} {/* Dynamically changes */}
                            </h2>
                            {isVerified === 0 ? (
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    Please wait while we verify your email address.
                                </p>
                            ) : isVerified === -1 ? (
                                <p className="mt-4 text-sm text-red-500 dark:text-red-400">
                                    We couldn&apos;t verify your email. Please check the link and try again.
                                </p>
                            ) : (
                                <p className="mt-4 text-sm text-green-500 dark:text-green-400">
                                    Your email has been successfully verified!
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {searchParams.get("mode") === "revertSecondFactorAddition" && (
                <section className="bg-blue dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {getStatusMessageRevert()} {/* Dynamically changes */}
                            </h2>
                            {isVerified === 0 ? (
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    Please wait while we revert the second factor addition.
                                </p>
                            ) : isVerified === -1 ? (
                                <p className="mt-4 text-sm text-red-500 dark:text-red-400">
                                    We couldn&apos;t revert the second factor addition. Please check the link and try again.
                                </p>
                            ) : (
                                <p className="mt-4 text-sm text-green-500 dark:text-green-400">
                                    Second factor addition has been successfully reverted!
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />
        </>
    );
}

export default UpdatePassword;