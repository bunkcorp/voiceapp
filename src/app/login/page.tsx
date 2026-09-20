import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandPill } from "@/components/brand/BrandPill";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  SESSION_COOKIE,
  isValidSessionToken,
  safeNextPath,
} from "@/lib/server/auth";

export const metadata = {
  title: "Sign in · Voice Assistant",
  description: "Sign in to use the voice assistant",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = safeNextPath(next);
  const cookieStore = await cookies();

  if (isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value)) {
    redirect(nextPath);
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-black safe-area-inset">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-black/5 px-4 py-4 dark:border-white/10 dark:bg-neutral-950/70">
        <div className="justify-self-start">
          <Link
            href="/signup"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-50 dark:text-green-400 dark:hover:bg-white/10"
          >
            Create account
          </Link>
        </div>
        <BrandPill
          label="Voice Assistant"
          className="max-w-full justify-self-center"
        />
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16">
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {nextPath.includes("persona=buddachat")
                ? "Sign in to use BuddhaChat voice in KarmaDots"
                : "Email or username and password"}
            </p>
          </div>
          <LoginForm nextPath={nextPath} />
        </div>
      </main>
    </div>
  );
}
