"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import FloatingNavigationBar from "../components/navbar";
import Script from "next/script";

function PrivacyPolicy() {

  useEffect(() => {
    document.title = "Privacy Policy | Socketlink";
  });

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
        <FloatingNavigationBar />
        <div className="container p-8  dark:text-white mt-20 dark:bg-gray-900">
          <h1 className="mb-8 text-5xl tracking-tight font-extrabold">
            Privacy Policy
          </h1>
          <div>
            <p className="text-xl font-bold mb-8">
              This Privacy Policy describes how Picolon (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;) handles your information
              when you use our WebSocket service. We are committed to protecting
              your privacy and ensuring that your data is safe.
            </p>

            <h2 className="text-lg font-bold mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              When you subscribe to our WebSocket service, we collect your
              billing information, including the payment details processed via
              Razorpay, and the email address you provide during registration.
              We also issue an API key that you can use to connect to our WebSocket servers.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use your information primarily to process your subscription, issue your API key, and provide access to our WebSocket servers. Your billing information is securely processed via Razorpay for payment purposes. We do not share this information with third parties unless necessary to process the payment or as required by law.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">3. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience on our website. This includes the use of Google Analytics to collect information about your usage of the site to help us improve our services. Google Analytics may use cookies to collect data on website usage and report on trends. You can opt out of Google Analytics by installing the browser add-on available at <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300" target="_blank" rel="nofollow noopener noreferrer">
                opt out of Google Analytics
              </a>
              .
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">4. Payment Information and Razorpay</h2>
            <p className="mb-4">
              We use Razorpay as our payment gateway to process subscription payments. Razorpay securely handles all payment transactions, and we do not store any sensitive payment data. Your subscription fees will be charged according to the plan you select, and any payment disputes or refund requests should be directed to Razorpay.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">5. Refund Policy</h2>
            <p className="mb-4">
              In case of a refund request, please contact our support team. Once the refund is approved, it will be processed through Razorpay, and the credited amount may take up to 5-7 business days to reflect in your account.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">6. Data Security</h2>
            <p className="mb-4">
              We employ industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">7. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes to our services, legal obligations, or operational requirements. Any changes will be communicated on our website, and the updated policy will be effective immediately upon posting.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy, please <Link href="/contact-us" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300">
                contact us.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
