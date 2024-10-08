'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

export default function HomeContent() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = localStorage.getItem('user') ? localStorage.getItem('user')?.slice(1, -1) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isAuthenticated && user ? (
          <div className="text-center mb-8 bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <p className="text-xl text-gray-700">
              Welcome back, {user}!
            </p>
            <Link href="/dashboard" passHref>
              <Button className="mt-4">Go to Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="text-center mb-8 bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <p className="text-xl text-gray-700 mb-4">
              登入以存取您的個人化水耕栽培學習體驗。
            </p>
            <Link href="/login" passHref>
              <Button>登入</Button>
            </Link>
          </div>
        )}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FeatureCard
          title="互動學習"
          description="與我們的AI助手互動並進行測驗以增進您的知識。"
          link="/learning-center"
          bgColor="bg-blue-100"
          iconColor="text-blue-500"
          icon="🤖"
        />
        <FeatureCard
          title="即時監控"
          description="使用即時感測器數據追踪您的水耕系統的性能。"
          link="/my-system/monitoring"
          bgColor="bg-green-100"
          iconColor="text-green-500"
          icon="📊"
        />
        <FeatureCard
          title="社群論壇"
          description="與其他學生和專家聯繫，分享經驗並獲得建議。"
          link="/community"
          bgColor="bg-purple-100"
          iconColor="text-purple-500"
          icon="💬"
        />
      </motion.div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  bgColor: string;
  iconColor: string;
  icon: string;
}

function FeatureCard({ title, description, link, bgColor, iconColor, icon }: FeatureCardProps) {
  return (
    <motion.div
      className={`${bgColor} bg-opacity-70 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div>
        <motion.div
          className={`${iconColor} text-4xl mb-4`}
        >
          {icon}
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <Link href={link} passHref>
        <Button variant="outline" className="w-full mt-4">了解更多</Button>
      </Link>
    </motion.div>
  );
}