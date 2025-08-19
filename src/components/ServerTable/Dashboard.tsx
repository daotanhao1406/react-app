import { useState, useEffect } from "react";
import { serversWithIds } from "../../data/mockData";
import ServerTable from "./ServerTable";

export default function Dashboard() {
  const [servers, setServers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for a more realistic feel
    const timer = setTimeout(() => {
      setServers(serversWithIds);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onlineServers = servers.filter((s) => s.isOnline).length;
  const offlineServers = servers.filter((s) => !s.isOnline).length;
  const totalNodes = servers.length;

  return (
    <div className="bg-cyber-black text-cyber-text font-mono min-h-screen overflow-x-hidden">
      {/* Background with Earth image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #00ffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #00ff88 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Scanning line effect */}
      <div className="scan-line" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="glassmorphism p-8 rounded-lg border-glow animate-pulse">
                <div className="text-center">
                  <div className="text-cyber-cyan text-glow mb-4">
                    CONNECTING TO MATRIX...
                  </div>
                  <div className="w-full bg-cyber-dark/50 h-2 rounded">
                    <div
                      className="bg-cyber-cyan h-2 rounded animate-glow"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Server Views */}
            {!isLoading && <ServerTable servers={servers} />}
          </div>
        </main>
      </div>
    </div>
  );
}
