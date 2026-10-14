import { getAccessToken } from "@/lib/api/session";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/learn",
  "/learning",
  "/enroll",
];

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return Boolean(getAccessToken());
  } catch {
    return false;
  }
}

export function isProtectedPath(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function sanitizeRedirect(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  const target = value.trim();

  if (!target.startsWith("/")) {
    return null;
  }

  if (target.startsWith("//") || target.startsWith("/\\")) {
    return null;
  }

  if (target.startsWith("/login") || target.startsWith("/register")) {
    return null;
  }

  return target;
}

export function loginHref(redirect?: string | null): string {
  const target = sanitizeRedirect(redirect);

  return target
    ? `/login?redirect=${encodeURIComponent(target)}`
    : "/login";
}

export function registerHref(redirect?: string | null): string {
  const target = sanitizeRedirect(redirect);

  return target
    ? `/register?redirect=${encodeURIComponent(target)}`
    : "/register";
}

export function authPromptMessage(redirect: string | null): string {
  if (!redirect) {
    return "Sign in to continue your learning journey.";
  }

  if (redirect.startsWith("/enroll")) {
    return "Sign in to complete your enrollment. We will take you right back to your course.";
  }

  if (isProtectedPath(redirect)) {
    return "Sign in to continue to your learning space.";
  }

  if (redirect.startsWith("/courses")) {
    return "Sign in to continue. We will bring you back to this course.";
  }

  return "Sign in to continue. We will take you right back to where you were.";
}
