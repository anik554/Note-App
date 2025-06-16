import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: {type: String, require:true, trim:true},
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongoose",
    content: "I am a full stack developer",
  });
  await myNote.save();
  res.status(201).json({
    success: true,
    message: "Note has been created",
    myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
  console.log("Welcome to Note App");
});

export default app;
