import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  LoaderIcon,
  ArrowLeftIcon,
  Trash2Icon,
  ArchiveIcon,
  ArchiveRestoreIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../libs/axios";
import { COLLECTIONS } from "../libs/collection";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("error in fetching", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleArchive = async () => {
    try {
      await api.patch(`/notes/${id}`, { isArchived: !note.isArchived });
      toast.success(note.isArchived ? "Note restored" : "Note archived");
      navigate("/");
    } catch (error) {
      console.log("error archiving note", error);
      toast.error("Failed to update the note");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note permanently?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("error deleting note", error);
      toast.error("Failed to delete the note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated");
      navigate("/");
    } catch (error) {
      console.log("error updating note", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-4">
        <p className="text-base-content/60">This note could not be found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-6 w-6" />
              Back to Notes
            </Link>

            <div className="flex gap-2">
              <button onClick={handleArchive} className="btn btn-outline">
                {note.isArchived ? (
                  <>
                    <ArchiveRestoreIcon className="h-5 w-5" /> Restore
                  </>
                ) : (
                  <>
                    <ArchiveIcon className="h-5 w-5" /> Archive
                  </>
                )}
              </button>

              {note.isArchived && (
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                  <Trash2Icon className="h-5 w-5" />
                  Delete permanently
                </button>
              )}
            </div>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Collection</span>
                </label>
                <select
                  className="select select-bordered"
                  value={note.collection || ""}
                  onChange={(e) => setNote({ ...note, collection: e.target.value })}
                >
                  {COLLECTIONS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;