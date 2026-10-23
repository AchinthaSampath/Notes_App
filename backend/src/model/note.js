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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, //owner field
  },
  { timestamps: true }, // createdAt,updatedAt
);
const Note = mongoose.model("Note", noteschema);

export default Note;
