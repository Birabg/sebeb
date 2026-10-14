import RequireAuth from "@/components/auth/RequireAuth";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
