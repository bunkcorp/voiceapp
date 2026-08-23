import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
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
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black safe-area-inset">
      <header className="flex items-center justify-center px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Voice Assistant
        </h1>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16">
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Email or username and password
            </p>
          </div>
          <LoginForm nextPath={nextPath} />
        </div>
      </main>
    </div>
  );
}
