import express from "express";
import { initUseRoutes } from "./src/routes/allroutes.js";
import {
  onConnectDevice,
  onDisconnectDevice,
} from "./src/services/usbService.js";
import { ENV } from "./src/config/config.js";
import { initDatabase } from "./src/services/db.js";
import { insertAllDevices } from "./src/services/deviceService.js";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

initUseRoutes(app);
insertAllDevices();

const server = createServer(app);

initDatabase().then(() => {
  server.listen(ENV.PORT, () => {
    console.log(`Server running ot port ${ENV.PORT}`);
  });
});

const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", async () => {
    try {
      onConnectDevice(ws);
      onDisconnectDevice(ws);
    } catch (err) {
      res;
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
