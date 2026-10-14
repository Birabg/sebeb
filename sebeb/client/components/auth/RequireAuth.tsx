"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, loginHref } from "@/lib/auth/guard";
import { useIsAuthenticated } from "@/lib/auth/use-auth";
import { Spinner } from "@/formic/components/primitives";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isSignedIn = useIsAuthenticated();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isAuthenticated()) {
        router.replace(loginHref(pathname));
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-title font-semibold tracking-tight text-ink">SEBEB</p>

          <div className="flex items-center gap-2 text-ink-2">
            <Spinner size={14} />
            <span className="text-caption">Preparing your learning space</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
