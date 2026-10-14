"use client";

import { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import type {
  AppSidebarSection,
  AppSidebarUser,
} from "@/formic/components/AppSidebar";
import { getStoredUser } from "@/lib/api/session";
import type { UserRole } from "@/lib/api/types";

/* The one navigation list: every page inside the app passes it to AppShell,
   so the rail never differs from page to page. */
export const APP_SECTIONS: AppSidebarSection[] = [
  {
    items: [
      { key: "overview", label: "Overview", icon: "home" },
      { key: "learning", label: "My learning", icon: "bookmark" },
      { key: "certificates", label: "Certificates", icon: "trophy" },
    ],
  },
  {
    title: "Account",
    items: [{ key: "settings", label: "Settings", icon: "gear" }],
  },
];

const HREFS: Record<string, string> = {
  overview: "/dashboard",
  learning: "/learning",
  certificates: "/dashboard/certificates",
  settings: "/dashboard/settings",
};

const ROLE_LABEL: Record<UserRole, string> = {
  ADMIN: "Admin",
  STUDENT: "Student",
};

function keyForPath(pathname: string): string {
  if (pathname.startsWith("/dashboard/certificates")) return "certificates";
  if (pathname.startsWith("/dashboard/settings")) return "settings";
  if (pathname.startsWith("/dashboard/learning")) return "learning";
  if (pathname.startsWith("/learning")) return "learning";
  if (pathname.startsWith("/dashboard")) return "overview";
  return "";
}

function readUser(): AppSidebarUser | null {
  if (typeof window === "undefined") return null;
  const user = getStoredUser();
  if (!user) return null;
  return {
    name: `${user.first_name} ${user.last_name}`.trim() || user.email,
    detail: ROLE_LABEL[user.role] ?? "Student",
  };
}

/** the props every page inside the app hands to AppShell */
export function useAppShell() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useMemo(() => readUser(), []);

  return {
    sections: APP_SECTIONS,
    active: keyForPath(pathname) || null,
    onSelect: (key: string) => {
      const href = HREFS[key];
      if (href && href !== pathname) router.push(href);
    },
    user,
  };
}
