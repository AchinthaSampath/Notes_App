import { Link, useSearchParams } from "react-router";
import {
  NotebookPen,
  Plus,
  LayoutGrid,
  Pin,
  Star,
  Archive,
  LogOutIcon,
  ChevronsUpDownIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { COLLECTIONS } from "../libs/collection";

{
  /*creat initials for profile*/
}
const getInitials = (name = "") => {
  const parts = name
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const SideBar = ({ notes = [] }) => {
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const view = searchParams.get("view"); // pinned | favorites | archived
  const collection = searchParams.get("collection"); // personal | work | task

  const itemClass = (active) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      active
        ? "bg-pink-500/15 text-pink-400"
        : "text-base-content/60 hover:bg-base-content/5 hover:text-base-content"
    }`;

  const active = notes.filter((n) => !n.isArchived); // map all notes besides archived ones
  const counts = {
    all: active.length, //number of all notes
    pinned: active.filter((n) => n.isPinned).length, //number of pinned notes
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col overflow-y-auto border-r border-base-content/10 bg-base-300 px-4 py-6 md:flex">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500">
          <NotebookPen size={20} className="text-white" />
        </div>
        <span className="text-lg font-semibold">Notepad</span>
      </div>

      {/* New note */}
      <Link to="/create" className="btn btn-primary mb-6 w-full">
        <Plus size={18} /> New note
      </Link>

      {/* Views | !view && !collection == true(no filter show everything besides archived)*/}
      <nav className="flex flex-col gap-1">
        <Link to="/" className={itemClass(!view && !collection)}>
          <LayoutGrid size={18} /> All notes
          <span className="ml-auto text-xs opacity-60">{counts.all}</span>
        </Link>
        <Link to="/?view=pinned" className={itemClass(view === "pinned")}>
          <Pin size={18} /> Pinned
          <span className="ml-auto text-xs opacity-60">{counts.pinned}</span>
        </Link>
        <Link to="/?view=favorites" className={itemClass(view === "favorites")}>
          <Star size={18} /> Favorites
        </Link>
        <Link to="/?view=archived" className={itemClass(view === "archived")}>
          <Archive size={18} /> Archived
        </Link>
      </nav>

      {/* Collections */}
      <div className="my-5 border-t border-base-content/10" />
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-base-content/40">
        Collections
      </p>
      <nav className="flex flex-col gap-1">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.name}
            to={`/?collection=${c.name}`}
            className={itemClass(collection === c.name)}
          >
            <span className={`h-2 w-2 rounded-full ${c.dot}`} />
            {c.name}
          </Link>
        ))}
      </nav>

      {/* Profile */}
      <div className="mt-auto pt-6">
        <div className="dropdown dropdown-top w-full">
          <div
            tabIndex={0}
            role="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-base-content/5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
              {getInitials(user?.username)}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-medium">
                {user?.username}
              </span>
              <span className="block truncate text-xs text-base-content/50">
                {user?.email}
              </span>
            </span>
            <ChevronsUpDownIcon className="size-4 shrink-0 text-base-content/40" />
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content mb-2 w-full rounded-xl border border-base-content/10 bg-base-100 p-2 shadow-lg"
          >
            <li>
              <button onClick={logout} className="text-error">
                <LogOutIcon className="size-4" /> Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
