import type { Metadata } from "next";
import AppShell from "@/formic/components/AppShell";
import Button from "@/formic/components/Button";
import Input, { Field } from "@/formic/components/Input";
import LanguageToggle from "@/components/site/LanguageToggle";
import { PublicTitle } from "@/components/site/PublicNav";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your SEBEB account password.",
};

/* Brief
   Reader:   a learner locked out of their account, on any device
   Question: how do I get instructions to set a new password?
   Action:   submit the email address on the account
   Register: text (one form and two quiet notes; no figures, no charts)
*/

export default function ForgotPasswordPage() {
  return (
    <AppShell
      rail="none"
      padding={false}
      title={<PublicTitle />}
      caption="Reset password"
      actions={<LanguageToggle />}
    >
      <div className="flex justify-center px-6 py-6 sm:px-8 sm:py-8">
        <div className="w-full max-w-md">
          <Button variant="link" size="xs" href="/login" icon="arrow-left">
            Back to sign in
          </Button>

          <p className="mt-8 text-small font-medium uppercase tracking-wide text-ink-3">
            Password recovery
          </p>

          <h2 className="mt-3 text-display font-semibold tracking-tight text-ink">
            Forgot your password?
          </h2>

          <p className="mt-4 text-body text-ink-2">
            Enter the email address associated with your account. We&apos;ll
            send you instructions to create a new password.
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <Field label="Email address">
              <Input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </Field>

            <Button type="submit" variant="accent" fullWidth>
              Send reset instructions
            </Button>
          </form>

          <div className="mt-10 border-t border-line pt-7">
            <p className="text-body text-ink-2">
              Remembered your password?{" "}
              <Button variant="link" size="xs" href="/login" className="align-middle">
                Return to sign in
              </Button>
            </p>

            <p className="mt-4 text-small text-ink-3">
              If you don&apos;t receive an email within a few minutes, check
              your spam or junk folder.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
