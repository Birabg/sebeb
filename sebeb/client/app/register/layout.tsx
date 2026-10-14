import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your SEBEB account and start learning.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
