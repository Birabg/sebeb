import RequireAuth from "@/components/auth/RequireAuth";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
