'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';

// Mock data
const generateMockSystemStatus = () => ({
  temperature: (Math.random() * 10 + 20).toFixed(1),
  humidity: (Math.random() * 20 + 60).toFixed(1),
  ph: (Math.random() * 2 + 6).toFixed(1),
  ec: (Math.random() * 500 + 1000).toFixed(0),
  lightIntensity: (Math.random() * 20000 + 10000).toFixed(0),
  waterLevel: (Math.random() * 10 + 20).toFixed(1),
  flowRate: (Math.random() * 2 + 1).toFixed(2),
  pressure: (Math.random() * 50 + 100).toFixed(1),
  dissolvedOxygen: (Math.random() * 2 + 6).toFixed(1),
  lastUpdated: new Date().toLocaleString(),
});

const generateMockSensorData = (numPoints = 20) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push({
      timestamp: new Date(Date.now() - (numPoints - i) * 60000).toLocaleTimeString(),
      temperature: (Math.random() * 10 + 20).toFixed(1),
      ec: (Math.random() * 500 + 1000).toFixed(0),
      lightIntensity: (Math.random() * 20000 + 10000).toFixed(0),
      dissolvedOxygen: (Math.random() * 2 + 6).toFixed(1),
    });
  }
  return data;
};

// Async function to fetch data (simulated with mock data)
async function fetchDashboardData() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    systemStatus: generateMockSystemStatus(),
    sensorData: generateMockSensorData(),
  };
}

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData()
      .then(setDashboardData)
      .catch(err => {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        <Dashboard 
          systemStatus={dashboardData.systemStatus} 
          sensorData={dashboardData.sensorData} 
        />
      </main>
    </div>
  );
}

export default DashboardPage;