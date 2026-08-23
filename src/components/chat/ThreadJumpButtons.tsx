"use client";

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 8.3l6.2 6.2-1.4 1.4L12 11.1l-4.8 4.8-1.4-1.4L12 8.3z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 15.7l-6.2-6.2 1.4-1.4L12 12.9l4.8-4.8 1.4 1.4L12 15.7z" />
    </svg>
  );
}

const buttonClassName =
  "pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 text-gray-600 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 touch-manipulation dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white";

interface ThreadJumpButtonsProps {
  showTop: boolean;
  showBottom: boolean;
  onTop: () => void;
  onBottom: () => void;
}

export function ThreadJumpButtons({
  showTop,
  showBottom,
  onTop,
  onBottom,
}: ThreadJumpButtonsProps) {
  if (!showTop && !showBottom) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {showTop ? (
        <button
          type="button"
          onClick={onTop}
          className={`${buttonClassName} absolute top-3 right-3`}
          aria-label="Jump to start of conversation"
          title="Jump to top"
        >
          <ChevronUpIcon />
        </button>
      ) : null}
      {showBottom ? (
        <button
          type="button"
          onClick={onBottom}
          className={`${buttonClassName} absolute right-3 bottom-3`}
          aria-label="Jump to latest message"
          title="Jump to bottom"
        >
          <ChevronDownIcon />
        </button>
      ) : null}
    </div>
  );
}
