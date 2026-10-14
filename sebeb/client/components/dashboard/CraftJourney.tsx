import Panel from "@/formic/components/Panel";
import { Icon } from "@/formic/components/primitives";

type StepState = "done" | "current" | "upcoming";

type JourneyStep = { label: string; state: StepState };
type JourneyGroup = { title: string; steps: JourneyStep[] };

const journey: JourneyGroup[] = [
  {
    title: "Foundations",
    steps: [
      { label: "Introduction to Leather", state: "done" },
      { label: "Understanding Leather Types", state: "done" },
      { label: "Tools & Materials", state: "done" },
    ],
  },
  {
    title: "Making",
    steps: [
      { label: "Preparing the Workspace", state: "done" },
      { label: "Measuring & Cutting", state: "current" },
      { label: "Stitching Techniques", state: "upcoming" },
      { label: "Edge Finishing", state: "upcoming" },
    ],
  },
  {
    title: "Your Practice",
    steps: [
      { label: "First Leather Project", state: "upcoming" },
      { label: "Final Project", state: "upcoming" },
    ],
  },
];

function Marker({ state }: { state: StepState }) {
  if (state === "done") {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-green text-canvas">
        <Icon name="check" size={11} strokeWidth={3} />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-accent-tint shadow-[inset_0_0_0_1.5px_var(--accent)]">
        <span className="size-2 rounded-full bg-accent" />
      </span>
    );
  }

  return (
    <span className="size-5 rounded-full bg-inset shadow-[inset_0_0_0_1.5px_var(--line-strong)]" />
  );
}

/* A vertical path: a hairline runs through the markers, so the order reads
   at a glance and "you are here" is the one accent dot. */
export default function CraftJourney() {
  return (
    <Panel
      title="Your Learning Path"
      caption="Craft journey"
      padding="lg"
      bodyClassName="gap-6"
    >
      {journey.map((group) => (
        <div key={group.title}>
          <p className="mb-3 text-micro font-medium uppercase tracking-wide text-ink-3">
            {group.title}
          </p>

          <ol className="relative flex flex-col gap-3.5">
            <span
              aria-hidden
              className="absolute bottom-2.5 left-2.5 top-2.5 w-px -translate-x-1/2 bg-line"
            />

            {group.steps.map((step) => (
              <li
                key={step.label}
                aria-current={step.state === "current" ? "step" : undefined}
                className="relative flex items-center gap-3"
              >
                <Marker state={step.state} />

                <span
                  className={`text-caption ${
                    step.state === "current"
                      ? "font-medium text-ink"
                      : step.state === "done"
                        ? "text-ink-2"
                        : "text-ink-3"
                  }`}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </Panel>
  );
}
