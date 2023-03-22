import express from "express";

const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  res.send("<a href='/devices'>Devices</a>");
});

export default homeRouter;
