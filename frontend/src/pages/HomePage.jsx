import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import SideBar from "../components/Sidebar";
import toast from "react-hot-toast";
import api from "../libs/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // read the sidebar URL
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  const collection = searchParams.get("collection");

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes"); //calling axios directly
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.log("error fetching notes");
      console.log(error);
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("failed to import notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    // 1. filter each note depend on the view ex - view = favorites only keep favourite notes
    if (view === "archived") {
      if (!note.isArchived) return false;
    } else {
      if (note.isArchived) return false;
      if (view === "pinned" && !note.isPinned) return false;
      if (view === "favorites" && !note.isFavorite) return false;
      if (collection && note.collection !== collection) return false;
    }

    // 2.match the search?
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  });

  const orderedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <>
      <SideBar notes={notes} />

      <div className="min-h-screen md:ml-64">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {isRateLimited && <RateLimitedUI />}

        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && (
            <div className="text-center text-primary py-10">
              Loading notes....
            </div>
          )}

          {!loading && orderedNotes.length === 0 && !isRateLimited && (
            <NotesNotFound />
          )}
          {orderedNotes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderedNotes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
