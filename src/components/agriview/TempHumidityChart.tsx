"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { type SensorData } from "@/lib/firebase";
import { format } from "date-fns";

interface TempHumidityChartProps {
    data: SensorData[];
}

const chartConfig = {
  temperature: {
    label: "Temp (°C)",
    color: "hsl(var(--primary))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function TempHumidityChart({ data }: TempHumidityChartProps) {
    return (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    top: 5,
                    right: 15,
                    left: -10,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => format(new Date(value), "HH:mm")}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                    yAxisId="left"
                    tickFormatter={(value) => `${value}`}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    stroke="var(--color-temperature)"
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${value}`}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    stroke="var(--color-humidity)"
                />
                <Tooltip
                    cursor={true}
                    content={<ChartTooltipContent 
                        indicator="dot" 
                        labelFormatter={(label, payload) => {
                            if (payload && payload.length > 0) {
                                return format(new Date(payload[0].payload.timestamp), 'MMM d, h:mm:ss a');
                            }
                            return label;
                        }}
                    />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                    dataKey="temperature"
                    yAxisId="left"
                    type="natural"
                    stroke="var(--color-temperature)"
                    strokeWidth={2.5}
                    dot={false}
                    name="Temp (°C)"
                />
                <Line
                    dataKey="humidity"
                    yAxisId="right"
                    type="natural"
                    stroke="var(--color-humidity)"
                    strokeWidth={2.5}
                    dot={false}
                    name="Humidity (%)"
                />
            </LineChart>
        </ChartContainer>
    );
}
