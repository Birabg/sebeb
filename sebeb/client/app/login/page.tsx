"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/formic/components/AppShell";
import Alert from "@/formic/components/Alert";
import Button from "@/formic/components/Button";
import Input, { Field } from "@/formic/components/Input";
import { Separator } from "@/formic/components/primitives";
import { loginUser } from "@/lib/api/auth";
import { saveSession } from "@/lib/api/session";
import { authPromptMessage, registerHref } from "@/lib/auth/guard";
import { useAuthRedirect } from "@/lib/auth/use-auth";
import LanguageToggle from "@/components/site/LanguageToggle";
import { PublicTitle } from "@/components/site/PublicNav";

/* Brief
   Reader:   a returning learner at the sign-in screen, on any device
   Question: how do I get back into my courses?
   Action:   submit credentials, or reach register and password recovery
   Register: text (one statement panel and a form; no figures, no charts)
*/

export default function LoginPage() {
  const router = useRouter();
  const redirect = useAuthRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      });

      saveSession(
        response.data.access_token,
        response.data.refresh_token,
        response.data.user,
      );

      router.push(redirect ?? "/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell
      rail="none"
      padding={false}
      title={<PublicTitle />}
      caption="Log in"
      actions={<LanguageToggle />}
    >
      <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-2 lg:min-h-[calc(100dvh-7rem)]">
        {/* Statement panel */}
        <section className="hidden flex-col justify-between gap-10 rounded-card bg-inset p-8 sm:p-10 lg:flex">
          <p className="text-small font-medium uppercase tracking-wide text-ink-3">
            Welcome back
          </p>

          <div>
            <h2 className="max-w-lg text-display-xl font-semibold tracking-tight text-ink">
              Continue where your learning left off.
            </h2>

            <p className="mt-6 max-w-md text-lead text-ink-2">
              Return to your courses, continue your lessons, and keep building
              skills that matter.
            </p>
          </div>

          <p className="text-small font-medium uppercase tracking-wide text-ink-3">
            Cause of Beauty and Simplicity
          </p>
        </section>

        {/* Form */}
        <section className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <p className="text-small font-medium uppercase tracking-wide text-ink-3">
              Your learning space
            </p>

            <h2 className="mt-3 text-display font-semibold tracking-tight text-ink">
              Welcome back.
            </h2>

            <p className="mt-4 text-body text-ink-2">
              {authPromptMessage(redirect)}
            </p>

            {error && (
              <div role="alert" className="mt-6">
                <Alert tone="error" title={error} />
              </div>
            )}

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <Field label="Email address" required>
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </Field>

              <div className="flex flex-col gap-1.5">
                <Field label="Password" required>
                  <Input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Field>

                <div className="flex justify-end">
                  <Button variant="link" size="xs" href="/forgot-password">
                    Forgot password?
                  </Button>
                </div>
              </div>

              <Button type="submit" variant="accent" fullWidth loading={isLoading}>
                Sign in
              </Button>
            </form>

            <div className="mt-8 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="shrink-0 text-small text-ink-3">
                New to SEBEB?
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="mt-6">
              <Button variant="outline" fullWidth href={registerHref(redirect)} icon="plus">
                Create an account
              </Button>
            </div>

            <p className="mt-8 text-center text-small text-ink-3">
              By continuing, you agree to SEBEB&apos;s terms and privacy
              policy.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
