import { StatCard } from "@/formic/components/StatCard";
import type { IconName } from "@/formic/components/primitives";

type Stat = {
  label: string;
  display: string;
  caption: string;
  icon: IconName;
  delta?: string;
  trend: number[];
};

const stats: Stat[] = [
  {
    label: "Courses enrolled",
    display: "04",
    caption: "2 currently active",
    icon: "layers",
    trend: [1, 1, 2, 2, 3, 4],
  },
  {
    label: "Learning hours",
    display: "18.5",
    caption: "This month",
    icon: "clock",
    delta: "12%",
    trend: [2, 4, 3, 6, 5, 8, 7],
  },
  {
    label: "Completed",
    display: "02",
    caption: "Courses finished",
    icon: "trophy",
    trend: [0, 0, 1, 1, 1, 2],
  },
];

/* Three headline numbers. The first tile leads, so it alone takes the accent;
   the other icons stay quiet. */
export default function DashboardStats() {
  return (
    <section
      aria-label="Learning summary"
      className="grid gap-3.5 sm:grid-cols-3"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          style={{
            animation: `fade-up 360ms var(--ease-out-quint) ${index * 70}ms both`,
          }}
        >
          <StatCard
            layout="inline"
            label={stat.label}
            display={stat.display}
            caption={stat.caption}
            delta={stat.delta}
            icon={stat.icon}
            iconTone={index === 0 ? "accent" : "neutral"}
            trend={stat.trend}
            trendSmooth
            className="h-full max-w-none!"
          />
        </div>
      ))}
    </section>
  );
}
