"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import { usePathname } from "next/navigation";
import FloatingNavigationBar from "../components/navbar";

function TermsAndConditions() {

  const pathname = usePathname();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions",
    "url": "https://picolon.com/terms-conditions",
    "description": "Review our terms and conditions to fully understand the rules and guidelines for using our WebSocket API service effectively and securely.",
    "datePublished": "2024-07-21",
    "publisher": {
      "@type": "Organization",
      "name": "Picolon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp"
      },
      "url": "https://picolon.com"
    }
  };

  return (
    <>
      <Head>
        {/* title */}
        <title>Terms and Conditions</title>

        {/* description */}
        <meta
          name="description"
          content="Review our terms and conditions to fully understand the rules and guidelines for using our WebSocket API service effectively and securely."
        />

        {/* keywords */}
        <meta name="keywords" content="terms and conditions, websocket API, service terms, usage guidelines, API terms, user agreement, subscription service" />

        {/* other meta tags */}
        {/* ... other meta tags as per your original code ... */}
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
        <div className="container mx-auto p-8 dark:text-white mt-20 dark:bg-gray-900">
          <h1 className="mb-8 text-5xl tracking-tight font-extrabold">
            Terms and Conditions
          </h1>
          <div>
            <p className="text-xl mb-8 font-bold">
              Welcome to Socketlink! Please review these Terms and Conditions carefully before using our WebSocket API service.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By purchasing a plan or using our WebSocket API, you agree to comply with and be bound by these Terms and Conditions.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">2. User Data and Privacy</h2>
            <p>
              We collect limited personal data (such as email) for account management and support purposes. For more details on how we handle data, please refer to our Privacy Policy.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              3. API Key Usage and Security
            </h2>
            <p>
              Upon purchasing a plan, you will receive an API key. You are responsible for keeping this key secure and confidential. Unauthorized use of your API key may result in termination of your access.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">4. Intellectual Property</h2>
            <p>
              All content, trademarks, and branding related to the Picolon service are the property of Picolon and are protected by intellectual property laws. You may not use or distribute our intellectual property without permission.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">5. Prohibited Uses</h2>
            <p>
              You agree not to use our WebSocket API service for any unlawful or abusive purposes, including but not limited to spamming, unauthorized data scraping, or any other activities that violate applicable laws or regulations.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              Socketlink shall not be liable for any indirect, incidental, or consequential damages arising from your use or inability to use our WebSocket service.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              7. Modifications to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms and Conditions at any time. Continued use of our service after changes are posted constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">8. Contact Us</h2>
            <p>
              For any questions or concerns regarding these Terms and Conditions, please{" "}
              <Link href="/contact-us" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300">
                contact us.
              </Link>
            </p>

            <p className="mt-10">Last Updated: 06/11/2024</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
