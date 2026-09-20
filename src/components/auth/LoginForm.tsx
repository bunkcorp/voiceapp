"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(event.currentTarget);
    const identifier = String(form.get("identifier") ?? "");
    const password = String(form.get("password") ?? "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error || "Invalid credentials");
        setPending(false);
        return;
      }

      router.push(nextPath);
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
          htmlFor="identifier"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email or username
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          required
          autoFocus
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none ring-green-500/40 transition focus:border-green-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none ring-green-500/40 transition focus:border-green-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-600 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <Link
        href="/signup"
        className="rounded-full border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
      >
        Create account
      </Link>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already signed up?{" "}
        <Link
          href="/change-password"
          className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        >
          Change password
        </Link>{" "}
        after you sign in.
      </p>
    </form>
  );
}
