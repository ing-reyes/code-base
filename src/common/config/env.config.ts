import "dotenv/config"
import { get } from "env-var"

export const ENVS = {
    PORT: get("PORT").required().asPortNumber(),
    MONGO_URI: get("MONGO_URI").required().asString(),
    // PORT: 3000,
    // MONGO_URI: "mongodb://gta_db:123456@localhost:27017/",
}