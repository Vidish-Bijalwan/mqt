import { Flame, Zap, Clock } from "lucide-react";

type BadgeType = "trending" | "limited" | "expiry";

interface TrendingBadgeProps {
  type: BadgeType;
  value?: string | number;
  className?: string;
}

const config: Record<BadgeType, { icon: React.ElementType; label: (val?: string | number) => string; className: string }> = {
  trending: {
    icon: Flame,
    label: () => "Trending",
    className: "bg-orange-500/15 text-orange-600 border border-orange-500/30",
  },
  limited: {
    icon: Zap,
    label: (val) => val ? `Only ${val} seats left!` : "Limited Seats",
    className: "bg-destructive/10 text-destructive border border-destructive/20",
  },
  expiry: {
    icon: Clock,
    label: (val) => val ? `Offer ends ${val}` : "Limited Time Offer",
    className: "bg-accent/10 text-amber-700 border border-accent/30",
  },
};

const TrendingBadge = ({ type, value, className = "" }: TrendingBadgeProps) => {
  const { icon: Icon, label, className: defaultClass } = config[type];

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-body font-semibold px-2.5 py-1 rounded-full ${defaultClass} ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label(value)}
    </span>
  );
};

export default TrendingBadge;
