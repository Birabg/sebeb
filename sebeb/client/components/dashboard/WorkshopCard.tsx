import { Card, IconTile } from "@/formic/components/primitives";

export default function WorkshopCard() {
  return (
    <Card className="flex items-start gap-4 p-5">
      <IconTile icon="sparkles" tone="accent" />

      <div className="min-w-0">
        <p className="text-micro font-medium uppercase tracking-wide text-ink-3">
          Workshop Notes
        </p>

        <h3 className="mt-1 text-body font-semibold text-ink">
          Leather Thickness
        </h3>

        <p className="mt-1.5 text-caption leading-relaxed text-ink-3">
          Recommended 2-3mm for wallets and small items. Always test with a
          scrap piece before cutting.
        </p>
      </div>
    </Card>
  );
}
