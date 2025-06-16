import express, { Application, Request, Response } from "express";
import { notesRouter } from "./app/controllers/notes.controller";
import { userRouter } from "./app/controllers/users.controller";

const app: Application = express();
app.use(express.json());
app.use("/note", notesRouter);
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
  console.log("Welcome to Note App");
});

export default app;
