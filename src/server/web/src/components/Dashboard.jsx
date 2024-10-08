import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera } from 'lucide-react';
import Chart from 'chart.js/auto';

const Dashboard = ({ systemStatus, sensorData }) => {
  const tempOxygenChartRef = useRef(null);
  const ecLuxChartRef = useRef(null);
  const tempOxygenChartInstance = useRef(null);
  const ecLuxChartInstance = useRef(null);

  useEffect(() => {
    // Function to create or update a chart
    const createOrUpdateChart = (chartRef, chartInstance, data, labels, datasets) => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: data.title
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          }
        }
      });
    };

    // Create or update Temperature and Dissolved Oxygen chart
    createOrUpdateChart(
      tempOxygenChartRef,
      tempOxygenChartInstance,
      { title: 'Temperature and Dissolved Oxygen' },
      sensorData.map(data => data.timestamp),
      [
        {
          label: 'Temperature (°C)',
          data: sensorData.map(data => data.temperature),
          borderColor: 'rgb(255, 99, 132)',
          yAxisID: 'y',
        },
        {
          label: 'Dissolved Oxygen (mg/L)',
          data: sensorData.map(data => data.dissolvedOxygen),
          borderColor: 'rgb(75, 192, 192)',
          yAxisID: 'y1',
        }
      ]
    );

    // Create or update EC and Light Intensity chart
    createOrUpdateChart(
      ecLuxChartRef,
      ecLuxChartInstance,
      { title: 'EC and Light Intensity' },
      sensorData.map(data => data.timestamp),
      [
        {
          label: 'EC (μS/cm)',
          data: sensorData.map(data => data.ec),
          borderColor: 'rgb(54, 162, 235)',
          yAxisID: 'y',
        },
        {
          label: 'Light Intensity (lux)',
          data: sensorData.map(data => data.lightIntensity),
          borderColor: 'rgb(255, 206, 86)',
          yAxisID: 'y1',
        }
      ]
    );

    return () => {
      if (tempOxygenChartInstance.current) {
        tempOxygenChartInstance.current.destroy();
      }
      if (ecLuxChartInstance.current) {
        ecLuxChartInstance.current.destroy();
      }
    };
  }, [sensorData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-800 text-center">HydroEdu System Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Temperature</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.temperature}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Humidity</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.humidity}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>pH Level</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.ph}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>EC</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.ec} μS/cm</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Light Intensity</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.lightIntensity} lux</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Water Level</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.waterLevel} cm</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Flow Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.flowRate} L/min</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Pressure</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.pressure} kPa</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Dissolved Oxygen</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-2xl font-semibold">{systemStatus.dissolvedOxygen} mg/L</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Temperature and Dissolved Oxygen</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px', width: '100%' }}>
              <canvas ref={tempOxygenChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>EC and Light Intensity</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px', width: '100%' }}>
              <canvas ref={ecLuxChartRef}></canvas>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Live Camera Feed</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] bg-gray-100">
          <Camera size={48} />
          <p className="ml-2">Camera feed placeholder</p>
        </CardContent>
      </Card>

      <Alert className="mt-8">
        <AlertTitle>System Status</AlertTitle>
        <AlertDescription>Last updated: {systemStatus.lastUpdated}</AlertDescription>
      </Alert>
    </div>
  );
};

export default Dashboard;