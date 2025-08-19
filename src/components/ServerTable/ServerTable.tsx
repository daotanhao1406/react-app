interface ServerTableProps {
  servers: any[];
}

export default function ServerTable({ servers }: ServerTableProps) {
  const handleConnect = (serverId: string) => {
    console.log(`Connecting to server: ${serverId}`);
  };

  return (
    <div className="animate-fade-in" data-testid="server-table">
      <div
        className="relative bg-[#050505]/95 border border-[#00e5e5]/30 rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,5,5,0.95) 0%, rgba(5,10,15,0.95) 100%)",
          boxShadow:
            "0 0 40px rgba(0,255,255,0.15), inset 0 0 60px rgba(0,255,255,0.05)",
        }}
      >
        {/* Curved corner decorations */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[#00e5e5]/60 rounded-tl-2xl"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-[#00e5e5]/60 rounded-tr-2xl"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-[#00e5e5]/60 rounded-bl-2xl"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[#00e5e5]/60 rounded-br-2xl"></div>

        {/* Header with cyan theme */}
        <div className="bg-gradient-to-r from-[#00e5e5]/10 via-[#00e5e5]/5 to-transparent p-6 border-b border-[#00e5e5]/20 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#00e5e5]/20 border border-[#00e5e5]/40 rounded-xl flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#00e5e5]"
                >
                  <path
                    d="M3 3h18v18H3V3zm2 2v14h14V5H5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="rgba(0,255,255,0.1)"
                  />
                  <path
                    d="M8 8h8v8H8V8zm1 1v6h6V9H9z"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00e5e5] flex items-center tracking-wide">
                  NEURAL NETWORK
                  <span className="ml-4 text-xs px-3 py-1 bg-[#00e5e5]/20 border border-[#00e5e5]/50 rounded-full text-[#00e5e5]">
                    CYBERPUNK v3.0
                  </span>
                </h3>
                <p className="text-[#737373] text-sm mt-1 flex items-center">
                  <span className="w-2 h-2 bg-[#00e5e5] rounded-full mr-2 animate-pulse"></span>
                  Distributed server infrastructure • Real-time monitoring
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#00e5e5] text-sm font-mono">
                STATUS: ACTIVE
              </div>
              <div className="text-[#737373] text-xs">Last sync: NOW</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden">
            <thead className="bg-gradient-to-r from-[#00e5e5]/5 to-transparent relative">
              <tr className="border-b border-[#00e5e5]/30">
                <th className="text-left py-4 px-6 text-[#00e5e5] text-xs font-bold tracking-widest uppercase w-1/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00e5e5]/60 rounded-full"></div>
                    <span>NODE STATUS</span>
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-[#00e5e5] text-xs font-bold tracking-widest uppercase w-1/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00e5e5]/60 rounded-full"></div>
                    <span>IDENTIFIER</span>
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-[#00e5e5] text-xs font-bold tracking-widest uppercase w-1/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00e5e5]/60 rounded-full"></div>
                    <span>NETWORK ADDRESS</span>
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-[#00e5e5] text-xs font-bold tracking-widest uppercase w-1/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00e5e5]/60 rounded-full"></div>
                    <span>GEO LOCATION</span>
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-[#00e5e5] text-xs font-bold tracking-widest uppercase w-1/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00e5e5]/60 rounded-full"></div>
                    <span>INTERFACE</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server, index) => (
                <tr
                  key={server.id}
                  className={`cyber-table-row border-b border-[#00e5e5]/10 relative group hover:bg-[#00e5e5]/5 transition-all duration-300 ${
                    !server.isOnline ? "opacity-60" : ""
                  }`}
                  data-testid={`server-row-${server.id}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Status column with enhanced styling */}
                  <td className="py-4 px-6 relative w-1/5">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
                              server.isOnline
                                ? "bg-[#00ff00] border-[#00ff00] animate-pulse"
                                : "bg-transparent border-[#737373]"
                            }`}
                          ></div>
                          {server.isOnline && (
                            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00ff00] animate-ping opacity-30"></div>
                          )}
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            server.isOnline
                              ? "bg-[#00ff00]/20 border-[#00ff00]/40 text-[#00ff00]"
                              : "bg-[#737373]/20 border-[#737373]/40 text-[#737373]"
                          }`}
                        >
                          {server.isOnline ? "ONLINE" : "OFFLINE"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Server name column */}
                  <td className="py-4 px-6 w-1/5">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div
                          className={`font-bold text-base tracking-wide ${
                            server.isOnline
                              ? "text-[#ccfaff]"
                              : "text-[#737373]"
                          }`}
                          data-testid={`table-name-${server.id}`}
                        >
                          {server.name}
                        </div>
                        <div
                          className={`text-xs font-mono ${
                            server.isOnline
                              ? "text-[#00e5e5]/60"
                              : "text-[#737373]/60"
                          }`}
                        >
                          NEURAL_NODE_{index + 1}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* IP Address column */}
                  <td className="py-4 px-6 w-1/5">
                    <div
                      className={`bg-[#050505]/40 px-4 py-3 rounded-lg border ${
                        server.isOnline
                          ? "border-[#00e5e5]/30"
                          : "border-[#737373]/30"
                      }`}
                    >
                      <div
                        className={`font-mono text-sm font-bold ${
                          server.isOnline ? "text-[#ccfaff]" : "text-[#737373]"
                        }`}
                        data-testid={`table-ip-${server.id}`}
                      >
                        {server.ip}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          server.isOnline
                            ? "text-[#00e5e5]/60"
                            : "text-[#737373]/60"
                        }`}
                      >
                        IPv4 • Port 443
                      </div>
                    </div>
                  </td>

                  {/* Location column */}
                  <td className="py-4 px-6 w-1/5">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={`https://flagcdn.com/w20/${server.countryCode}.png`}
                          alt={`${server.country} Flag`}
                          className={`w-7 h-5 rounded border ${
                            server.isOnline
                              ? "border-[#00e5e5]/40"
                              : "border-[#737373]/40"
                          } ${!server.isOnline ? "opacity-50" : ""}`}
                        />
                      </div>
                      <div>
                        <div
                          className={`text-sm font-bold ${
                            server.isOnline
                              ? "text-[#ccfaff]"
                              : "text-[#737373]"
                          }`}
                          data-testid={`table-country-${server.id}`}
                        >
                          {server.country}
                        </div>
                        <div
                          className={`text-xs font-mono uppercase ${
                            server.isOnline
                              ? "text-[#00e5e5]/60"
                              : "text-[#737373]/60"
                          }`}
                        >
                          {server.countryCode} • REGION
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Actions column */}
                  <td className="py-4 px-6 w-1/5">
                    <button
                      onClick={() => handleConnect(server.id)}
                      disabled={!server.isOnline}
                      className={`px-5 py-2 text-sm font-bold rounded-full border transition-all duration-300 relative overflow-hidden group ${
                        server.isOnline
                          ? "bg-[#00e5e5]/10 border-[#00e5e5]/50 text-[#00e5e5] hover:bg-[#00e5e5]/20 hover:border-[#00e5e5] hover:shadow-lg hover:shadow-[#00e5e5]/20"
                          : "bg-[#737373]/10 border-[#737373]/50 text-[#737373] opacity-50 cursor-not-allowed"
                      }`}
                      data-testid={`table-connect-button-${server.id}`}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-current"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{server.isOnline ? "CONNECT" : "OFFLINE"}</span>
                      </span>
                      {server.isOnline && (
                        <div className="absolute inset-0 bg-[#00e5e5]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
