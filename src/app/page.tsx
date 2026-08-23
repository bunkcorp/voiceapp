import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";

export default async function Home() {
  const cookieStore = await cookies();
  redirect(
    isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value)
      ? "/voice"
      : "/login"
  );
}
