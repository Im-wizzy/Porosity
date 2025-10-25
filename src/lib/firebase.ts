"use client"

import { useState, useEffect, useRef } from 'react';

export type SensorData = {
  timestamp: number;
  datetime: string;
  temperature: number;
  humidity: number;
  soil_moisture_percent: number;
  soil_moisture_raw: number;
};

// Generates a single new data point with slight variations
const generateNewDataPoint = (lastData?: SensorData): SensorData => {
  const newTimestamp = Date.now();
  const baseTemp = lastData ? lastData.temperature : 25;
  const baseHumidity = lastData ? lastData.humidity : 55;
  const baseMoisture = lastData ? lastData.soil_moisture_percent : 60;
  
  return {
    timestamp: newTimestamp,
    datetime: new Date(newTimestamp).toISOString(),
    temperature: Math.max(10, Math.min(40, baseTemp + (Math.random() - 0.5) * 0.5)),
    humidity: Math.max(20, Math.min(99, baseHumidity + (Math.random() - 0.5) * 1)),
    soil_moisture_percent: Math.max(0, Math.min(100, baseMoisture + (Math.random() - 0.51) * 2)),
    soil_moisture_raw: 200 + Math.random() * 600,
  };
};

export const useSensorData = (isConnected: boolean) => {
  const [data, setData] = useState<SensorData[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isConnected) {
      // Initialize with a few data points
      setData(Array.from({ length: 50 }, (_, i) => {
        const d = new Date();
        d.setSeconds(d.getSeconds() - (50 - i) * 5);
        const timestamp = d.getTime();
        return {
          timestamp,
          datetime: new Date(timestamp).toISOString(),
          temperature: 24 + Math.random() * 2,
          humidity: 50 + Math.random() * 10,
          soil_moisture_percent: 55 + Math.random() * 10,
          soil_moisture_raw: 550 + Math.random() * 100,
        }
      }));

      intervalRef.current = setInterval(() => {
        setData(prevData => {
            const lastDataPoint = prevData.length > 0 ? prevData[prevData.length - 1] : undefined;
            const newData = [...prevData, generateNewDataPoint(lastDataPoint)];
            // Keep a max number of data points for performance
            if (newData.length > 1000) {
              return newData.slice(newData.length - 1000);
            }
            return newData;
        });
      }, 2000); // Add new data every 2 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setData([]);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isConnected]);

  return data;
};
