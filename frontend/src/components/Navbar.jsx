import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import React from "react";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
              Good morning, User.
            </h1>
          </div>

          <input
            className="p-2 rounded-2xl bg-[#574f5480]"
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
