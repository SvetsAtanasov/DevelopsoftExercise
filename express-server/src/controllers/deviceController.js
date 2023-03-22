import express from "express";
import { findAllDevices } from "../services/deviceService.js";

const deviceRouter = express.Router();

deviceRouter.get("/devices", async (req, res) => {
  try {
    const devices = await findAllDevices();

    res.send(JSON.stringify(devices));
  } catch (err) {
    res.send(JSON.stringify(err));
  }
});

export default deviceRouter;
