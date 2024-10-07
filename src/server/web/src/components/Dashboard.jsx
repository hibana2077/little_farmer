import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera } from 'lucide-react';

const Dashboard = ({ systemStatus, growthData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hydroponic System Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{systemStatus.temperature}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{systemStatus.humidity}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>pH Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{systemStatus.ph}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nutrient Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{systemStatus.nutrientLevel}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Plant Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="height" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Camera Feed</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px] bg-gray-100">
            <Camera size={48} />
            <p className="ml-2">Camera feed placeholder</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="mt-8">
        <AlertTitle>System Status</AlertTitle>
        <AlertDescription>Last updated: {systemStatus.lastUpdated}</AlertDescription>
      </Alert>
    </div>
  );
};

export default Dashboard;