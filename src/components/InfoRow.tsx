interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  variant?: "default" | "light";
}

const InfoRow = ({ label, value, variant = "default" }: InfoRowProps) => {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`text-sm font-medium min-w-[140px] shrink-0 ${
          variant === "light" ? "text-white/70" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          variant === "light" ? "text-white" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default InfoRow;
