import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BrandPill } from "@/components/brand/BrandPill";
import { SignupForm } from "@/components/auth/SignupForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  SESSION_COOKIE,
  isValidSessionToken,
  safeNextPath,
} from "@/lib/server/auth";

export const metadata = {
  title: "Create account · Voice Assistant",
  description: "Create an account for the voice assistant",
};

export default async function SignupPage({
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
        <div />
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
              Create account
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Email and password — at least 8 characters
            </p>
          </div>
          <SignupForm nextPath={nextPath} />
        </div>
      </main>
    </div>
  );
}
