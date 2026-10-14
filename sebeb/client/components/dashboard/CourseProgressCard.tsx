import Link from "next/link";
import { Card, Chip, Icon, Progress } from "@/formic/components/primitives";

type CourseProgressCardProps = {
  title: string;
  category: string;
  progress: number;
  lessons: string;
  image: string;
  href: string;
};

export default function CourseProgressCard({
  title,
  category,
  progress,
  lessons,
  image,
  href,
}: CourseProgressCardProps) {
  return (
    <Link href={href} className="group block rounded-card">
      <Card className="h-full transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-overlay">
        <div className="relative aspect-[16/10] overflow-hidden bg-inset">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <div className="absolute left-3 top-3">
            <Chip tone="surface" size="sm">
              {category}
            </Chip>
          </div>

          <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-surface text-ink opacity-0 shadow-btn transition-opacity duration-150 group-hover:opacity-100">
            <Icon name="external" size={14} strokeWidth={2} />
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-body font-semibold leading-snug text-ink">
            {title}
          </h3>

          <p className="mt-1 text-small text-ink-3">{lessons}</p>

          <div className="mt-4 flex items-center gap-3">
            <Progress
              value={progress}
              label={`${title} progress`}
              className="flex-1"
            />
            <span className="text-small font-medium tabular-nums text-ink">
              {progress}%
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
