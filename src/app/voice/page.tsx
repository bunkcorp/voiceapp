import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VoiceScreen } from "@/components/voice";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";

export const metadata = {
  title: "Chats · Voice Assistant",
  description: "Recent chats and real-time voice conversation",
};

export default async function VoicePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  if (!isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value)) {
    const params = await searchParams;
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        query.set(key, value);
      }
    }
    const suffix = query.toString();
    const next = suffix ? `/voice?${suffix}` : "/voice";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return <VoiceScreen />;
}
