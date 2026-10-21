import { PenSquareIcon, Trash2Icon, Pin } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../libs/utils";
import api from "../libs/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //navigation to noteDetailPage prevented

    if (!window.confirm("Are you sure you want to delete this note")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); //update the UI by getting rid of old notes
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("error in handleDelete", error);
      toast.error("failed to delete the note");
    }
  };

  const handleIsPinned = async (e, id) => {
  e.preventDefault();
  try {
   await api.patch(`/notes/${id}`); // or whatever your endpoint is
    
    // Update the notes state directly without refetching
    setNotes((prev) =>prev.map((note) => note._id === id ? { ...note, isPinned: !note.isPinned } : note));
    note.isPinned? toast.success("Note Unpinned"): toast.success("Note Pinned");
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    toast.error("Failed to update note");
  }
};

  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#c2148e80]"
    >
      <div className="card-body">
        <button onClick={(e) => handleIsPinned(e, note._id)}>
          {note.isPinned ? (
            <Pin className="size-4 fill-current" />
          ) : (
            <Pin className="size-4" />
          )}
        </button>
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <Link to={`/note/${note._id}`}>
              <PenSquareIcon className="size-4" />
            </Link>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
