import express from "express";
import { ENVS } from "./common/config/env.config";
import { AppRoutes } from "./routes";

export class AppServer {
  public app = express();

  start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));


    this.app.use("/api", AppRoutes.route)

    this.app.listen(ENVS.PORT, () => {
      console.log(`Server running on port ${ENVS.PORT}`);
    });

  }
}
