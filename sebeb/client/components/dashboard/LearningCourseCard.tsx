import { Badge, Card, Chip, Icon, Progress } from "@/formic/components/primitives";
import Button from "@/formic/components/Button";

type LearningCourseCardProps = {
  title: string;
  category: string;
  description: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  duration: string;
  image: string;
  href: string;
  completed?: boolean;
};

export default function LearningCourseCard({
  title,
  category,
  description,
  progress,
  lessonsCompleted,
  totalLessons,
  duration,
  image,
  href,
  completed = false,
}: LearningCourseCardProps) {
  return (
    <Card className="group grid transition-shadow duration-200 hover:shadow-overlay md:grid-cols-[280px_1fr]">
      <div className="relative aspect-[16/10] overflow-hidden bg-inset md:aspect-auto md:min-h-60">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute left-3 top-3">
          <Chip tone="surface" size="sm">
            {category}
          </Chip>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="max-w-xl text-title font-semibold leading-snug tracking-tight text-ink">
              {title}
            </h3>

            {completed && (
              <Badge tone="green" className="shrink-0">
                <Icon name="circle-check" size={13} weight="fill" />
                Completed
              </Badge>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-caption leading-relaxed text-ink-3">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-ink-3">
            <span className="flex items-center gap-1.5">
              <Icon name="play" size={13} strokeWidth={1.8} />
              {lessonsCompleted} of {totalLessons} lessons
            </span>

            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={13} strokeWidth={1.8} />
              {duration}
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-small text-ink-3">
              {completed ? "Course completed" : "Course progress"}
            </span>

            <span className="text-small font-medium tabular-nums text-ink">
              {progress}%
            </span>
          </div>

          <Progress
            value={progress}
            tone={completed ? "green" : "accent"}
            label={`${title} progress`}
          />

          <div className="mt-4">
            <Button
              href={href}
              variant={completed ? "outline" : "accent-soft"}
              size="sm"
              iconEnd="arrow-right"
            >
              {completed ? "Review course" : "Continue Learning"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
