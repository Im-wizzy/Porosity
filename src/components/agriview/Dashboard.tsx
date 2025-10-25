"use client";

import { useState, useEffect } from "react";
import { useSensorData, type SensorData } from "@/lib/firebase";
import { FirebaseConfig } from "./FirebaseConfig";
import { StatCard } from "./StatCard";
import { SoilMoistureChart } from "./SoilMoistureChart";
import { TempHumidityChart } from "./TempHumidityChart";
import { SensorDataTable } from "./SensorDataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Leaf } from "lucide-react";

export function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const projectId = "agriview-9541a";
  const sensorData = useSensorData(isConnected);

  useEffect(() => {
    // Auto-connect on component mount
    setIsConnected(true);
  }, []);

  const latestData = sensorData.length > 0 ? sensorData[sensorData.length - 1] : null;
  const chartData = sensorData.slice(-100);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">AgriView</h1>
          <p className="text-muted-foreground">Real-time agricultural sensor monitoring dashboard.</p>
        </div>
        <FirebaseConfig
          projectId={projectId}
          isConnected={isConnected}
          onConnectionChange={setIsConnected}
          allData={sensorData}
        />
      </header>

      <main className="grid grid-cols-1 gap-6 md:gap-8">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Temperature"
            value={latestData ? latestData.temperature.toFixed(1) : "N/A"}
            unit="°C"
            icon={<Thermometer className="size-6 text-accent" />}
          />
          <StatCard
            title="Humidity"
            value={latestData ? latestData.humidity.toFixed(1) : "N/A"}
            unit="%"
            icon={<Droplets className="size-6 text-accent" />}
          />
          <StatCard
            title="Soil Moisture"
            value={latestData ? latestData.soil_moisture_percent.toFixed(1) : "N/A"}
            unit="%"
            icon={<Leaf className="size-6 text-accent" />}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Soil Moisture (%)</CardTitle>
              <CardDescription>Last 100 readings from sensor</CardDescription>
            </CardHeader>
            <CardContent>
              {isConnected && sensorData.length > 0 ? <SoilMoistureChart data={chartData} /> : <ChartPlaceholder message="Connect to view chart"/>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Temperature & Humidity</CardTitle>
              <CardDescription>Last 100 readings from sensor</CardDescription>
            </CardHeader>
            <CardContent>
              {isConnected && sensorData.length > 0 ? <TempHumidityChart data={chartData} /> : <ChartPlaceholder message="Connect to view chart" />}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Sensor Data Log</CardTitle>
              <CardDescription>All available sensor readings. Most recent at the top.</CardDescription>
            </CardHeader>
            <CardContent>
              <SensorDataTable data={sensorData} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

const ChartPlaceholder = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-[300px] bg-muted/30 rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">{message}</p>
    </div>
)
