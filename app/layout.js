import { Roboto } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Socketlink",
  description: "A fully managed websocket server for real-time applications.",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Ads Tag */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16656132114"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16656132114');
          `}
        </Script>
      </head>
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-SGP3J8PTY5" />
    </html>
  );
}
