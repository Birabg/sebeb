"use client";

import { useSyncExternalStore } from "react";
import { isAuthenticated, sanitizeRedirect } from "./guard";

function subscribeToLocation(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);

  return () => window.removeEventListener("popstate", onStoreChange);
}

function getLocationSearch() {
  return window.location.search;
}

function getServerLocationSearch() {
  return "";
}

export function useAuthRedirect(): string | null {
  const search = useSyncExternalStore(
    subscribeToLocation,
    getLocationSearch,
    getServerLocationSearch,
  );

  return sanitizeRedirect(new URLSearchParams(search).get("redirect"));
}

function subscribeToSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function getSessionSnapshot() {
  return isAuthenticated();
}

function getServerSessionSnapshot() {
  return false;
}

export function useIsAuthenticated(): boolean {
  return useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );
}
