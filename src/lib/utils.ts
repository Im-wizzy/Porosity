import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { type SensorData } from "@/lib/firebase"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToCsv(data: SensorData[], filenamePrefix: string = 'sensor_data') {
  if (data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
  const filename = `${filenamePrefix}_${timestamp}.csv`;

  const headers = "timestamp,datetime,temperature,humidity,soil_moisture_percent,soil_moisture_raw";
  const csvRows = data.map(row => 
    [
      row.timestamp,
      `"${format(new Date(row.datetime), 'yyyy-MM-dd HH:mm:ss')}"`,
      row.temperature.toFixed(2),
      row.humidity.toFixed(2),
      row.soil_moisture_percent.toFixed(2),
      row.soil_moisture_raw.toFixed(0)
    ].join(',')
  );

  const csvData = [headers, ...csvRows].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-s-8,' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
