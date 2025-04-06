import { Roboto } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

// Import Roboto using next/font
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
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-SGP3J8PTY5" />
    </html>
  );
}
