export function formatRelativeTime(timestamp: number) {
  const delta = Date.now() - timestamp;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (delta < minute) {
    return "Just now";
  }
  if (delta < hour) {
    const minutes = Math.floor(delta / minute);
    return `${minutes}m ago`;
  }
  if (delta < day) {
    const hours = Math.floor(delta / hour);
    return `${hours}h ago`;
  }
  if (delta < 7 * day) {
    const days = Math.floor(delta / day);
    return days === 1 ? "Yesterday" : `${days}d ago`;
  }

  return new Date(timestamp).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}
