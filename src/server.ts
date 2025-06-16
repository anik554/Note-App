import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

const PORT = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://anikimtiaz:anikimtiaz@cluster0.irbpcqo.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDB using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
