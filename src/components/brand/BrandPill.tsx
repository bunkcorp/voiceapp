import { BrandLogo } from "./BrandLogo";

interface BrandPillProps {
  label?: string;
  className?: string;
}

export function BrandPill({
  label = "Chats · Voice Assistant",
  className = "",
}: BrandPillProps) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 shadow-sm ring-1 ring-black/10 dark:bg-neutral-800 dark:ring-white/15 ${className}`}
    >
      <BrandLogo className="h-6 w-6 shrink-0" alt="" />
      <span className="truncate text-sm font-semibold text-gray-900 dark:text-neutral-100">
        {label}
      </span>
    </div>
  );
}
