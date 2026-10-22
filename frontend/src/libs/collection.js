export const COLLECTIONS = [
  { name: "Ideas", dot: "bg-violet-400", tag: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  { name: "Personal", dot: "bg-sky-400", tag: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  { name: "Tasks", dot: "bg-amber-400", tag: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  { name: "Work", dot: "bg-pink-400", tag: "bg-pink-500/15 text-pink-300 border-pink-500/30" },
  { name: "Journal", dot: "bg-emerald-400", tag: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
];

export const getCollection = (name) => COLLECTIONS.find((c) => c.name === name);