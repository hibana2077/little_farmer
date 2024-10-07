import { Suspense } from 'react';
import Dashboard from '@/components/Dashboard';

// Mock data
const mockSystemStatus = {
  temperature: 25.5,
  humidity: 60,
  ph: 6.5,
  nutrientLevel: 80,
  lastUpdated: new Date().toLocaleString(),
};

const mockGrowthData = [
  { day: 1, height: 5 },
  { day: 2, height: 7 },
  { day: 3, height: 10 },
  { day: 4, height: 14 },
  { day: 5, height: 18 },
];

// Async function to fetch data (simulated with mock data)
async function fetchDashboardData() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    systemStatus: mockSystemStatus,
    growthData: mockGrowthData,
  };
}

async function DashboardPage() {
  const { systemStatus, growthData } = await fetchDashboardData();

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    //   <Dashboard systemStatus={systemStatus} growthData={growthData} />
    // </Suspense>
    <h1>Dashboard</h1>
  );
}

export default DashboardPage;