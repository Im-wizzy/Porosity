"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportButton } from "./ExportButton";
import { type SensorData } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface FirebaseConfigProps {
  projectId: string;
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
  allData: SensorData[];
}

export function FirebaseConfig({
  projectId,
  isConnected,
  onConnectionChange,
  allData,
}: FirebaseConfigProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected) {
      toast({
        title: "Connection Success",
        description: `Connected to project: ${projectId}`,
      });
    }
  }, [isConnected, projectId, toast]);


  const handleDisconnect = () => {
    onConnectionChange(false);
    toast({
      title: "Disconnected",
      description: "Connection to Firebase closed.",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card w-full md:w-auto shadow-sm">
      <div className="flex-grow w-full md:w-auto space-y-1.5">
        <div className="flex items-center gap-2">
            <div className="text-sm font-medium pr-2">Project: <span className="font-mono bg-muted px-2 py-1 rounded-md text-sm">{projectId}</span></div>
            {isConnected ? (
                <Badge className="bg-teal-600 hover:bg-teal-700 text-white">Connected</Badge>
            ) : (
                <Badge variant="destructive">Offline</Badge>
            )}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto self-end">
        {isConnected ? (
          <>
            <Button variant="outline" onClick={handleDisconnect} className="w-full sm:w-auto">Disconnect</Button>
            <ExportButton data={allData} />
          </>
        ) : (
          <Button disabled={true} className="w-full sm:w-auto">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </Button>
        )}
      </div>
    </div>
  );
}
