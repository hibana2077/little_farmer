'use client';

import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import { Button } from '../components/ui/button';

export default function HomeContent() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated && user ? (
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700">
            Welcome back, {user.username}!
          </p>
          <Link href="/dashboard" passHref>
            <Button className="mt-4">Go to Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700 mb-4">
            {/* Log in to access your personalized hydroponic learning experience. */}
            登入以存取您的個人化水耕栽培學習體驗。
          </p>
          <Link href="/login" passHref>
            <Button>登入</Button>
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <FeatureCard
        //   title="Interactive Learning"
            title="互動學習"
            // description="Engage with our AI-powered assistant and take quizzes to enhance your knowledge."
            description="與我們的AI助手互動並進行測驗以增進您的知識。"
            link="/learning-center"
        />
        <FeatureCard
            // title="Real-time Monitoring"
            title='即時監控'
            // description="Track your hydroponic system's performance with live sensor data."
            description='使用即時感測器數據追踪您的水耕系統的性能。'
            link="/my-system/monitoring"
        />
        <FeatureCard
        //   title="Community Forum"
            title='社群論壇'
        //   description="Connect with fellow students and experts to share experiences and get advice."
            description='與其他學生和專家聯繫，分享經驗並獲得建議。'    
        link="/community"
        />
      </div>
    </>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
}

function FeatureCard({ title, description, link }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={link} passHref>
        <Button variant="outline" className=''>Learn More</Button>
      </Link>
    </div>
  );
}