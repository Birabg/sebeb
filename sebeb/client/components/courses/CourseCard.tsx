import { Card, Chip } from "@/formic/components/primitives";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardButton,
  CardTitle,
} from "@/formic/components/cards";
import type { Course } from "@/lib/data/courses";
import { formatPrice } from "@/lib/data/courses";

type CourseCardProps = {
  course: Course;
};

/* A course to browse and pick: picture, category, title, the facts, the
   price, and the one action. The card is a surface; the button is the link. */
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="card-hover flex h-full flex-col">
      <CardMedia src={course.image} alt={course.title} />

      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Chip size="sm">{course.category}</Chip>

          <span className="text-small text-ink-3">{course.level}</span>
        </div>

        <CardTitle className="text-body">{course.title}</CardTitle>

        <CardDescription>{course.description}</CardDescription>

        <p className="text-small text-ink-3">
          {course.lessons} lessons · {course.duration}
        </p>
      </CardHeader>

      <CardFooter>
        <div className="min-w-0 flex-1">
          <p className="text-small text-ink-3">Price</p>
          <p className="text-body font-semibold tabular-nums text-ink">
            {formatPrice(course.price)}
          </p>
        </div>

        <CardButton href={`/courses/${course.slug}`}>Explore</CardButton>
      </CardFooter>
    </Card>
  );
}
