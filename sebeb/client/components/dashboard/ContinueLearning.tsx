import { Card, Chip, Icon, Progress } from "@/formic/components/primitives";
import Button from "@/formic/components/Button";

/* The one thing a returning student wants: pick up where they stopped.
   Picture on one side, the course and the single accent action on the other. */
export default function ContinueLearning() {
  return (
    <Card className="grid lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-64 overflow-hidden bg-inset lg:min-h-80">
        <img
          src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85"
          alt="Leather crafting tools and materials"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 55%, transparent)",
          }}
        />

        <span className="absolute bottom-4 left-4 inline-flex h-7 items-center gap-1.5 rounded-full bg-surface/95 px-3 text-tiny font-medium text-ink shadow-btn backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent" />
          Continue building
        </span>
      </div>

      <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
        <div>
          <Chip tone="inset" size="sm">
            Currently learning
          </Chip>

          <h2 className="mt-4 max-w-md text-display-lg font-semibold tracking-tight text-ink">
            Leather Craft Fundamentals
          </h2>

          <p className="mt-3 max-w-md text-body leading-relaxed text-ink-3">
            Learn how raw leather becomes a finished handmade object.
          </p>
        </div>

        <div>
          <div className="mb-2.5 flex items-end justify-between gap-4">
            <div>
              <p className="text-small text-ink-3">Course progress</p>
              <p className="text-title font-semibold tabular-nums text-ink">
                64%
              </p>
            </div>

            <p className="text-small text-ink-3">12 of 18 lessons</p>
          </div>

          <Progress value={64} label="Leather Craft Fundamentals progress" />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              href="/courses/foundations-of-fine-craftsmanship"
              variant="accent"
              size="lg"
              icon="play"
              iconEnd="arrow-right"
            >
              Continue Learning
            </Button>

            <span className="inline-flex items-center gap-1.5 text-small text-ink-3">
              <Icon name="clock" size={13} strokeWidth={1.8} />
              About 25 min left today
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
