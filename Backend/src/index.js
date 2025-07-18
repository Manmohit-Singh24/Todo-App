import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { logger } from "./utils/logger.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

logger.seperator();

// ******************** Connecting to DataBase ****************
connectDB();

// ******************* App : *********************
const port = process.env.PORT;

app.listen(port, () => {
    logger.success("Express connected", `Running at port ${port}`);
});
 