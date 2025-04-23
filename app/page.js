"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavigationBar from "./components/navbar";
import Image from "next/image";

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
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-tr from-black via-gray-900 to-gray-950 text-white">
      <NavigationBar />
      <main className="pt-40 pb-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-4">
            Unlock the Power of Real-Time
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Build lightning-fast experiences for chat, video, games, IoT, and more.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-gray-800/70 border-2 dark:border-white/20 rounded-xl p-6 shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 group backdrop-blur"
            >
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-blue-400 group-hover:text-blue-500 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={card.iconPath}
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {card.title}
              </h3>
              <p className="text-gray-400 text-center text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Extended Features Section */}
        <section className="bg-gray-950 text-white py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto rounded-2xl border-2 dark:border-white/20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-4">
              More Than Just Speed
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore the power behind our platform—designed for flexibility, scale, and developer joy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Ultra Low Latency",
                emoji: "⚡",
                desc: "Deliver data at lightning speed with consistent sub-50ms latency.",
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
                className="bg-gray-800/70 border-2 dark:border-white/20 p-8 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Comparison Section */}
        <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto rounded-2xl border-2 dark:border-white/20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-4">
              Socketlink vs Ably vs Pusher
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Here&#39;s the real cost of 10,000 connections sending 1 message/sec (1KB each) — totaling 260 million messages and 1TB per month.
            </p>
          </motion.div>

          <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-[700px] sm:min-w-full align-middle">
              <div className="shadow-2xl overflow-hidden rounded-2xl border border-gray-700">
                <table className="w-full text-sm md:text-base bg-gray-900 table-auto">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200">
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Connections</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Messages</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Data</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Overages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        provider: "Socketlink",
                        cost: "$29/mo",
                        connections: "10,000",
                        messages: "~260M/mo",
                        data: "1 TB",
                        overages: "None",
                        costColor: "text-green-400",
                        overageColor: "text-green-400",
                        badgeData: "Included",
                        badgeOverage: "✔",
                      },
                      {
                        provider: "Ably",
                        cost: "~$2,600/mo",
                        connections: "10,000",
                        messages: "260M ≈ $2,600",
                        data: "1TB ≈ $140",
                        overages: "Msg & Data fees",
                        costColor: "text-red-400",
                        overageColor: "text-red-400",
                        badgeData: "Extra Cost",
                        badgeOverage: "Overage",
                      },
                      {
                        provider: "Pusher",
                        cost: "N/A",
                        connections: "10,000",
                        messages: "25M limit",
                        data: "Over by 235M+",
                        overages: "Not feasible",
                        costColor: "text-red-400",
                        overageColor: "text-red-400",
                        badgeData: "Limited",
                        badgeOverage: "❌",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={row.provider}
                        className={`${idx % 2 === 0 ? "bg-gray-800" : "bg-gray-850"} hover:bg-gray-700 transition duration-200 whitespace-nowrap`}
                      >
                        <td className="px-6 py-4 font-medium text-white">{row.provider}</td>
                        <td className={`px-6 py-4 font-semibold ${row.costColor}`}>{row.cost}</td>
                        <td className="px-6 py-4 text-gray-300">{row.connections}</td>
                        <td className="px-6 py-4 text-gray-300">{row.messages}</td>
                        <td className="px-6 py-4 text-gray-300">
                          {row.data}
                          <span className="ml-2 px-2 py-1 bg-gray-700 text-xs font-semibold rounded-full shadow-sm">
                            {row.badgeData}
                          </span>
                        </td>
                        <td className={`px-6 py-4 ${row.overageColor}`}>
                          {row.overages}
                          <span className="ml-2 px-2 py-1 bg-gray-700 text-xs font-semibold rounded-full shadow-sm">
                            {row.badgeOverage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-lg sm:text-xl font-medium text-white">
              🧠 Choose smart — <span className="text-blue-400 font-bold">Socketlink saves you $2,500+/month</span> at scale.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Built for scale. Priced for startups. Loved by engineers.
            </p>
          </motion.div>
        </section>

        <div className="my-20 border-t border-gray-700 w-full" />

        <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto rounded-2xl mt-10 border-2 dark:border-white/20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-4">
              Real-time Performance Metrics
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Here&#39;s a live snapshot of what matters most — from stable connections to blazing fast latency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: "/images/connected_users.png",
                title: "Total Connections",
              },
              {
                src: "/images/total_messages.png",
                title: "Messages Sent",
              },
              {
                src: "/images/latency.png",
                title: "Latency",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-900 rounded-xl shadow-md overflow-hidden"
              >
                <Image
                  width={500}
                  height={300}
                  src={item.src}
                  alt={item.title}
                  className="w-full object-cover bg-gray-950"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-blue-400">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Metrics Section */}
        <section className="relative py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto bg-gradient-to-br from-gray-950 to-black overflow-hidden rounded-2xl border-2 dark:border-white/20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-4">
              Key Metrics
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover how our service performs. Our focus is on providing top-tier speed, reliability, and scalability to ensure the best user experience.
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Latency",
                value: "5ms",
                desc: "Ultra-low latency for fast and smooth real-time interactions.",
                icon: "M3 3v18h18V3H3z",
                direction: "left",
              },
              {
                title: "Uptime",
                value: "99.99%",
                desc: "Reliable infrastructure with nearly no downtime.",
                icon: "M12 2l9 9-9 9-9-9 9-9z",
                direction: "right",
              },
              {
                title: "Global Reach",
                value: "150+ Countries",
                desc: "Accessible to users across the globe with fast, secure connections.",
                icon: "M12 2l9 9-9 9-9-9 9-9z",
                direction: "left",
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: metric.direction === "left" ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`flex flex-col items-center gap-6 p-8 rounded-xl shadow-lg bg-gray-800/70 border border-gray-700 backdrop-blur transition-all duration-300 group hover:scale-105 max-w-full`}
              >
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-blue-400 group-hover:text-blue-500 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={metric.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">{metric.title}</h3>
                <p className="text-4xl font-bold text-blue-400">{metric.value}</p>
                <p className="text-gray-400 text-sm">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 border-t border-gray-700 w-full" />

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-6">
            Integrate real-time features into your app today.
          </p>
          <a
            href="/docs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            Get Started
          </a>
        </motion.div>
      </main>
    </div>
  );
}
