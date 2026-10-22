import {
  PenSquareIcon,
  Trash2Icon,
  Pin,
  Star,
  ArchiveIcon,
  ArchiveRestoreIcon,
  ClockIcon,
} from "lucide-react";
import { Link } from "react-router";
import { formatNoteDate } from "../libs/utils";
import { getCollection } from "../libs/collection";
import api from "../libs/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const collection = getCollection(note.collection);

  // one method for every change: pin, favorite, archive, restore
  const updateNote = async (changes, message) => {
    try {
      await api.patch(`/notes/${note._id}`, changes);
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? { ...n, ...changes } : n)),
      );
      toast.success(message);
    } catch (error) {
      console.log("error updating note", error);
      toast.error("Failed to update note");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note permanently?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success("Note deleted");
    } catch (error) {
      console.log("error in handleDelete", error);
      toast.error("Failed to delete the note");
    }
  };

  const iconBase = "size-4 transition";
  const iconIdle = "text-base-content/40 hover:text-base-content";

  return (
    <div className="group flex flex-col rounded-2xl border border-white/10 bg-[#16161d] p-5 transition-all duration-200 hover:border-pink-500/70 hover:shadow-[0_0_20px_-2px_rgba(236,72,153,0.45)]">
      {/* top row: pin + tag on the left, star on the right */}
      <div className="flex items-center justify-between">
        {/*pin*/}
        <div className="flex items-center">
          <button
            title={note.isPinned ? "Unpin" : "Pin"}
            className={`mr-2 shrink-0 transition-all duration-200 ${
              note.isPinned
                ? ""
                : "md:mr-0 md:w-0 md:overflow-hidden md:opacity-0 md:focus-visible:mr-2 md:focus-visible:w-4 md:focus-visible:opacity-100 md:group-hover:mr-2 md:group-hover:w-4 md:group-hover:opacity-100"
            }`}
            onClick={() =>
              updateNote(
                { isPinned: !note.isPinned },
                note.isPinned ? "Note unpinned" : "Note pinned",
              )
            }
          >
            <Pin
              className={`size-4 transition ${
                note.isPinned ? "fill-pink-400 text-pink-400" : iconIdle
              }`}
            />
          </button>

          {/*collection tag*/}
          {collection && (
            <span
              className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${collection.tag}`}
            >
              {collection.name}
            </span>
          )}
        </div>

        {/*favourite*/}
        <button
          title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() =>
            updateNote(
              { isFavorite: !note.isFavorite },
              note.isFavorite ? "Removed from favorites" : "Added to favorites",
            )
          }
        >
          <Star
            className={`${iconBase} ${
              note.isFavorite ? "fill-yellow-400 text-yellow-400" : iconIdle
            }`}
          />
        </button>
      </div>

      {/*title, content*/}
      <h3 className="mt-4 text-base font-semibold text-base-content">
        {note.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-base-content/55">
        {note.content}
      </p>

      {/*date*/}
      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="flex items-center gap-1.5 text-xs text-base-content/50">
          <ClockIcon className="size-3.5" />
          {formatNoteDate(note.createdAt)}
        </span>

        {/*Archive = show restore & delete. Not Archived = show edit & archive */}
        <div className="flex items-center gap-1 md:opacity-0 md:transition md:focus-within:opacity-100 md:group-hover:opacity-100">
          {note.isArchived ? (
            <>
              <button
                title="Restore"
                className="btn btn-ghost btn-xs"
                onClick={() =>
                  updateNote({ isArchived: false }, "Note restored")
                }
              >
                <ArchiveRestoreIcon className="size-4" />
              </button>
              <button
                title="Delete permanently"
                className="btn btn-ghost btn-xs text-error"
                onClick={handleDelete}
              >
                <Trash2Icon className="size-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/note/${note._id}`}
                title="Edit"
                className="btn btn-ghost btn-xs"
              >
                <PenSquareIcon className="size-4" />
              </Link>
              <button
                title="Archive"
                className="btn btn-ghost btn-xs"
                onClick={() =>
                  updateNote({ isArchived: true }, "Note archived")
                }
              >
                <ArchiveIcon className="size-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
