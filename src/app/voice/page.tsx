import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VoiceScreen } from "@/components/voice";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/server/auth";

export const metadata = {
  title: "Chats · Voice Assistant",
  description: "Recent chats and real-time voice conversation",
};

export default async function VoicePage() {
  const cookieStore = await cookies();
  if (!isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value)) {
    redirect("/login?next=/voice");
  }

  return <VoiceScreen />;
}
