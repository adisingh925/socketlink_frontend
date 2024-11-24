"use client";

import React, { useContext, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { usePathname } from "next/navigation";
import axios from "axios";
import Toast from "../components/toast";
import FloatingNavigationBar from "../components/navbar";

function ContactUs() {

    const pathname = usePathname();
    const [query, setQuery] = useState('');

    const sendQuery = async (message) => {
        const url = 'https://api.picolon.com/api/v1/reporting';

        const body = {
            type: 'user-query',
            message: message,
        };

        try {
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSnackbarText('Thankyou! We\'ve received your query.');
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
        e.preventDefault(); // Prevent page reload
        if (query.trim()) {
            sendQuery(query); // Call the function with the user's message
            setQuery(''); // Clear the input field
        }
    };

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

            <div className="flex flex-col h-[100dvh] ">
                <FloatingNavigationBar />
                <div className="isolate h-[100dvh] px-6 py-8 sm:py-8 lg:px-8 dark:text-white mt-20">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="mb-8 text-5xl tracking-tight font-extrabold">
                            Contact Us
                        </h1>
                        <p className="mt-2 text-xl leading-8">
                            Incase you have any queries or suggestions, feel free to reach out to us at {" "} <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@socketlink.io"
                                className="text-blue-600 font-bold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >support@socketlink.io</a>
                        </p>

                        {/* Address Section */}
                        <div className="mt-6 text-lg">
                            {/* <p>Our office is located at:</p> */}
                            <address className="mt-2">
                                Socketlink Inc.<br />
                                Ayappa Society<br />
                                Hitech City, Hyderabad<br />
                                India
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;
