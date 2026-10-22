import Note from "../model/note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // get the latest
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json("internal server error");
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("error in getNoteById controller", error);
    res.status(500).json({ message: "internal server error" }, error);
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, collection} = req.body;
    if (!title || !content || !collection) {
      //backend validation
      return res.status(400).json({ message: "Required fields missing" });
    }
    const note = new Note({ title, content, collection });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content , collection } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content , collection},
      { new: true },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const patchNote = async (req, res) => {
  try {
    const allowed = ["isPinned", "isFavorite", "isArchived", "collection"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const note = await Note.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};