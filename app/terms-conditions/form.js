"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import FloatingNavigationBar from "../components/navbar";

function TermsAndConditions() {

  useEffect(() => {
    document.title = "Terms & Conditions | Socketlink";
  });

  return (
    <>
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
