"use client"

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCsv } from "@/lib/utils";
import { type SensorData } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  data: SensorData[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const { toast } = useToast();

  const handleExport = () => {
    exportToCsv(data, "sensor_data");
    toast({
      title: "Export Started",
      description: `${data.length} records are being downloaded.`
    })
  };

  return (
    <Button
      onClick={handleExport}
      disabled={data.length === 0}
      variant="secondary"
      className="w-full sm:w-auto"
    >
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}
