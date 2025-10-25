import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
}

export function StatCard({ title, value, unit, icon }: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-body">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">
          {value}
          <span className="text-base font-medium text-muted-foreground ml-1">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
