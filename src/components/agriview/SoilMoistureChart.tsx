"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { type SensorData } from "@/lib/firebase";
import { format } from "date-fns";

interface SoilMoistureChartProps {
    data: SensorData[];
}

const chartConfig = {
  soil_moisture_percent: {
    label: "Soil Moisture",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function SoilMoistureChart({ data }: SoilMoistureChartProps) {
    return (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    top: 5,
                    right: 10,
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
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}`}
                    unit="%"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
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
                <Line
                    dataKey="soil_moisture_percent"
                    type="natural"
                    stroke="var(--color-soil_moisture_percent)"
                    strokeWidth={2.5}
                    dot={false}
                    name="Soil Moisture"
                />
            </LineChart>
        </ChartContainer>
    );
}
