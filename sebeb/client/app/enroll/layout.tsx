import RequireAuth from "@/components/auth/RequireAuth";

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
