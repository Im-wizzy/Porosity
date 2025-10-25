"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type SensorData } from "@/lib/firebase";
import { format } from "date-fns";

interface SensorDataTableProps {
  data: SensorData[];
}

export function SensorDataTable({ data }: SensorDataTableProps) {
  // We reverse the data to show the latest entries first
  const reversedData = [...data].reverse();

  return (
    <ScrollArea className="h-96 w-full rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-card/95 backdrop-blur-sm z-10">
          <TableRow>
            <TableHead className="w-[220px]">Datetime</TableHead>
            <TableHead className="text-right">Temperature (°C)</TableHead>
            <TableHead className="text-right">Humidity (%)</TableHead>
            <TableHead className="text-right">Soil Moisture (%)</TableHead>
            <TableHead className="text-right">Soil Moisture (Raw)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reversedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                {data.length === 0 ? 'No data available. Connect to start receiving data.' : 'Loading data...'}
              </TableCell>
            </TableRow>
          ) : (
            reversedData.map((reading) => (
              <TableRow key={reading.timestamp}>
                <TableCell className="font-medium">
                  {format(new Date(reading.datetime), "MMM d, yyyy, h:mm:ss a")}
                </TableCell>
                <TableCell className="text-right">{reading.temperature.toFixed(2)}</TableCell>
                <TableCell className="text-right">{reading.humidity.toFixed(2)}</TableCell>
                <TableCell className="text-right text-accent font-semibold">{reading.soil_moisture_percent.toFixed(2)}</TableCell>
                <TableCell className="text-right">{reading.soil_moisture_raw.toFixed(0)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
