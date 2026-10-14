"use client";

import { useState } from "react";
import Alert from "@/formic/components/Alert";
import Button from "@/formic/components/Button";

type EnrollActionsProps = {
  slug: string;
};

/* The enrollment summary's confirmation step: one quiet line of context,
   the accent action that completes it, and the way back. */
export default function EnrollActions({ slug }: EnrollActionsProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    return (
      <div className="flex flex-col gap-3">
        <Alert tone="success" title="Enrollment complete">
          Your course is ready in your learning space.
        </Alert>

        <Button href={`/learn/${slug}`} variant="accent" fullWidth>
          Start learning
        </Button>

        <Button href={`/courses/${slug}`} variant="outline" fullWidth>
          Back to course
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Button variant="accent" fullWidth onClick={() => setIsConfirmed(true)}>
        Complete enrollment
      </Button>

      <Button href={`/courses/${slug}`} variant="outline" fullWidth>
        Back to course
      </Button>

      <p className="mt-2 text-small text-ink-3">
        You are signed in, so no further account steps are needed. You can
        review this enrollment any time from My Learning.
      </p>
    </div>
  );
}
