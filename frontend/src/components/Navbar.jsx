import { PlusIcon, SearchIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import React from "react";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const Navbar = ({ searchQuery, setSearchQuery }) => {

  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">

          {/*greetings*/}
          <div>
            <p className="text-sm text-base-content/60">{today}</p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold md:text-3xl">
              Good morning, User
              <SparklesIcon className="size-5 text-pink-400 md:size-6" />
            </h1>
          </div>

          {/*desktop*/}
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

          {/* mobile */}
          <Link to="/create" aria-label="New note" className="btn btn-primary btn-square md:hidden">
            <PlusIcon className="size-5" />
          </Link>

        </div>
      </div>
    </header>
  );
};
export default Navbar;
