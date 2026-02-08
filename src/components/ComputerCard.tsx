import React, { useEffect, useState } from "react";
import { Monitor, Cpu, HardDrive, Cloud, Zap } from "lucide-react";

// POC 6: Floating Particles Background
export default function ComputerCardPOC6({ data, hasControl }) {
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 2 + Math.random() * 3,
    })),
  );

  const [text, setText] = useState("");
  const fullText = "CONTROL ACTIVE";

  useEffect(() => {
    if (!hasControl) return;

    let index = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting) {
        setText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 1000);
        }
      } else {
        setText(fullText.slice(0, index - 1));
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [hasControl]);

  const chars = ["0", "1", "0", "1", "0", "1"];

  return (
    <div className="relative bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 overflow-hidden">
      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }
           @keyframes spark {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes sparkGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      {hasControl && (
        <div className="absolute top-3 right-3 flex items-center">
          <span className="text-[#f0b90b] text-xs font-mono">{text}</span>
          <span className="w-0.5 h-4 bg-[#f0b90b] ml-0.5 animate-pulse" />
        </div>
      )}
      {hasControl && (
        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
          {chars.map((char, i) => (
            <div
              key={i}
              className="text-[#f0b90b] text-xs font-mono"
              style={{
                animation: `matrixFall ${1 + i * 0.2}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      )}
      {/* {hasControl &&
        particles.map((particle) => (
          <Cloud
            key={particle.id}
            className="absolute text-[#f0b90b] opacity-60"
            style={{
              width: particle.size * 2,
              height: particle.size * 2,
              left: `${particle.left}%`,
              bottom: "-10px",
              animation: `floatUp ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))} */}
      {hasControl && (
        <>
          <Zap
            className="absolute bottom-2 right-2 w-4 h-4 text-yellow-400"
            style={{ animation: "spark 0.5s ease-in-out infinite" }}
          />

          <div
            className="absolute bottom-0 right-0 w-16 h-16"
            style={{
              background:
                "radial-gradient(circle at bottom right, rgba(250,204,21,0.2) 0%, transparent 70%)",
              animation: "sparkGlow 1s ease-in-out infinite",
            }}
          />
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Monitor className="w-8 h-8 text-[#f0b90b]" />
          <div>
            <h3 className="text-white font-semibold">{data.name}</h3>
            <p className="text-gray-400 text-sm">{data.status}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Cpu className="w-4 h-4" />
            <span>{data.cpu}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <HardDrive className="w-4 h-4" />
            <span>{data.ram}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { opacity: 1; }
          100% { transform: translateY(-150px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
