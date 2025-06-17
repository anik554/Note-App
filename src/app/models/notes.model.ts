import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/note.interface";

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, require: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Personal", "Work", "Study", "Other"],
      default: "Personal",
    },
    pinned: { type: Boolean, default: false },
    tags: {
      label: { type: String, required: true, trim: true },
      color: { type: String, dafault: "gray" },
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Referencing userId
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = model("Note", noteSchema);
