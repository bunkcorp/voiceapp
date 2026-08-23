"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { MAX_UPLOAD_BYTES } from "@/lib/chats";

interface ComposerProps {
  disabled?: boolean;
  uploading?: boolean;
  onSendText: (text: string) => void;
  onUpload: (file: File) => Promise<void>;
}

export function Composer({
  disabled,
  uploading,
  onSendText,
  onUpload,
}: ComposerProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setError(null);
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("File is larger than 10MB");
      return;
    }
    try {
      await onUpload(file);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    }
  }

  function submit(event?: FormEvent) {
    event?.preventDefault();
    const next = text.trim();
    if (!next || disabled) {
      return;
    }
    onSendText(next);
    setText("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-2xl">
      <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept="image/png,image/jpeg,image/gif,image/webp,application/pdf,text/plain,text/markdown,text/csv,.png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.md,.csv"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) {
              void handleUpload(file);
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Attach file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M16.5 6.75v8.25a4.5 4.5 0 11-9 0V6a3 3 0 016 0v8.25a1.5 1.5 0 01-3 0V7.5a.75.75 0 011.5 0v6.75a.75.75 0 001.5 0V6A4.5 4.5 0 007.5 6v9a6 6 0 0012 0V6.75a.75.75 0 00-1.5 0z" />
          </svg>
        </button>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type a message"
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-gray-900 outline-none dark:text-white"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a1 1 0 00-1.39 1.18l2.2 6.47a1 1 0 00.76.68l8.13 1.32-8.13 1.32a1 1 0 00-.76.68l-2.2 6.47a1 1 0 001.39 1.18z" />
          </svg>
        </button>
      </div>
      {error ? (
        <p className="mt-2 px-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <p className="mt-2 px-2 text-xs text-gray-400">
          Images, PDF, text, or other files up to 10MB
        </p>
      )}
    </form>
  );
}
