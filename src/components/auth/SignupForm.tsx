"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MIN_PASSWORD_LENGTH } from "@/lib/authConstants";

export function SignupForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (password !== confirm) {
      setError("Passwords do not match");
      setPending(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setError(data.error || "Could not create account");
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
          htmlFor="email"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
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
          Confirm password
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

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-600 active:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
