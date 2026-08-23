"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={pending}
      className="rounded-full px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:opacity-60 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200"
    >
      {pending ? "Signing out…" : "Logout"}
    </button>
  );
}
