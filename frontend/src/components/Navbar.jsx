import { PlusIcon, SearchIcon, SparklesIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const now = new Date();
const today = now.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const hour = now.getHours();
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* greeting */}
          <div>
            <p className="text-sm text-base-content/60">{today}</p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold md:text-3xl">
              {greeting}, {user?.username}
              <SparklesIcon className="size-5 text-pink-400 md:size-6" />
            </h1>
          </div>

          {/* desktop: search */}
          <label className="hidden w-80 items-center gap-2 rounded-full border border-base-content/10 bg-base-content/5 px-4 py-2.5 text-sm md:flex">
            <SearchIcon className="size-4 shrink-0 text-base-content/50" />
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-base-content/40"
            />
          </label>

          {/* mobile: add + logout */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/create" aria-label="New note" className="btn btn-primary btn-square">
              <PlusIcon className="size-5" />
            </Link>
            <button onClick={logout} aria-label="Log out" className="btn btn-ghost btn-square">
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;