import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

const noteSchema = new Schema(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);

app.post("/note/create-note", async (req: Request, res: Response) => {
  const data = req.body;
  const note = await Note.create(data);
  res.status(201).json({
    success: true,
    message: "Note has been created",
    note,
  });
});

app.get("/note/all-notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "Retrived all notes",
    notes,
  });
});

app.get("/note/:nodeId", async (req: Request, res: Response) => {
  const id = req.params.nodeId;
  const note = await Note.findById(id);
  // const note = await Note.findOne({_id:id});
  res.status(200).json({
    success: true,
    message: "Retrived single note",
    note,
  });
});

app.patch("/note/update/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const updatedData = req.body;
  const note = await Note.findByIdAndUpdate(id, updatedData, { new: true });
  // const note = await Note.findOneAndUpdate({_id:id}, updatedData, { new: true });
  // const note = await Note.updateOne({_id:id}, updatedData, { new: true });
  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

app.delete("/note/delete/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const note = await Note.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Note has been deleted",
    note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
  console.log("Welcome to Note App");
});

export default app;
