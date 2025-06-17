import express, { Request, Response } from "express";
import { User } from "../models/users.model";
import { z } from "zod";

export const userRouter = express.Router();

const UserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number(),
  }),
});

userRouter.post("/create-user", async (req: Request, res: Response) => {
  try {
    const data = await UserZodSchema.parseAsync(req.body);
    const user = await User.create(data);
    res.status(201).json({
      success: true,
      message: "User has been created successfully!",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
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
