import deviceRouter from "../controllers/deviceController.js";
import homeRouter from "../controllers/homeController.js";

export const initUseRoutes = (server) => {
  server.use(deviceRouter);
};
