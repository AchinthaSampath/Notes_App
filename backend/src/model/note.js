import mongoose from "mongoose";

const noteschema = new mongoose.Schema(
  {
    title: {type: String, required: true,
    },
    content: {type: String, required: true,
    },
    isPinned: {type: Boolean, default: false,
    },
    isFavorite: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    collection: { type: String, default: "" },
  },
  { timestamps: true }, // createdAt,updatedAt
);
const Note = mongoose.model("Note", noteschema);

export default Note;
