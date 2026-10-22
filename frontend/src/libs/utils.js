export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const formatNoteDate = (value) => {
  const date = new Date(value);
  const now = new Date();

  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  // compare calendar days, not hours, so 11 PM yesterday still counts as "Yesterday"
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startOfDay(now) - startOfDay(date)) / 86400000);

  if (diffDays === 0) return `Today · ${time}`;
  if (diffDays === 1) return `Yesterday · ${time}`;

  const day = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
  return `${day} · ${time}`;
};