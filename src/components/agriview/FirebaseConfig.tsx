"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ExportButton } from "./ExportButton";
import { type SensorData } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";


interface FirebaseConfigProps {
  projectId: string;
  setProjectId: (id: string) => void;
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
  allData: SensorData[];
}

export function FirebaseConfig({
  projectId,
  setProjectId,
  isConnected,
  onConnectionChange,
  allData,
}: FirebaseConfigProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      onConnectionChange(true);
      setIsLoading(false);
      toast({
        title: "Connection Success",
        description: `Connected to project: ${projectId}`,
      });
    }, 1500);
  };

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
        <Label htmlFor="projectId" className="text-xs font-medium">Firebase Project ID</Label>
        <div className="flex items-center gap-2">
            <Input
                id="projectId"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                disabled={isConnected || isLoading}
                className="w-full md:w-48"
            />
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
          <Button onClick={handleConnect} disabled={!projectId || isLoading} className="w-full sm:w-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Connecting..." : "Connect"}
          </Button>
        )}
      </div>
    </div>
  );
}
