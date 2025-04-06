"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../components/firebase"; // Adjust the path as necessary
import { sendEmailVerification, multiFactor, TotpMultiFactorGenerator, TotpSecret, getMultiFactorResolver, reauthenticateWithCredential, reauthenticateWithPopup, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"; // For changing email and sending email verification
import Toast from "../components/toast";
import NavigationBar from "../components/navbar";
import { useRouter } from "next/navigation";
import TotpDialog from "../components/totpdialog";
import Script from "next/script";

function Profile() {
    const router = useRouter();

    const [email, setEmail] = useState(""); // Fetch current user's email
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const [is2FAEnabled, setIs2FAEnabled] = useState(false); // Two-Factor Authentication state
    const [istotpDialogOpen, setIsTotpDialogopen] = useState(false); // Dialog state
    const [totpSecret, setTotpSecret] = useState(""); // TOTP
    const [totpUri, setTotpUri] = useState(""); // TOTP URI
    const [code, setCode] = useState(""); // TOTP Code
    const [fullTotpSecret, setFullTotpSecret] = useState(null); // Full TOTP Secret

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login"); // Redirect to login if not authenticated
            } else {
                setEmail(user.email);
                setIsEmailVerified(user.emailVerified);
                check2FAStatus(user);
                setLoading(false); // User is authenticated, set loading to false
            }
        });
    }, [router]);

    useEffect(() => {
        document.title = "Profile | Socketlink";
    });

    const handleSendVerificationEmail = async () => {
        if (!auth.currentUser.emailVerified) {
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
        } else {
            setSeverity("info");
            setSnackbarText("Email is already verified!");
            setSnackbarState(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Finalize the enrollment.
        const multiFactorAssertion = TotpMultiFactorGenerator.assertionForEnrollment(
            fullTotpSecret,
            code
        );

        multiFactor(auth.currentUser).enroll(multiFactorAssertion, "socketlink.io").then(() => {
            setSeverity("success");
            setSnackbarText("2FA enabled successfully!");
            setSnackbarState(true);
            setIs2FAEnabled(true);
        }).catch((error) => {
            setSeverity("error");
            setSnackbarText(error.message);
            setSnackbarState(true);
        }).finally(() => {
            setCode("");
            setIsTotpDialogopen(false);
        });
    };

    const handleDisable2FA = async () => {
        const multiFactorUser = multiFactor(auth.currentUser);

        // This will return the enrolled factors for the user
        const enrolledFactors = multiFactorUser.enrolledFactors;

        if (enrolledFactors.length > 0) {
            // Disable 2FA
            multiFactorUser.unenroll(enrolledFactors[0]).then(() => {
                setSeverity("success");
                setSnackbarText("Two-Factor Authentication disabled successfully!");
                setSnackbarState(true);
                setIs2FAEnabled(false);
            }).catch((error) => {
                setSeverity("error");
                setSnackbarText(error.message);
                setSnackbarState(true);
            });
        } else {
            setSeverity("info");
            setSnackbarText("Two-Factor Authentication is not enabled!");
            setSnackbarState(true);
        }
    }

    const handleEnable2FA = async () => {
        try {
            // Determine which provider the user signed in with
            const randomIndex = Math.floor(Math.random() * auth.currentUser.providerData.length);
            const randomProvider = auth.currentUser.providerData[randomIndex].providerId;

            console.log("Using Provider : ", randomProvider);

            // Step 2: Get the multi-factor session after reauthentication
            multiFactor(auth.currentUser).getSession().then((session) => {
                // Step 3: Generate the TOTP secret for two-factor authentication
                TotpMultiFactorGenerator.generateSecret(session).then((secret) => {
                    console.log("TOTP Secret : ", secret.secretKey);
                    setFullTotpSecret(secret);
                    setTotpSecret(secret.secretKey);
                    const totpUri = secret.generateQrCodeUrl(
                        auth.currentUser.email,
                        "socketlink.io"
                    );

                    console.log("TOTP URI : ", totpUri);

                    setTotpUri(totpUri);
                    setIsTotpDialogopen(true);
                }).catch((error) => {
                    if (error.code === "auth/requires-recent-login") {
                        // Step 1: Reauthenticate based on the current provider
                        console.log("Reauthentication required.");
                        if (randomProvider === 'google.com') {
                            // Reauthenticate with Google
                            const provider = new GoogleAuthProvider();
                            reauthenticateWithPopup(auth.currentUser, provider).then(() => {
                                console.log("Reauthenticated with Google.");
                                handleEnable2FA(); // Retry enabling 2FA
                            }).catch((error) => {
                                console.error("Error reauthenticating with Google : ", error.message);
                            });
                        } else if (randomProvider === 'password') {
                            // Reauthenticate with email and password
                            const password = prompt("Please enter your password to continue : "); // Prompt user for password
                            const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
                            reauthenticateWithCredential(auth.currentUser, credential).then(() => {
                                console.log("Reauthenticated with Email and Password.");
                                handleEnable2FA(); // Retry enabling 2FA
                            }).catch((error) => {
                                console.error("Error reauthenticating with Email and Password : ", error.message);
                            });
                        } else {
                            console.error("Unsupported authentication provider : ", randomProvider);
                            return;
                        }
                    } else {
                        console.error("Error generating TOTP secret : ", error.code);
                        setSeverity("error");
                        setSnackbarText(error.message);
                        setSnackbarState(true);
                    }
                });
            }).catch((error) => {
                console.error("Error getting multi-factor session : ", error.message);
            });
        } catch (error) {
            console.error("Error during reauthentication or 2FA setup : ", error.message);
        }
    };

    const check2FAStatus = async (user) => {
        const multiFactorUser = multiFactor(user);

        // This will return the enrolled factors for the user
        const enrolledFactors = multiFactorUser.enrolledFactors;

        if (enrolledFactors.length > 0) {
            console.log("2FA is enabled for this user.");
            setIs2FAEnabled(true); // Update state to reflect 2FA is enabled
        } else {
            console.log("2FA is not enabled.");
            setIs2FAEnabled(false); // Update state to reflect 2FA is disabled
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

            <div className="flex flex-col h-[100dvh] dark:bg-gray-900">
                <NavigationBar />
                <div className="flex flex-col items-center justify-center flex-grow px-6 py-8 lg:py-0">
                    <div className="bg-white rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 w-full max-w-md border-2 border-white/20">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Profile Settings
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className="flex items-center">
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
                                        className="ml-2 h-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                                        disabled={isEmailVerified}
                                    >
                                        {isEmailVerified ? "Verified" : "Verify"}
                                    </button>
                                </div>
                            </form>

                            {/* Two-Factor Authentication Section */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h2>
                                {is2FAEnabled ? (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleDisable2FA}
                                            className="w-full text-white bg-red-600 hover:bg-red-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-red-600 dark:hover:bg-red-700"
                                        >
                                            Disable Two-Factor Authentication
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleEnable2FA}
                                            className="w-full text-white bg-green-600 hover:bg-green-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-green-600 dark:hover:bg-green-700"
                                        >
                                            Enable Two-Factor Authentication
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast message={snackbarText} severity={severity} setSnackbarState={setSnackbarState} snackbarState={snackbarState} />

            <TotpDialog isOpen={istotpDialogOpen} onClose={() => setIsTotpDialogopen(false)} secret={totpSecret} totpUri={totpUri} handleSubmit={handleSubmit} code={code} setCode={setCode} />
        </>
    );
}

export default Profile;
