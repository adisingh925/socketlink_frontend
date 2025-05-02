"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavigationBar from "./components/navbar";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import moment from "moment/moment";

const generateIncreasingData = (start, count, min, max) => {
  const data = [];
  let current = moment(start);
  let value = min;

  const step = Math.floor((max - min) / count);

  for (let i = 0; i < count; i++) {
    value += Math.floor(Math.random() * step);
    if (value > max) value = max;
    data.push({
      time: current.format("HH:mm:ss"),
      value,
    });
    current = current.add(1, "minutes");
  }

  return data;
};

const generateRandomData = (start, count, min, max) => {
  const data = [];
  let current = moment(start);

  for (let i = 0; i < count; i++) {
    data.push({
      time: current.format("HH:mm:ss"),
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
    current = current.add(1, "minutes");
  }

  return data;
};

const connectedUsersData = generateIncreasingData(moment().subtract(3, "minutes"), 3, 2000, 9000);
const messagesSentData = generateIncreasingData(moment().subtract(3, "minutes"), 3, 2_000_000, 8_000_000);
const latencyData = generateRandomData(moment().subtract(3, "minutes"), 3, 5, 14);


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Home | Socketlink";
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100dvh] bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
      </div>
    );
  }

  const cards = [
    {
      title: "Real-time Chat",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
      desc: "Build powerful chat applications with minimal setup.",
    },
    {
      title: "Secure Connections",
      iconPath: "M9 17v-5a2 2 0 112 0v5m3-5v10m-3-5a2 2 0 11-4 0m7-4v-2a4 4 0 10-8 0v2a4 4 0 008 0z",
      desc: "Experience top-notch security for your data and users.",
    },
    {
      title: "Live Streaming",
      iconPath: "M6 3v12m6-12v12m6-8v8m-6-4h-6",
      desc: "Stream video and audio in real-time to large audiences.",
    },
    {
      title: "Collaborative Editing",
      iconPath: "M3 10h11M9 21V9m0 0l-5 5m5-5l5 5",
      desc: "Edit documents in real-time with multiple participants.",
    },
    {
      title: "Gaming",
      iconPath: "M6 18l6-6m0 0l6-6m-6 6l6 6m-6-6H6",
      desc: "Enable fast-paced multiplayer gaming experiences.",
    },
    {
      title: "Stock Market Feeds",
      iconPath: "M6 6l12 12",
      desc: "Stream stock market updates instantly to your users.",
    },
    {
      title: "IoT Device Monitoring",
      iconPath: "M3 3h18v18H3V3z",
      desc: "Monitor and control IoT devices with live data streams.",
    },
    {
      title: "Online Auctions",
      iconPath: "M5 13l4 4L19 7",
      desc: "Provide real-time bidding experiences for auction platforms.",
    },
    {
      title: "Customer Support Systems",
      iconPath: "M18 8a6 6 0 00-12 0v5a6 6 0 0012 0V8z",
      desc: "Deliver instant customer service via live chat support.",
    },
    {
      title: "Real-time Analytics Dashboards",
      iconPath: "M3 3h18v18H3V3z",
      desc: "Display live metrics and insights without refreshing the page.",
    },
    {
      title: "Sports Score Updates",
      iconPath: "M5 3l14 9-14 9V3z",
      desc: "Broadcast sports scores and events in real-time.",
    },
    {
      title: "Social Media Notifications",
      iconPath: "M15 17h5l-1.405-1.405M19 13v-1a6 6 0 00-6-6",
      desc: "Push instant notifications for social media interactions.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 100ms delay between child animations
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3, // Make the animation quick but smooth
      },
    },
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-tr from-black via-gray-900 to-gray-950 text-white">
      <NavigationBar />
      <main className="pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6"
        >
          {/* Text Animation for heading and paragraph */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-poppins font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4 sm:mb-6 leading-tight">
              Unlock the Power<br />
              of Real Time
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl">
              Build lightning-fast experiences for chat, video, games, IoT, and more.
            </p>
          </motion.div>

          {/* Cards section with individual animations */}
          <motion.div
            variants={containerVariants} // This controls the overall container's animation
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={cardVariants} // Individual card animation
                className="text-[8px] sm:text-[10px] md:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white/10 text-gray-300 
      hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 
      transition-colors duration-150 backdrop-blur-md shadow-md"
              >
                {card.title}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="mb-20 border-t border-gray-700 w-full" />

        {/* Extended Features Section */}
        <section className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto rounded-3xl border border-white/10 shadow-2xl backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              More Than Just Speed
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
              Explore the power behind our platform—designed for flexibility, scale, and developer joy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                title: "Ultra Low Latency",
                emoji: "⚡",
                desc: "Deliver data at lightning speed with consistent ~15ms latency.",
              },
              {
                title: "Built for Developers",
                emoji: "👩‍💻",
                desc: "Simple APIs, powerful SDKs, and great docs to help you ship faster.",
              },
              {
                title: "Scalable Architecture",
                emoji: "🌍",
                desc: "Whether 10 users or 10 million—Socketlink handles it with ease.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-md hover:shadow-blue-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl shadow-md">
                  {item.emoji}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Comparison Section */}
        <section className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto rounded-3xl border border-white/10 shadow-2xl backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Socketlink vs Ably vs Pusher
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              A cost comparison for <span className="text-white font-medium">10,000 connections</span> sending 1 message/sec (1KB each) — that’s 260M messages and 1TB/month.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-8">
            {/* Socketlink Card */}
            <div className="bg-gray-950/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Socketlink</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Ideal for high-scale projects with a predictable cost structure and no surprise overages.
              </p>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Cost</span>
                  <span className="text-green-400 font-bold">$29/mo</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Connections</span>
                  <span className="text-white font-medium">10,000</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Messages</span>
                  <span className="text-white font-medium">~260M/mo</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Data</span>
                  <span className="text-white font-medium">1 TB</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Overage</span>
                  <span className="text-green-400">None</span>
                </li>
              </ul>
              <p className="mt-6 text-xs sm:text-sm text-gray-500">
                Built for high reliability and cost-effectiveness. Great for startups looking to scale.
              </p>
            </div>

            {/* Ably Card */}
            <div className="bg-gray-950/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Ably</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Flexible pricing but higher costs due to message and data overages. Best for smaller-scale needs.
              </p>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Cost</span>
                  <span className="text-red-400 font-bold">~$2,600/mo</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Connections</span>
                  <span className="text-white font-medium">10,000</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Messages</span>
                  <span className="text-white font-medium">260M ≈ $2,600</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Data</span>
                  <span className="text-white font-medium">1TB ≈ $140</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Overage</span>
                  <span className="text-red-400">Msg & Data fees</span>
                </li>
              </ul>
              <p className="mt-6 text-xs sm:text-sm text-gray-500">
                While flexible, be cautious of the cost escalation with higher usage.
              </p>
            </div>

            {/* Pusher Card */}
            <div className="bg-gray-950/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pusher</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                A limited option due to message cap, not ideal for large-scale messaging.
              </p>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Cost</span>
                  <span className="text-red-400 font-bold">N/A</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Connections</span>
                  <span className="text-white font-medium">10,000</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Messages</span>
                  <span className="text-white font-medium">25M limit</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Data</span>
                  <span className="text-red-400 font-medium">Over by 235M+</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-300">Overage</span>
                  <span className="text-red-400">Not feasible</span>
                </li>
              </ul>
              <p className="mt-6 text-xs sm:text-sm text-gray-500">
                Pusher is limited in scalability and not recommended for high-volume use cases.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-lg sm:text-xl font-semibold text-white">
              🚀 Choose smart —{" "}
              <span className="text-blue-400 font-bold">
                Socketlink saves you $2,500+/month
              </span>{" "}
              at scale.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Built for scale. Priced for startups. Loved by engineers.
            </p>
          </motion.div>
        </section>

        <div className="my-20 border-t border-gray-700 w-full" />

        <section className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto rounded-3xl border border-white/10 shadow-2xl backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Real-time Performance Metrics
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
              Here&rsquo;s a live snapshot of what matters most — from stable connections to blazing fast latency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {/* Connected Users */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-md hover:shadow-blue-500/30 transition-all duration-300"
            >
              <MetricsChart
                title="Connected Users"
                data={connectedUsersData}
                color="#3b82f6"
              />
              <div className="p-4 text-center">
                <p className="text-sm sm:text-base text-gray-300 leading-tight">
                  Track the number of connected users in real-time.
                </p>
              </div>
            </motion.div>

            {/* Messages Sent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-md hover:shadow-green-500/30 transition-all duration-300"
            >
              <MetricsChart
                title="Messages Sent"
                data={messagesSentData}
                color="#10b981"
              />
              <div className="p-4 text-center">
                <p className="text-sm sm:text-base text-gray-300 leading-tight">
                  Real-time data of the number of messages sent across the platform.
                </p>
              </div>
            </motion.div>

            {/* Latency */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-md hover:shadow-amber-500/30 transition-all duration-300"
            >
              <MetricsChart
                title="Latency"
                data={latencyData}
                color="#f59e0b"
              />
              <div className="p-4 text-center">
                <p className="text-sm sm:text-base text-gray-300 leading-tight">
                  Monitor and track latency to ensure a smooth user experience.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom text added back */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-lg sm:text-xl font-semibold text-white">
              🚀 Real-time insights help you scale —{" "}
              <span className="text-blue-400 font-bold">Stay ahead of the curve.</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Keeping track of performance metrics to ensure smooth user experience.
            </p>
          </motion.div>
        </section>


        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Metrics Section */}
        <section className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto rounded-3xl border border-white/10 shadow-2xl backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Key Metrics
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
              Experience enterprise-level performance. Built for speed, reliability, and scalability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                title: "Latency",
                value: "~15ms",
                desc: "Ultra-low latency ensures real-time experiences.",
                emoji: "⚡",
              },
              {
                title: "Uptime",
                value: "99.99%",
                desc: "Always-on infrastructure with near-perfect availability.",
                emoji: "⏱️",
              },
              {
                title: "Global Reach",
                value: "150+ Countries",
                desc: "Optimized connectivity across global edge networks.",
                emoji: "🌍",
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-md hover:shadow-blue-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-md">
                  {metric.emoji}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{metric.title}</h3>
                <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center mb-2">
                  {metric.value}
                </p>
                <p className="text-gray-400 text-sm sm:text-base text-center leading-relaxed">{metric.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-lg sm:text-xl font-semibold text-white">
              🚀 Experience unparalleled performance with{" "}
              <span className="text-blue-400 font-bold">real-time insights</span> across global networks.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Built for scale. Priced for startups. Loved by engineers.
            </p>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto rounded-3xl border border-white/10 shadow-2xl backdrop-blur-lg flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mb-6">
              Integrate real-time features into your app today.
            </p>
            <a
              href="/docs"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span className="transition-transform duration-200">Get Started</span>
            </a>
          </div>
        </motion.div>

      </main>
    </div>
  );
}

function MetricsChart({ title, data, color }) {
  const [hovered, setHovered] = useState(false);
  const interval = Math.ceil(data.length / 10);

  return (
    <div className="dark:bg-gray-800 bg-gray-200 rounded-2xl p-3 border-2 dark:border-white/20 border-gray-500/20">
      <h2 className="text-md text-center dark:text-white text-gray-900 mb-3 font-semibold tracking-wide">
        {title}
      </h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[250px] dark:text-gray-400 text-gray-900 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="time"
              interval={interval}
              tick={{ fill: '#ccc', fontSize: 12 }}
              dy={6}
              tickFormatter={(t) =>
                moment(t, "HH:mm:ss").format('HH:mm')
              }
            />
            <YAxis
              tick={{ fill: '#ccc', fontSize: 12 }}
              tickFormatter={(v) =>
                v >= 1_000_000
                  ? `${(v / 1_000_000).toFixed(1)}M`
                  : v >= 1_000
                    ? `${(v / 1_000).toFixed(1)}K`
                    : v
              }
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f1f1f', borderColor: '#444' }}
              labelStyle={{ color: '#eee' }}
              itemStyle={{ color: '#fff', fontSize: 12 }}
              formatter={(v) => new Intl.NumberFormat().format(v)}
            />
            <Legend
              verticalAlign="top"
              height={24}
              wrapperStyle={{ color: '#bbb', fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={hovered ? { stroke: color, strokeWidth: 2, r: 4 } : false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
