import mongoose from "mongoose";
import { listAllDevices } from "../services/usbService.js";

const deviceSchema = new mongoose.Schema({
  idVendor: String,
  idProduct: String,
  deviceType: String,
  connected: Boolean,
  parentId: String,
});

export const Device = mongoose.model("Device", deviceSchema);
