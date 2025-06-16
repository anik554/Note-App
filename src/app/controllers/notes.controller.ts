import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";
export const notesRouter = express.Router();

notesRouter.post("/create-note", async (req: Request, res: Response) => {
  const data = req.body;
  const note = await Note.create(data);
  res.status(201).json({
    success: true,
    message: "Note has been created",
    note,
  });
});

notesRouter.get("/all-notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "Retrived all notes",
    notes,
  });
});

notesRouter.get("/:nodeId", async (req: Request, res: Response) => {
  const id = req.params.nodeId;
  const note = await Note.findById(id);
  // const note = await Note.findOne({_id:id});
  res.status(200).json({
    success: true,
    message: "Retrived single note",
    note,
  });
});

notesRouter.patch("/update/:noteId", async (req: Request, res: Response) => {
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

notesRouter.delete("/delete/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const note = await Note.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Note has been deleted",
    note,
  });
});
