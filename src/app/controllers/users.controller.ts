import express, { Request, Response } from "express";
import { User } from "../models/users.model";

export const userRouter = express.Router();

userRouter.post("/create-user", async (req: Request, res: Response) => {
  const data = req.body;
  const user = await User.create(data);
  res.status(201).json({
    success: true,
    message: "User has been created successfully!",
    user,
  });
});

userRouter.get("/get-users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    message: "All User Get successfully!",
    users,
  });
});

userRouter.get("/single-user/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    message: "Single User Get successfully!",
    user,
  });
});

userRouter.patch(
  "/update-user/:userId",
  async (req: Request, res: Response) => {
    const id = req.params.userId;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({
      success: true,
      message: "User Update successfully!",
      user,
    });
  }
);

userRouter.delete(
  "/delete-user/:userId",
  async (req: Request, res: Response) => {
    const id = req.params.userId;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User Delete successfully!",
      user,
    });
  }
);
