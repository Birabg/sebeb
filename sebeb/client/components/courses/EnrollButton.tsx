"use client";

import { useRouter } from "next/navigation";
import Button from "@/formic/components/Button";
import { isAuthenticated, loginHref } from "@/lib/auth/guard";
import { useIsAuthenticated } from "@/lib/auth/use-auth";

type EnrollButtonProps = {
  slug: string;
  label?: string;
};

/* The course page's one accent action. Signed out, it detours through the
   login gate and brings the reader straight back to this course. */
export default function EnrollButton({ slug, label = "Enroll now" }: EnrollButtonProps) {
  const router = useRouter();
  const isSignedIn = useIsAuthenticated();

  function handleEnroll() {
    if (isAuthenticated()) {
      router.push(`/enroll/${slug}`);
      return;
    }

    router.push(loginHref(`/courses/${slug}`));
  }

  const hint = isSignedIn
    ? "Review your enrollment summary, then start learning."
    : "We will ask you to sign in first, then bring you right back to this course.";

  return (
    <div className="flex flex-col gap-3">
      <Button variant="accent" fullWidth onClick={handleEnroll}>
        {label}
      </Button>

      <p className="text-center text-small text-ink-3">{hint}</p>
    </div>
  );
}
