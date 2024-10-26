import dotnev from "dotenv";
import { App } from "./app";

(async () => {
  dotnev.config();

  const port = process.env.SERVER_PORT || 8080;

  const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
  const mongoDbName = process.env.MONGO_DB;
  if (!mongoConnectionString || !mongoDbName)
    throw new Error("MongoDB connection string not configured.");

  const app = await new App(mongoConnectionString, mongoDbName).run();

  app.express.listen(port, () => console.log(`Api stated on port ${port}!`));
})();
