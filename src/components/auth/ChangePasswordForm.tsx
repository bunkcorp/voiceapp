"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MIN_PASSWORD_LENGTH } from "@/lib/authConstants";

export function ChangePasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setPending(true);

    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (newPassword !== confirm) {
      setError("New passwords do not match");
      setPending(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setError(data.error || "Could not change password");
        setPending(false);
        return;
      }

      setSuccess(true);
      setPending(false);
      event.currentTarget.reset();
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none ring-green-500/40 transition focus:border-green-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none ring-green-500/40 transition focus:border-green-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          At least {MIN_PASSWORD_LENGTH} characters
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="confirm"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm new password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none ring-green-500/40 transition focus:border-green-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="text-sm text-green-600 dark:text-green-400" role="status">
          Password updated.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-600 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update password"}
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/voice"
          className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        >
          Back to voice
        </Link>
      </p>
    </form>
  );
}
