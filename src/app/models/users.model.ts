import bcrypt from "bcrypt";
import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import validator from "validator";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, `First name must not be empty`],
      minlength: [3, `First Name minimum 3 charracters but got {VALUE}`],
      maxlength: [10, `First Name maximum 10 charracters but got {VALUE}`],
      trim: true,
    },
    lastName: { type: String, trim: true },
    age: { type: Number, required: true, min: 18, max: 60 },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,

      // manula custom validator
      // validate: {
      //   validator: function (value) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      //   },
      //   message: (props) => `${props.value} is not a valid email address.`,
      // },

      validate: [validator.isEmail, "Invalid Email Send {VALUE}"], // using package custom validator
    },
    password: { type: String, required: true },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "Role is not valid, got {VALUE}",
      },
      default: "SUPERADMIN",
    },
    address: { type: addressSchema }, //Embedding in Mongoose
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// custom instance methods
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// static methods
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
