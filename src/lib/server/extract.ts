import { MAX_EXTRACT_CHARS, extensionOf, fileKind } from "@/lib/chats";

function truncateText(text: string) {
  const cleaned = text.replace(/\u0000/g, "").trim();
  if (cleaned.length <= MAX_EXTRACT_CHARS) {
    return { text: cleaned, truncated: false };
  }
  return {
    text: `${cleaned.slice(0, MAX_EXTRACT_CHARS)}\n\n[Truncated: original was ${cleaned.length.toLocaleString()} characters]`,
    truncated: true,
  };
}

function looksLikeText(bytes: Uint8Array) {
  const sample = bytes.subarray(0, Math.min(bytes.length, 2048));
  let suspicious = 0;
  for (const value of sample) {
    if (value === 0) {
      return false;
    }
    if (value < 9 || (value > 13 && value < 32)) {
      suspicious += 1;
    }
  }
  return suspicious / sample.length < 0.1;
}

async function extractPdfText(bytes: Uint8Array) {
  try {
    const { extractText } = await import("unpdf");
    const result = await extractText(bytes);
    const text = Array.isArray(result.text) ? result.text.join("\n") : String(result.text ?? "");
    return text;
  } catch (error) {
    console.error("[extract] PDF parse failed:", error);
    return "";
  }
}

export async function extractFileText(input: {
  filename: string;
  mimeType: string;
  bytes: Uint8Array;
}) {
  const kind = fileKind(input.mimeType, input.filename);
  const extension = extensionOf(input.filename);

  if (kind === "image") {
    return "";
  }

  if (input.mimeType === "application/pdf" || extension === ".pdf") {
    const text = await extractPdfText(input.bytes);
    return truncateText(text || `[PDF attached: ${input.filename}. Text could not be extracted.]`).text;
  }

  if (
    looksLikeText(input.bytes) ||
    [".txt", ".md", ".csv", ".json", ".log"].includes(extension) ||
    input.mimeType.startsWith("text/")
  ) {
    return truncateText(new TextDecoder("utf-8", { fatal: false }).decode(input.bytes)).text;
  }

  return `[Binary file attached: ${input.filename} (${input.mimeType || "unknown type"}, ${input.bytes.byteLength} bytes)]`;
}
