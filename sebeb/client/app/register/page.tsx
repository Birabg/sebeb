"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/formic/components/AppShell";
import Alert from "@/formic/components/Alert";
import Button from "@/formic/components/Button";
import Input, { Field } from "@/formic/components/Input";
import { Checkbox } from "@/formic/components/primitives";
import { registerUser } from "@/lib/api/auth";
import { saveSession } from "@/lib/api/session";
import { loginHref } from "@/lib/auth/guard";
import { useAuthRedirect } from "@/lib/auth/use-auth";
import LanguageToggle from "@/components/site/LanguageToggle";
import { PublicTitle } from "@/components/site/PublicNav";

/* Brief
   Reader:   a first-time visitor deciding to join, on any device
   Question: what does it take to create an account here?
   Action:   fill the form and create the account, or sign in instead
   Register: text (one statement panel and a form; no figures, no charts)
*/

export default function RegisterPage() {
  const router = useRouter();
  const redirect = useAuthRedirect();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please agree to the terms of service and privacy policy.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
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
          : "Unable to create your account. Please try again.",
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
      caption="Create account"
      actions={<LanguageToggle />}
    >
      <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-2 lg:min-h-[calc(100dvh-7rem)]">
        {/* Statement panel */}
        <section className="hidden flex-col justify-between gap-10 rounded-card bg-inset p-8 sm:p-10 lg:flex">
          <p className="text-small font-medium uppercase tracking-wide text-ink-3">
            Begin your journey
          </p>

          <div>
            <h2 className="max-w-lg text-display-xl font-semibold tracking-tight text-ink">
              Learn something worth making.
            </h2>

            <p className="mt-6 max-w-md text-lead text-ink-2">
              Create your SEBEB account and discover practical learning
              experiences built around real skills.
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
              Join SEBEB
            </p>

            <h2 className="mt-3 text-display font-semibold tracking-tight text-ink">
              Create your account.
            </h2>

            <p className="mt-4 text-body text-ink-2">
              Start building your own path of learning.
            </p>

            {error && (
              <div role="alert" className="mt-6">
                <Alert tone="error" title={error} />
              </div>
            )}

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" required>
                  <Input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Field>

                <Field label="Last name" required>
                  <Input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Field>
              </div>

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

              <Field
                label="Password"
                hint="Use at least 8 characters with a combination of letters and numbers."
                required
              >
                <Input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </Field>

              <Field label="Confirm password" required>
                <Input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </Field>

              <Checkbox
                checked={termsAccepted}
                onChange={(next) => setTermsAccepted(next)}
                disabled={isLoading}
                label={
                  <>
                    I agree to SEBEB&apos;s{" "}
                    <Link href="/terms" className="text-accent underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-accent underline">
                      privacy policy
                    </Link>
                    .
                  </>
                }
              />

              <Button type="submit" variant="accent" fullWidth loading={isLoading}>
                Create account
              </Button>
            </form>

            <p className="mt-8 text-center text-small text-ink-2">
              Already have an account?{" "}
              <Button variant="link" size="xs" href={loginHref(redirect)} className="align-middle">
                Sign in
              </Button>
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
