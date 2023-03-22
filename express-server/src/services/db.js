import mongoose from "mongoose";
import { ENV } from "../config/config.js";

export async function initDatabase() {
  mongoose.set("strictQuery", false);

  await mongoose.connect(ENV.DB_CONNECTION_STRING);

  console.log(`Database successfully connected`);
}
