'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sun, 
  Droplet, 
  Sprout, 
  Thermometer, 
  Wind, 
  Activity, 
  AlertCircle,
  Info
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function MyFarm() {
  const [nutrientLevel, setNutrientLevel] = useState(50);
  const [phLevel, setPhLevel] = useState(6.5);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [lightSchedule, setLightSchedule] = useState({ on: 6, off: 18 });
  const [lightOn, setLightOn] = useState(false);
  const [crops, setCrops] = useState([
    { id: 1, name: "Lettuce", status: "Growing", daysToHarvest: 15 },
    { id: 2, name: "Tomatoes", status: "Flowering", daysToHarvest: 30 },
    { id: 3, name: "Basil", status: "Ready to harvest", daysToHarvest: 0 },
  ]);
  const [realtimeData, setRealtimeData] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    fetchFarmData();
  }, []);

  const fetchFarmData = async () => {
    console.log('Fetching farm data...');
  };

  const updateFarmSettings = async (settingType, value) => {
    console.log(`Updating ${settingType} with value:`, value);
  };

  const handleSubmit = () => {
    console.log('Submitting all changes...');
    // Here you would typically make an API call to save all changes at once
  };

  const handleChange = (setter) => (value) => {
    setter(value);
    // You might want to remove individual updateFarmSettings calls here
    // and just call it once in handleSubmit
  };

  useEffect(() => {
    fetchFarmData();
    fetchRealtimeData();
    fetchActivityLog();
  }, []);

  const fetchRealtimeData = () => {
    // 模拟实时数据
    const newData = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.random() * 10 + 20,
      humidity: Math.random() * 20 + 50,
      nutrientLevel: Math.random() * 20 + 40,
    }));
    setRealtimeData(newData);
  };

  const fetchActivityLog = () => {
    // 模拟活动日志
    const activities = [
      { id: 1, type: 'alert', message: 'Low nutrient level detected', timestamp: '2023-05-15 10:30' },
      { id: 2, type: 'info', message: 'Lighting schedule updated', timestamp: '2023-05-15 09:15' },
      { id: 3, type: 'success', message: 'Harvested 2kg of tomatoes', timestamp: '2023-05-14 16:45' },
      { id: 4, type: 'info', message: 'System maintenance completed', timestamp: '2023-05-14 08:00' },
    ];
    setActivityLog(activities);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 py-8"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-3xl font-bold text-green-800 mb-8 text-center"
        >
          My Hydroponic Farm
        </motion.h1>
        
        <Tabs defaultValue="nutrients" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="nutrients">Nutrient Solution</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
            <TabsTrigger value="crops">Crop Management</TabsTrigger>
          </TabsList>

          <TabsContent value="nutrients">
            <Card>
              <CardHeader>
                <CardTitle>Nutrient Solution Control</CardTitle>
              </CardHeader>
              <CardContent>
                <ControlSlider
                  icon={<Droplet className="text-blue-500" />}
                  label="Nutrient Concentration"
                  value={nutrientLevel}
                  onChange={handleChange(setNutrientLevel)}
                  max={100}
                  unit="%"
                />
                <ControlSlider
                  icon={<Droplet className="text-purple-500" />}
                  label="pH Level"
                  value={phLevel}
                  onChange={handleChange(setPhLevel)}
                  min={0}
                  max={14}
                  step={0.1}
                  unit=""
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environment">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Control</CardTitle>
              </CardHeader>
              <CardContent>
                <ControlSlider
                  icon={<Thermometer className="text-red-500" />}
                  label="Temperature"
                  value={temperature}
                  onChange={handleChange(setTemperature)}
                  min={10}
                  max={40}
                  unit="°C"
                />
                <ControlSlider
                  icon={<Wind className="text-blue-300" />}
                  label="Humidity"
                  value={humidity}
                  onChange={handleChange(setHumidity)}
                  max={100}
                  unit="%"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lighting">
            <Card>
              <CardHeader>
                <CardTitle>Lighting Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span>Light Status:</span>
                  <Switch
                    checked={lightOn}
                    onCheckedChange={handleChange(setLightOn)}
                  />
                </div>
                <div className="space-y-4">
                  <TimeInput
                    icon={<Sun className="text-yellow-500" />}
                    label="On at"
                    value={lightSchedule.on}
                    onChange={(value) => handleChange(setLightSchedule)({ ...lightSchedule, on: value })}
                  />
                  <TimeInput
                    icon={<Sun className="text-gray-400" />}
                    label="Off at"
                    value={lightSchedule.off}
                    onChange={(value) => handleChange(setLightSchedule)({ ...lightSchedule, off: value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crops">
            <Card>
              <CardHeader>
                <CardTitle>Crop Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crops.map((crop) => (
                    <motion.div 
                      key={crop.id} 
                      className="flex items-center justify-between p-2 bg-white rounded shadow"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Sprout className="text-green-500" />
                        <span>{crop.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {crop.status} 
                        {crop.daysToHarvest > 0 && ` - ${crop.daysToHarvest} days to harvest`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button onClick={handleSubmit} size="lg">
            Submit All Changes
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" />
                Realtime Farm Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={realtimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                  <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
                  <Line type="monotone" dataKey="nutrientLevel" stroke="#ffc658" name="Nutrient Level (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2" />
                Recent Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {activityLog.map((activity) => (
                  <li key={activity.id} className="flex items-start space-x-2 p-2 bg-white rounded shadow">
                    <ActivityIcon type={activity.type} />
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

const ControlSlider = ({ icon, label, value, onChange, min = 0, max, step = 1, unit }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-4 mb-2">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex-grow">
        <Slider
          value={[value]}
          onValueChange={(newValue) => onChange(newValue[0])}
          min={min}
          max={max}
          step={step}
        />
      </div>
      <span className="text-sm font-medium w-16 text-right">{value}{unit}</span>
    </div>
  </div>
);

const TimeInput = ({ icon, label, value, onChange }) => (
  <div className="flex items-center space-x-4">
    {icon}
    <span>{label}:</span>
    <input
      type="time"
      value={`${value.toString().padStart(2, '0')}:00`}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="border rounded p-1"
    />
  </div>
);

const ActivityIcon = ({ type }) => {
  switch (type) {
    case 'alert':
      return <AlertCircle className="text-red-500" />;
    case 'info':
      return <Info className="text-blue-500" />;
    case 'success':
      return <Sprout className="text-green-500" />;
    default:
      return null;
  }
};