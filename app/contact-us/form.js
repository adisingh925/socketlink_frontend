"use client";

import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { usePathname } from "next/navigation";
import axios from "axios";
import Toast from "../components/toast";
import FloatingNavigationBar from "../components/navbar";
import { auth } from "../components/firebase";
import { useRouter } from "next/navigation";

function ContactUs() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true); // New loading state
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [severity, setSeverity] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const sendQuery = async (message) => {
        const url = 'http://localhost:9001/api/v1/query';

        const body = {
            query: message,
        };

        try {
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`,
                },
            });

            if (response.status === 200) {
                setSnackbarText('Thankyou! We\'ve received your query, and we\'ll get back to you shortly.');
                setSeverity('success');
                setSnackbarState(true);
            }
        } catch (error) {
            setSnackbarText('Failed to send query!');
            setSeverity('error');
            setSnackbarState(true);
        }
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Get in Touch with Us",
        "description": "We’d love to hear from you! For any questions or support, email us at info@picolon.com, and we'll get back to you promptly.",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://picolon.com/contact-us"
        },
        "about": {
            "@type": "Organization",
            "name": "Picolon",
            "email": "info@picolon.com"
        },
        "headline": "Get in Touch with Us"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            sendQuery(query);
            setQuery('');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100dvh] text-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                {/* title */}
                <title>Get in Touch with Us</title>

                {/* description */}
                <meta
                    name="description"
                    content="We’d love to hear from you! For any questions or support, email us at info@picolon.com, and we'll get back to you promptly."
                />

                {/* keywords */}
                <meta name="keywords" content="talk to strangers,random chat,omegle alternative,chat with strangers,chat rooms,free online chat,no registration,talk to girls,chat with girls,chat with random girls" />

                {/* robots */}
                <meta name="robots" content="index, follow" />

                {/* author */}
                <meta name="author" content="Picolon" />

                {/* og-title */}
                <meta property="og:title" content="Get in Touch with Us" />

                {/* og-description */}
                <meta property="og:description" content="We’d love to hear from you! For any questions or support, email us at info@picolon.com, and we'll get back to you promptly." />

                {/* og-image */}
                <meta property="og:image" content="https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp" />

                {/* og-url */}
                <meta property="og:url" content="https://picolon.com/contact-us" />

                {/* og-type */}
                <meta property="og:type" content="website" />

                {/* twitter-card */}
                <meta name="twitter:card" content="summary_large_image" />

                {/* twitter-title */}
                <meta name="twitter:title" content="Get in Touch with Us" />

                {/* twitter-description */}
                <meta name="twitter:description" content="We’d love to hear from you! For any questions or support, email us at info@picolon.com, and we'll get back to you promptly." />

                {/* twitter-image */}
                <meta name="twitter:image" content="https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp" />

                {/* twitter-url */}
                <meta name="twitter:url" content="https://picolon.com/contact-us" />

                {/* canonical url */}
                <link rel="canonical" href="https://picolon.com/contact-us" />

                {/* apple-touch-icon */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />

                {/* favicon */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />

                {/* favicon */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />

                {/* manifest */}
                <link rel="manifest" href="/site.webmanifest" />

                {/* mask-icon */}
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

                {/* theme-color */}
                <meta name="theme-color" content="#ffffff"></meta>

                {/* handheldfriendly */}
                <meta name="handheldfriendly" content="true" />

                {/* mobileoptimized */}
                <meta name="MobileOptimized" content="320" />

                {/* viewport */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* mobile-web-app-capable */}
                <meta name="mobile-web-app-capable" content="yes" />

                {/* apple-mobile-web-app-capable */}
                <meta name="apple-mobile-web-app-capable" content="yes" />

                {/* application-name */}
                <meta name="application-name" content="Picolon" />

                {/* apple-mobile-web-app-title */}
                <meta name="apple-mobile-web-app-title" content="Get in Touch with Us" />

                {/* apple-mobile-web-app-status-bar-style */}
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

                {/* msapplication-starturl */}
                <meta name="msapplication-starturl" content="https://picolon.com/contact-us" />

                {/* msapplication-TileColor */}
                <meta name="msapplication-TileColor" content="#ffc40d" />

                {/* msapplication-TileImage */}
                <meta name="msapplication-TileImage" content="https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp" />

                {/* sitemap */}
                <link rel="sitemap" type="application/xml" href="https://picolon.com/sitemap.xml" />
            </Head>

            <Script
                type="application/ld+json"
                id="structured-data"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <Script src="https://www.googletagmanager.com/gtag/js?id=G-2PCLJ13WYM" strategy="worker" />
            <Script id="google-analytics" strategy="worker">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-2PCLJ13WYM');
        `}
            </Script>

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
                                className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700 dark:hover:text-blue-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                support@socketlink.io
                            </a>
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-white"
                                rows="4"
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
