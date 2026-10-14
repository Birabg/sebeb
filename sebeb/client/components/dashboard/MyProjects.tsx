import Panel from "@/formic/components/Panel";
import Button from "@/formic/components/Button";
import { Chip, Icon, Progress } from "@/formic/components/primitives";

const stages = [
  { label: "Select leather", done: true },
  { label: "Cut pieces", done: true },
  { label: "Stitch wallet", done: true },
  { label: "Finish & photograph", done: false },
];

export default function MyProjects() {
  return (
    <Panel title="Handmade Pieces" caption="My projects" padding="lg">
      <div className="corner-smooth rounded-md bg-inset p-4 shadow-hairline">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-body font-semibold text-ink">
              Handmade Leather Wallet
            </h4>
            <p className="mt-0.5 text-small text-ink-3">Beginner Project</p>
          </div>

          <Chip tone="surface" size="sm">
            75%
          </Chip>
        </div>

        <div className="mt-4">
          <Progress value={75} label="Wallet project progress" />
          <p className="mt-2 text-small text-ink-3">3 of 4 stages complete</p>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {stages.map((stage) => (
            <li
              key={stage.label}
              className="flex items-center gap-2.5 text-caption"
            >
              {stage.done ? (
                <Icon
                  name="circle-check"
                  size={16}
                  weight="fill"
                  className="shrink-0 text-green"
                />
              ) : (
                <span className="size-4 shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_var(--line-strong)]" />
              )}

              <span className={stage.done ? "text-ink-2" : "text-ink"}>
                {stage.label}
              </span>
            </li>
          ))}
        </ul>

        <Button
          href="/dashboard/learning"
          variant="secondary"
          size="sm"
          iconEnd="arrow-right"
          className="mt-5"
        >
          Continue Project
        </Button>
      </div>
    </Panel>
  );
}
