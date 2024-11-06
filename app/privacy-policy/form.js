"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import { usePathname } from "next/navigation";

function PrivacyPolicy() {

  const pathname = usePathname();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Commitment to Your Privacy",
    "url": "https://picolon.com/privacy-policy",
    "description": "Learn how Picolon protects your privacy and manages your data with our detailed privacy practices. Your security is our priority.",
    "datePublished": "2024-07-21",
    "publisher": {
      "@type": "Organization",
      "name": "picolon",
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
        <title>Our Commitment to Your Privacy</title>

        {/* description */}
        <meta
          name="description"
          content="Learn how Picolon protects your privacy and manages your data with our detailed privacy practices. Your security is our priority."
        />

        {/* keywords */}
        <meta name="keywords" content="privacy policy, data protection, user privacy, data security, personal information, privacy practices, WebSockets, API key, subscription service, Razorpay, payment transactions, refund policy" />

        {/* robots */}
        <meta name="robots" content="index, follow" />

        {/* author */}
        <meta name="author" content="Picolon" />

        {/* og-title */}
        <meta property="og:title" content="Our Commitment to Your Privacy" />

        {/* og-description */}
        <meta property="og:description" content="Learn how Picolon protects your privacy and manages your data with our detailed privacy practices. Your security is our priority." />

        {/* og-image */}
        <meta property="og:image" content="https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp" />

        {/* og-url */}
        <meta property="og:url" content="https://picolon.com/privacy-policy" />

        {/* og-type */}
        <meta property="og:type" content="website" />

        {/* twitter-card */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* twitter-title */}
        <meta name="twitter:title" content="Our Commitment to Your Privacy" />

        {/* twitter-description */}
        <meta name="twitter:description" content="Learn how Picolon protects your privacy and manages your data with our detailed privacy practices. Your security is our priority." />

        {/* twitter-image */}
        <meta name="twitter:image" content="https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp" />

        {/* twitter-url */}
        <meta name="twitter:url" content="https://picolon.com/privacy-policy" />

        {/* canonical url */}
        <link rel="canonical" href="https://picolon.com/privacy-policy" />

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
        <meta name="apple-mobile-web-app-title" content="Our Commitment to Your Privacy" />

        {/* apple-mobile-web-app-status-bar-style */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* msapplication-starturl */}
        <meta name="msapplication-starturl" content="https://picolon.com/privacy-policy" />

        {/* msapplication-TileColor */}
        <meta name="msapplication-TileColor" content="#ffc40d" />

        {/* msapplication-TileImage */}
        <meta name="msapplication-TileImage" content="https://picolon-bucket.s3.ap-south-1.amazonaws.com/picolon-full-image.webp" />

        {/* sitemap */}
        <link rel="sitemap" type="application/xml" href="https://picolon.com/sitemap.xml" />
      </Head>

      {/**
       * Structured Data
       */}
      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/**
       * Google Analytics
       */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2PCLJ13WYM" strategy="worker" />
      <Script id="google-analytics" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-2PCLJ13WYM');
        `}
      </Script>

      <div className="container p-8 bg-gray-900 dark:text-white">
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
            We use cookies and similar technologies to enhance your experience on our website. This includes the use of Google Analytics to collect information about your usage of the site to help us improve our services. Google Analytics may use cookies to collect data on website usage and report on trends. You can opt out of Google Analytics by installing the browser add-on available at <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 font-bold" target="_blank" rel="nofollow noopener noreferrer">
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
            If you have any questions or concerns about this Privacy Policy, please contact us at <Link href="mailto:info@picolon.com" className="text-blue-600 font-bold">info@picolon.com</Link>.
          </p>

        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
