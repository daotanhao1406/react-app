import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

const InfoCard = ({
  icon: Icon,
  title,
  children,
  variant = "default",
  className = "",
}: InfoCardProps) => {
  const variants = {
    default: "bg-card shadow-card",
    primary: "bg-gradient-primary text-primary-foreground shadow-primary",
    accent: "bg-primary-light border border-primary/20",
  };

  const iconVariants = {
    default: "bg-primary/10 text-primary",
    primary: "bg-white/20 text-white",
    accent: "bg-primary text-primary-foreground",
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${variants[variant]} ${className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3
          className={`font-display font-semibold text-lg ${
            variant === "primary" ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default InfoCard;
